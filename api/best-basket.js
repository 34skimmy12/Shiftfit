import { supermarkets, findProducts } from "./price-database.js";

function clean(value) {
  return String(value ?? "").trim();
}

function normaliseQuantity(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.max(1, Math.round(number));
}

function normaliseItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (typeof item === "string") {
        return {
          name: clean(item),
          qty: 1
        };
      }

      if (!item || typeof item !== "object") return null;

      const name = clean(
        item.name ??
        item.item ??
        item.query ??
        item.productName
      );

      if (!name) return null;

      return {
        name,
        qty: normaliseQuantity(
          item.qty ??
          item.quantity ??
          1
        )
      };
    })
    .filter(Boolean)
    .slice(0, 30);
}

function normaliseRetailers(retailers) {
  if (!Array.isArray(retailers)) {
    return Object.keys(supermarkets);
  }

  const valid = retailers
    .map(clean)
    .filter((id) => supermarkets[id]);

  return valid.length ? [...new Set(valid)] : Object.keys(supermarkets);
}

function encodeRun(payload) {
  return Buffer
    .from(JSON.stringify(payload), "utf8")
    .toString("base64url");
}

function decodeRun(runId) {
  try {
    return JSON.parse(
      Buffer
        .from(runId, "base64url")
        .toString("utf8")
    );
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    /*
     * ---------------------------------------------------------
     * START A BEST BASKET CHECK
     * ---------------------------------------------------------
     */
    if (req.method === "POST") {
      const body = req.body || {};

      const items = normaliseItems(body.items);
      const retailers = normaliseRetailers(body.retailers);

      if (!items.length) {
        return res.status(400).json({
          status: "FAILED",
          error: "No shopping items were supplied."
        });
      }

      const runId = encodeRun({
        items,
        retailers,
        createdAt: new Date().toISOString()
      });

      return res.status(202).json({
        status: "RUNNING",
        runId,
        items,
        retailers,
        startedAt: new Date().toISOString()
      });
    }

    /*
     * ---------------------------------------------------------
     * GET RESULTS
     * ---------------------------------------------------------
     */
    if (req.method === "GET") {
      const runId = clean(req.query?.runId);

      if (!runId) {
        return res.status(400).json({
          status: "FAILED",
          error: "Missing runId."
        });
      }

      const payload = decodeRun(runId);

      if (!payload) {
        return res.status(400).json({
          status: "FAILED",
          error: "Invalid runId."
        });
      }

      const items = normaliseItems(payload.items);
      const retailers = normaliseRetailers(payload.retailers);

      if (!items.length) {
        return res.status(400).json({
          status: "FAILED",
          error: "No shopping items were supplied."
        });
      }

      /*
       * ---------------------------------------------------------
       * BUILD SUPERMARKET RESULTS
       * ---------------------------------------------------------
       */

      const supermarketResults = [];

      /*
       * Every requested shopping item is checked against
       * every selected supermarket.
       */
      for (const retailerId of retailers) {
        const retailer = supermarkets[retailerId];

        if (!retailer) continue;

        let total = 0;
        const matchedItems = [];
        const missingItems = [];

        for (const requestedItem of items) {
          const matches = findProducts(
            requestedItem.name,
            [retailerId]
          );

          const product = matches?.[0];

          if (!product) {
            missingItems.push({
              item: requestedItem.name,
              quantity: requestedItem.qty
            });

            continue;
          }

          const unitPrice = Number(product.price) || 0;
          const quantity = requestedItem.qty;

          /*
           * IMPORTANT:
           * Quantity affects the line total.
           *
           * Example:
           * Chicken breast £4.84 × 2 = £9.68
           */
          const lineTotal = unitPrice * quantity;

          total += lineTotal;

          matchedItems.push({
            item: requestedItem.name,
            quantity,
            qty: quantity,

            retailer: retailerId,
            retailerName: retailer.name,

            productId: product.id,
            productName: product.name,
            packSize: product.packSize,

            unitPrice,
            price: unitPrice,

            total: Number(lineTotal.toFixed(2)),
            lineTotal: Number(lineTotal.toFixed(2)),

            updatedAt: product.updatedAt || null,
            available: true
          });
        }

        supermarketResults.push({
          retailer: retailerId,
          retailerName: retailer.name,

          total: Number(total.toFixed(2)),

          matchedItems,
          missingItems,

          complete: missingItems.length === 0,

          itemCount: matchedItems.length,
          requestedItemCount: items.length,
          missingCount: missingItems.length
        });
      }

      /*
       * ---------------------------------------------------------
       * CHEAPEST COMPLETE SUPERMARKET
       * ---------------------------------------------------------
       */

      const completeSupermarkets = supermarketResults
        .filter((basket) => basket.complete)
        .sort((a, b) => a.total - b.total);

      const cheapestComplete =
        completeSupermarkets[0] || null;

      const secondCheapestComplete =
        completeSupermarkets[1] || null;

      /*
       * ---------------------------------------------------------
       * MIXED BASKET
       *
       * Find the cheapest available supermarket for EACH
       * individual shopping item.
       * ---------------------------------------------------------
       */

      const mixedBasketItems = [];

      for (const requestedItem of items) {
        const choices = [];

        for (const retailerId of retailers) {
          const retailer = supermarkets[retailerId];

          if (!retailer) continue;

          const matches = findProducts(
            requestedItem.name,
            [retailerId]
          );

          const product = matches?.[0];

          if (!product) continue;

          const unitPrice = Number(product.price) || 0;
          const quantity = requestedItem.qty;
          const lineTotal = unitPrice * quantity;

          choices.push({
            item: requestedItem.name,
            quantity,
            qty: quantity,

            retailer: retailerId,
            retailerName: retailer.name,

            productId: product.id,
            productName: product.name,
            packSize: product.packSize,

            unitPrice,
            price: unitPrice,

            total: Number(lineTotal.toFixed(2)),
            lineTotal: Number(lineTotal.toFixed(2)),

            updatedAt: product.updatedAt || null,
            available: true
          });
        }

        choices.sort((a, b) => a.total - b.total);

        if (choices.length) {
          mixedBasketItems.push(choices[0]);
        }
      }

      const mixedBasketTotal = mixedBasketItems.reduce(
        (sum, item) => sum + item.total,
        0
      );

      /*
       * ---------------------------------------------------------
       * RAW RESULTS
       *
       * Useful later when we connect this to real/live pricing.
       * ---------------------------------------------------------
       */

      const rawResults = [];

      for (const basket of supermarketResults) {
        for (const item of basket.matchedItems) {
          rawResults.push({
            item: item.item,
            query: item.item,

            retailer: item.retailer,
            retailerName: item.retailerName,

            productId: item.productId,
            productName: item.productName,
            packSize: item.packSize,

            price: item.unitPrice,
            unitPrice: item.unitPrice,

            quantity: item.quantity,
            qty: item.quantity,

            total: item.total,
            lineTotal: item.lineTotal,

            available: item.available,
            updatedAt: item.updatedAt
          });
        }
      }

      /*
       * ---------------------------------------------------------
       * SUMMARY
       * ---------------------------------------------------------
       */

      const savings =
        cheapestComplete &&
        mixedBasketTotal < cheapestComplete.total
          ? Number(
              (cheapestComplete.total - mixedBasketTotal)
                .toFixed(2)
            )
          : 0;

      const checkedAt = new Date().toISOString();

      return res.status(200).json({
        status: "SUCCEEDED",

        source: "ShiftFit Price Database",

        /*
         * These prices are seeded database values.
         * They are NOT live supermarket prices.
         */
        live: false,
        seeded: true,

        checkedAt,

        items,
        retailers,

        productsFound: rawResults.length,

        summary: {
          requestedItems: items.length,

          completeSupermarkets:
            completeSupermarkets.length,

          cheapestCompleteSupermarket:
            cheapestComplete?.retailer || null,

          cheapestCompleteSupermarketName:
            cheapestComplete?.retailerName || null,

          cheapestCompleteTotal:
            cheapestComplete?.total ?? null,

          secondCheapestSupermarket:
            secondCheapestComplete?.retailer || null,

          secondCheapestSupermarketName:
            secondCheapestComplete?.retailerName || null,

          secondCheapestTotal:
            secondCheapestComplete?.total ?? null,

          mixedBasketTotal:
            Number(mixedBasketTotal.toFixed(2)),

          potentialSavings: savings
        },

        /*
         * Full supermarket comparison.
         */
        supermarkets: supermarketResults,

        /*
         * Cheapest product for each individual item.
         */
        mixedBasket: {
          total: Number(mixedBasketTotal.toFixed(2)),
          items: mixedBasketItems
        },

        /*
         * Detailed item-by-item database results.
         */
        itemResults: supermarketResults.flatMap(
          (basket) => basket.matchedItems
        ),

        /*
         * Raw rows retained for future live-price integration.
         */
        rawResults
      });
    }

    /*
     * ---------------------------------------------------------
     * METHOD NOT SUPPORTED
     * ---------------------------------------------------------
     */

    return res.status(405).json({
      status: "FAILED",
      error: "Method not allowed."
    });

  } catch (error) {
    console.error("Best Basket error:", error);

    return res.status(500).json({
      status: "FAILED",
      error: error?.message || "Best Basket failed."
    });
  }
}