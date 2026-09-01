export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST required"
    });
  }

  const token = process.env.APIFY_TOKEN;

  if (!token) {
    return res.status(503).json({
      error: "PRICE_PROVIDER_NOT_CONFIGURED",
      message: "Add APIFY_TOKEN to Vercel environment variables."
    });
  }

  const body = req.body || {};

  const items = (Array.isArray(body.items) ? body.items : [])
    .map(item => ({
      name: String(item.name || "").trim(),
      qty: Math.max(1, Number(item.qty) || 1)
    }))
    .filter(item => item.name)
    .slice(0, 30);

  if (!items.length) {
    return res.status(400).json({
      error: "NO_ITEMS"
    });
  }

  const retailers =
    Array.isArray(body.retailers) && body.retailers.length
      ? body.retailers
      : [
          "tesco",
          "sainsburys",
          "asda",
          "morrisons",
          "waitrose",
          "aldi"
        ];

  try {
    const provider = await fetch(
      "https://api.apify.com/v2/acts/studio-amba~uk-grocery-price-matrix/run-sync-get-dataset-items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          searchQueries: items.map(item => item.name),
          retailers
        })
      }
    );

    const text = await provider.text();

    if (!provider.ok) {
      return res.status(502).json({
        error: "PRICE_PROVIDER_ERROR",
        providerStatus: provider.status,
        detail: text.slice(0, 1000)
      });
    }

    let rows;

    try {
      rows = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "INVALID_PROVIDER_RESPONSE"
      });
    }

    if (!Array.isArray(rows)) {
      rows = [rows];
    }

    const products = rows
      .map(row => ({
        item: String(
          row.item ||
          row.query ||
          row.searchQuery ||
          row.name ||
          ""
        ),

        retailer: String(
          row.retailer ||
          row.supermarket ||
          row.supermarket_name ||
          ""
        ),

        product: String(
          row.product ||
          row.product_name ||
          row.name ||
          ""
        ),

        price: Number(
          row.price ??
          row.current_price ??
          row.retail_price
        ),

        unitPrice: Number(
          row.normalized_price ??
          row.unit_price
        ),

        pack:
          row.packaging ||
          row.pack_size ||
          row.size ||
          "",

        url:
          row.url ||
          row.product_url ||
          "",

        image:
          row.image ||
          row.image_url ||
          ""
      }))
      .filter(product =>
        product.item &&
        product.retailer &&
        Number.isFinite(product.price)
      );

    const baskets = retailers
      .map(retailer => {
        const basket = {
          retailer,
          total: 0,
          items: [],
          missing: []
        };

        for (const item of items) {
          const match = products.find(product =>
            product.item.toLowerCase() === item.name.toLowerCase() &&
            product.retailer.toLowerCase() === retailer.toLowerCase()
          );

          if (!match) {
            basket.missing.push(item.name);
            continue;
          }

          const lineTotal = Number(
            (match.price * item.qty).toFixed(2)
          );

          basket.total += lineTotal;

          basket.items.push({
            ...match,
            qty: item.qty,
            lineTotal
          });
        }

        basket.total = Number(
          basket.total.toFixed(2)
        );

        return basket;
      })
      .sort((a, b) => a.total - b.total);

    const completeBaskets = baskets.filter(
      basket =>
        basket.items.length > 0 &&
        basket.missing.length === 0
    );

    return res.status(200).json({
      source: "Apify UK Grocery Price Matrix",
      checkedAt: new Date().toISOString(),
      items,
      baskets,
      bestBasket: completeBaskets[0] || null,
      partial: completeBaskets.length === 0
    });

  } catch (error) {
    return res.status(500).json({
      error: "BEST_BASKET_ERROR",
      message: error.message
    });
  }
}