export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  try {
    // ---------------------------------------------------------
    // RETAILERS
    // ---------------------------------------------------------
    const retailers = {
      tesco: "Tesco",
      sainsburys: "Sainsbury's",
      asda: "Asda",
      morrisons: "Morrisons",
      waitrose: "Waitrose",
      aldi: "Aldi"
    };

    // ---------------------------------------------------------
    // NORMALISE TEXT
    // ---------------------------------------------------------
    function clean(value) {
      return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    }

    // ---------------------------------------------------------
    // SEED PRICE DATABASE
    //
    // These are NOT live prices.
    // They are controlled ShiftFit seed prices.
    // ---------------------------------------------------------
    const basePrices = {
      "chicken breast": 5.50,
      "lean beef mince": 5.75,
      "lean turkey mince": 5.25,
      "salmon": 6.50,
      "eggs": 2.50,
      "greek yoghurt": 2.00,
      "oats": 1.50,
      "rice": 2.00,
      "wholewheat pasta": 1.50,
      "sweet potatoes": 2.00,
      "potatoes": 1.75,
      "mixed vegetables": 2.00,
      "spinach": 1.50,
      "mixed berries": 3.00,
      "bananas": 1.50,
      "avocado": 2.00,
      "wholemeal wraps": 1.75,
      "wholegrain bread": 1.50,
      "rice cakes": 1.50,
      "protein powder": 20.00
    };

    const retailerMultipliers = {
      tesco: 1.00,
      sainsburys: 1.04,
      asda: 0.96,
      morrisons: 0.98,
      waitrose: 1.22,
      aldi: 0.88
    };

    const packSizes = {
      "chicken breast": "1kg",
      "lean beef mince": "500g",
      "lean turkey mince": "500g",
      "salmon": "400g",
      "eggs": "12 pack",
      "greek yoghurt": "500g",
      "oats": "1kg",
      "rice": "1kg",
      "wholewheat pasta": "500g",
      "sweet potatoes": "1kg",
      "potatoes": "2.5kg",
      "mixed vegetables": "1kg",
      "spinach": "240g",
      "mixed berries": "500g",
      "bananas": "1kg",
      "avocado": "2 pack",
      "wholemeal wraps": "8 pack",
      "wholegrain bread": "800g",
      "rice cakes": "130g",
      "protein powder": "1kg"
    };

    // ---------------------------------------------------------
    // FIND THE CLOSEST PRODUCT
    // ---------------------------------------------------------
    function findProduct(itemName, retailerId) {
      const query = clean(itemName);

      let bestMatch = null;
      let bestScore = 0;

      for (const productName of Object.keys(basePrices)) {
        const cleanedProduct = clean(productName);

        let score = 0;

        if (query === cleanedProduct) {
          score = 100;
        } else if (
          query.includes(cleanedProduct) ||
          cleanedProduct.includes(query)
        ) {
          score = 80;
        } else {
          const queryWords = query.split(" ");
          const productWords = cleanedProduct.split(" ");

          for (const word of queryWords) {
            if (word.length > 2 && productWords.includes(word)) {
              score += 20;
            }
          }
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = productName;
        }
      }

      if (!bestMatch || bestScore < 20) {
        return null;
      }

      const base = basePrices[bestMatch];
      const multiplier = retailerMultipliers[retailerId] || 1;

      // Small deterministic retailer variation
      const price = Math.round(base * multiplier * 100) / 100;

      return {
        productId:
          retailerId + "-" + clean(bestMatch).replace(/\s+/g, "-"),

        retailer: retailerId,
        retailerName: retailers[retailerId],

        productName: bestMatch,
        packSize: packSizes[bestMatch] || "standard pack",

        price,

        updatedAt: "2026-09-02",

        available: true
      };
    }

    // ---------------------------------------------------------
    // POST = CREATE PRICE CHECK
    // ---------------------------------------------------------
    if (req.method === "POST") {
      const body = req.body || {};

      const items = Array.isArray(body.items)
        ? body.items
            .map(item => {
              if (typeof item === "string") {
                return {
                  name: item,
                  quantity: 1
                };
              }

              return {
                name: item.name || item.item || item.product || "",
                quantity: Number(item.quantity) || 1
              };
            })
            .filter(item => item.name)
        : [];

      const retailerIds = Array.isArray(body.retailers)
        ? body.retailers.filter(id => retailers[id])
        : Object.keys(retailers);

      if (!items.length) {
        return res.status(400).json({
          error: "NO_ITEMS",
          message: "No shopping items were supplied."
        });
      }

      if (!retailerIds.length) {
        return res.status(400).json({
          error: "NO_RETAILERS",
          message: "No supermarkets were supplied."
        });
      }

      const payload = {
        items,
        retailers: retailerIds,
        createdAt: new Date().toISOString()
      };

      // Safe base64 run ID.
      const runId = Buffer
        .from(JSON.stringify(payload), "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      return res.status(202).json({
        status: "RUNNING",
        runId,
        items,
        retailers: retailerIds,
        startedAt: payload.createdAt
      });
    }

    // ---------------------------------------------------------
    // GET = RETURN PRICE RESULTS
    // ---------------------------------------------------------
    if (req.method === "GET") {
      const runId = req.query && req.query.runId;

      if (!runId) {
        return res.status(400).json({
          error: "NO_RUN_ID",
          message: "A runId is required."
        });
      }

      let decoded;

      try {
        let value = String(runId)
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        while (value.length % 4 !== 0) {
          value += "=";
        }

        decoded = JSON.parse(
          Buffer.from(value, "base64").toString("utf8")
        );
      } catch (decodeError) {
        return res.status(400).json({
          error: "INVALID_RUN_ID",
          message: "The price check ID could not be read."
        });
      }

      const items = Array.isArray(decoded.items)
        ? decoded.items
        : [];

      const retailerIds = Array.isArray(decoded.retailers)
        ? decoded.retailers
        : Object.keys(retailers);

      // -------------------------------------------------------
      // BUILD RESULTS
      // -------------------------------------------------------
      const itemResults = [];
      const rawResults = [];

      for (const item of items) {
        const choices = [];

        for (const retailerId of retailerIds) {
          const product = findProduct(item.name, retailerId);

          if (!product) {
            continue;
          }

          const quantity = Math.max(
            1,
            Number(item.quantity) || 1
          );

          const total =
            Math.round(product.price * quantity * 100) / 100;

          const result = {
            retailer: retailerId,
            retailerName: retailers[retailerId],

            productId: product.productId,
            productName: product.productName,

            packSize: product.packSize,

            unitPrice: product.price,
            quantity,
            total,

            updatedAt: product.updatedAt,
            available: true
          };

          choices.push(result);

          rawResults.push({
            item: item.name,
            query: item.name,

            retailer: retailerId,
            retailerName: retailers[retailerId],

            productName: product.productName,
            packSize: product.packSize,

            price: product.price,
            quantity,
            total,

            available: true,
            updatedAt: product.updatedAt
          });
        }

        choices.sort((a, b) => a.total - b.total);

        itemResults.push({
          item: item.name,
          quantity: Math.max(
            1,
            Number(item.quantity) || 1
          ),
          choices,
          cheapest: choices.length ? choices[0] : null
        });
      }

      // -------------------------------------------------------
      // MIXED BASKET
      // -------------------------------------------------------
      let mixedTotal = 0;
      const mixedItems = [];

      for (const itemResult of itemResults) {
        if (itemResult.cheapest) {
          mixedTotal += itemResult.cheapest.total;

          mixedItems.push(itemResult.cheapest);
        }
      }

      mixedTotal = Math.round(mixedTotal * 100) / 100;

      // -------------------------------------------------------
      // SUPERMARKET TOTALS
      // -------------------------------------------------------
      const supermarketResults = [];

      for (const retailerId of retailerIds) {
        let total = 0;
        let found = 0;

        for (const itemResult of itemResults) {
          const choice = itemResult.choices.find(
            item => item.retailer === retailerId
          );

          if (choice) {
            total += choice.total;
            found++;
          }
        }

        total = Math.round(total * 100) / 100;

        supermarketResults.push({
          retailer: retailerId,
          retailerName: retailers[retailerId],

          total,

          itemsFound: found,
          totalItems: items.length,

          completeness:
            items.length > 0
              ? Math.round((found / items.length) * 100)
              : 0,

          complete: found === items.length
        });
      }

      supermarketResults.sort(
        (a, b) => a.total - b.total
      );

      // -------------------------------------------------------
      // FINAL RESPONSE
      // -------------------------------------------------------
      return res.status(200).json({
        status: "SUCCEEDED",

        source: "ShiftFit Price Database",

        // Important:
        // These are seed prices, NOT live supermarket prices.
        live: false,
        seeded: true,

        checkedAt: new Date().toISOString(),

        items,
        retailers: retailerIds,

        productsFound: rawResults.length,

        summary: {
          cheapestSupermarket:
            supermarketResults.length
              ? supermarketResults[0]
              : null,

          mixedBasketTotal: mixedTotal,

          potentialSaving:
            supermarketResults.length
              ? Math.round(
                  (
                    supermarketResults[supermarketResults.length - 1].total -
                    mixedTotal
                  ) * 100
                ) / 100
              : 0
        },

        mixedBasket: {
          total: mixedTotal,
          items: mixedItems
        },

        supermarkets: supermarketResults,

        itemResults,

        rawResults
      });
    }

    return res.status(405).json({
      error: "METHOD_NOT_ALLOWED"
    });

  } catch (error) {
    console.error("ShiftFit Best Basket error:", error);

    return res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "The Best Basket price service crashed.",
      details:
        process.env.NODE_ENV === "development"
          ? String(error.message || error)
          : undefined
    });
  }
}