export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const token = process.env.APIFY_TOKEN;

  if (!token) {
    return res.status(503).json({
      error: "PRICE_PROVIDER_NOT_CONFIGURED",
      message: "APIFY_TOKEN is not configured in Vercel."
    });
  }

  const clean = value =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const numberValue = value => {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  };

  const retailerAliases = {
    tesco: "tesco",
    "tesco uk": "tesco",
    sainsburys: "sainsburys",
    "sainsbury's": "sainsburys",
    "sainsbury’s": "sainsburys",
    asda: "asda",
    morrisons: "morrisons",
    "morrisons supermarket": "morrisons",
    waitrose: "waitrose",
    aldi: "aldi"
  };

  const normaliseRetailer = value => {
    const key = clean(value);

    if (retailerAliases[key]) {
      return retailerAliases[key];
    }

    return key.replace(/\s+/g, "");
  };

  const defaultRetailers = [
    "tesco",
    "sainsburys",
    "asda",
    "morrisons",
    "waitrose",
    "aldi"
  ];

  const normaliseItems = body => {
    return (
      Array.isArray(body?.items)
        ? body.items
        : []
    )
      .map(item => ({
        name: String(item?.name || "").trim(),
        qty: Math.max(1, Number(item?.qty) || 1)
      }))
      .filter(item => item.name)
      .slice(0, 30);
  };

  const normaliseRetailers = body => {
    const supplied =
      Array.isArray(body?.retailers) &&
      body.retailers.length
        ? body.retailers
        : defaultRetailers;

    return supplied
      .map(normaliseRetailer)
      .filter(Boolean);
  };

  const findItemName = (row, items) => {
    const possibleNames = [
      row?.item,
      row?.query,
      row?.searchQuery,
      row?.search_query,
      row?.queryName,
      row?.name,
      row?.product_name
    ]
      .map(value => String(value || "").trim())
      .filter(Boolean);

    if (!possibleNames.length) {
      return "";
    }

    for (const possible of possibleNames) {
      const exact = items.find(
        item => clean(item.name) === clean(possible)
      );

      if (exact) {
        return exact.name;
      }
    }

    let bestMatch = null;
    let bestScore = 0;

    for (const possible of possibleNames) {
      const sourceWords = new Set(
        clean(possible)
          .split(" ")
          .filter(word => word.length > 2)
      );

      for (const item of items) {
        const targetWords = new Set(
          clean(item.name)
            .split(" ")
            .filter(word => word.length > 2)
        );

        if (!sourceWords.size || !targetWords.size) {
          continue;
        }

        let overlap = 0;

        for (const word of sourceWords) {
          if (targetWords.has(word)) {
            overlap++;
          }
        }

        const score =
          overlap /
          Math.max(
            sourceWords.size,
            targetWords.size
          );

        if (score > bestScore) {
          bestScore = score;
          bestMatch = item.name;
        }
      }
    }

    return bestScore >= 0.3
      ? bestMatch
      : "";
  };

  const normaliseRows = (rows, items) => {
    const products = [];

    for (const row of rows) {
      if (!row || typeof row !== "object") {
        continue;
      }

      const nestedRetailers =
        Array.isArray(row.retailers)
          ? row.retailers
          : Array.isArray(row.prices)
          ? row.prices
          : [];

      if (nestedRetailers.length) {
        const itemName =
          findItemName(row, items);

        if (itemName) {
          for (const retailerRow of nestedRetailers) {
            if (
              !retailerRow ||
              typeof retailerRow !== "object"
            ) {
              continue;
            }

            const retailer =
              normaliseRetailer(
                retailerRow.name ||
                retailerRow.retailer ||
                retailerRow.supermarket
              );

            const price =
              numberValue(
                retailerRow.price ??
                retailerRow.currentPrice ??
                retailerRow.current_price
              );

            if (!retailer || price === null) {
              continue;
            }

            products.push({
              item: itemName,

              retailer: retailer,

              product:
                retailerRow.product ||
                row.product ||
                row.productName ||
                row.name ||
                itemName,

              price: price,

              unitPrice:
                retailerRow.pricePerUnit ||
                retailerRow.unitPrice ||
                "",

              pack:
                retailerRow.packSize ||
                retailerRow.pack ||
                row.packSize ||
                "",

              url:
                retailerRow.outboundUrl ||
                retailerRow.url ||
                row.url ||
                "",

              image:
                retailerRow.imageUrl ||
                retailerRow.image ||
                row.imageUrl ||
                ""
            });
          }

          continue;
        }
      }

      const retailer =
        normaliseRetailer(
          row.retailer ||
          row.supermarket ||
          row.supermarket_name ||
          row.store
        );

      const price =
        numberValue(
          row.price ??
          row.current_price ??
          row.retail_price
        );

      const itemName =
        findItemName(row, items);

      if (
        itemName &&
        retailer &&
        price !== null
      ) {
        products.push({
          item: itemName,

          retailer: retailer,

          product:
            row.product ||
            row.product_name ||
            row.productName ||
            row.name ||
            itemName,

          price: price,

          unitPrice:
            row.pricePerUnit ||
            row.unit_price ||
            row.normalized_price ||
            "",

          pack:
            row.packaging ||
            row.pack_size ||
            row.packSize ||
            row.size ||
            "",

          url:
            row.url ||
            row.product_url ||
            row.productUrl ||
            "",

          image:
            row.image ||
            row.image_url ||
            row.imageUrl ||
            ""
        });
      }
    }

    return products;
  };

  const buildBaskets = (
    products,
    items,
    retailers
  ) => {
    const baskets =
      retailers
        .map(retailer => {
          const basket = {
            retailer,
            total: 0,
            items: [],
            missing: []
          };

          for (const item of items) {
            const matches =
              products.filter(product =>
                clean(product.item) ===
                  clean(item.name) &&
                clean(product.retailer) ===
                  clean(retailer)
              );

            if (!matches.length) {
              basket.missing.push(
                item.name
              );

              continue;
            }

            const match =
              [...matches].sort(
                (a, b) =>
                  a.price - b.price
              )[0];

            const lineTotal =
              Number(
                (
                  match.price *
                  item.qty
                ).toFixed(2)
              );

            basket.total += lineTotal;

            basket.items.push({
              ...match,
              qty: item.qty,
              lineTotal
            });
          }

          basket.total =
            Number(
              basket.total.toFixed(2)
            );

          return basket;
        })
        .sort(
          (a, b) =>
            a.total - b.total
        );

    const completeBaskets =
      baskets.filter(
        basket =>
          basket.items.length > 0 &&
          basket.missing.length === 0
      );

    return {
      baskets,
      bestBasket:
        completeBaskets[0] || null
    };
  };

  /*
   * START NEW PRICE CHECK
   */
  if (req.method === "POST") {
    const body =
      typeof req.body === "string"
        ? (() => {
            try {
              return JSON.parse(req.body);
            } catch {
              return {};
            }
          })()
        : req.body || {};

    const items =
      normaliseItems(body);

    const retailers =
      normaliseRetailers(body);

    if (!items.length) {
      return res.status(400).json({
        error: "NO_ITEMS",
        message:
          "No shopping-list items were supplied."
      });
    }

    try {
      const apifyUrl =
        "https://api.apify.com/v2/actors/" +
        "studio-amba~uk-grocery-price-matrix/runs" +
        "?token=" +
        encodeURIComponent(token);

      const response =
        await fetch(
          apifyUrl,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              searchQueries:
                items.map(
                  item => item.name
                ),

              retailers,

              maxItemsPerSource: 10,

              timeoutPerSourceSecs: 90,

              proxyConfiguration: {
                useApifyProxy: true,

                apifyProxyGroups: [
                  "RESIDENTIAL"
                ],

                apifyProxyCountry: "GB"
              }
            })
          }
        );

      const text =
        await response.text();

      if (!response.ok) {
        return res.status(502).json({
          error:
            "PRICE_PROVIDER_START_ERROR",

          providerStatus:
            response.status,

          detail:
            text.slice(0, 1000)
        });
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        return res.status(502).json({
          error:
            "INVALID_PROVIDER_RESPONSE",

          message:
            "Apify returned an invalid response."
        });
      }

      const run =
        data.data || data;

      if (!run.id) {
        return res.status(502).json({
          error:
            "NO_APIFY_RUN_ID",

          message:
            "Apify did not return a run ID."
        });
      }

      return res.status(202).json({
        status: "RUNNING",

        runId: run.id,

        datasetId:
          run.defaultDatasetId ||
          null,

        items,

        retailers,

        startedAt:
          new Date().toISOString()
      });

    } catch (error) {
      console.error(
        "Apify start error:",
        error
      );

      return res.status(500).json({
        error:
          "BEST_BASKET_START_ERROR",

        message:
          error?.message ||
          "Unable to start price check."
      });
    }
  }

  /*
   * CHECK EXISTING PRICE CHECK
   */
  if (req.method === "GET") {
    const runId =
      req.query?.runId;

    if (!runId) {
      return res.status(400).json({
        error: "NO_RUN_ID",

        message:
          "A runId is required."
      });
    }

    try {
      const runUrl =
        "https://api.apify.com/v2/actor-runs/" +
        encodeURIComponent(runId) +
        "?token=" +
        encodeURIComponent(token);

      const runResponse =
        await fetch(runUrl);

      const runText =
        await runResponse.text();

      if (!runResponse.ok) {
        return res.status(502).json({
          error:
            "APIFY_STATUS_ERROR",

          providerStatus:
            runResponse.status,

          detail:
            runText.slice(0, 1000)
        });
      }

      let runData;

      try {
        runData =
          JSON.parse(runText);
      } catch {
        return res.status(502).json({
          error:
            "INVALID_APIFY_STATUS",

          message:
            "Apify returned an invalid status response."
        });
      }

      const run =
        runData.data || runData;

      const status =
        String(
          run.status || ""
        ).toUpperCase();

      if (
        status === "READY" ||
        status === "RUNNING"
      ) {
        return res.status(200).json({
          status: "RUNNING",

          runId,

          startedAt:
            run.startedAt ||
            null,

          statusMessage:
            status === "READY"
              ? "Apify is preparing the price check."
              : "ShiftFit is checking supermarket prices."
        });
      }

      if (
        status === "FAILED" ||
        status === "ABORTED" ||
        status === "TIMED-OUT"
      ) {
        return res.status(502).json({
          status: "FAILED",

          error:
            "PRICE_CHECK_FAILED",

          message:
            "Apify finished with status " +
            status +
            "."
        });
      }

      if (
        status !== "SUCCEEDED"
      ) {
        return res.status(200).json({
          status: "RUNNING",

          runId,

          statusMessage:
            "Price check status: " +
            (status || "PROCESSING")
        });
      }

      const datasetId =
        run.defaultDatasetId;

      if (!datasetId) {
        return res.status(502).json({
          error:
            "NO_DATASET_ID",

          message:
            "Apify completed but no dataset was returned."
        });
      }

      /*
       * DOWNLOAD RESULTS
       */
      const datasetUrl =
        "https://api.apify.com/v2/datasets/" +
        encodeURIComponent(datasetId) +
        "/items?clean=true&token=" +
        encodeURIComponent(token);

      const datasetResponse =
        await fetch(datasetUrl);

      const datasetText =
        await datasetResponse.text();

      if (!datasetResponse.ok) {
        return res.status(502).json({
          error:
            "APIFY_DATASET_ERROR",

          providerStatus:
            datasetResponse.status,

          detail:
            datasetText.slice(0, 1000)
        });
      }

      let rows;

      try {
        rows =
          JSON.parse(datasetText);
      } catch {
        return res.status(502).json({
          error:
            "INVALID_DATASET_RESPONSE",

          message:
            "Apify returned invalid dataset data."
        });
      }

      if (!Array.isArray(rows)) {
        rows = [rows];
      }

      /*
       * RECOVER SHOPPING LIST
       */
      let finalItems = [];

      if (
        typeof req.query?.items ===
        "string"
      ) {
        try {
          finalItems =
            JSON.parse(
              req.query.items
            );
        } catch {
          finalItems = [];
        }
      }

      if (!finalItems.length) {
        const inferred =
          rows
            .map(row =>
              row?.item ||
              row?.query ||
              row?.searchQuery
            )
            .filter(Boolean);

        finalItems =
          [
            ...new Map(
              inferred.map(
                name => [
                  clean(name),

                  {
                    name:
                      String(name),

                    qty: 1
                  }
                ]
              )
            ).values()
          ];
      }

      /*
       * RECOVER RETAILERS
       */
      let finalRetailers = [];

      if (
        typeof req.query?.retailers ===
        "string"
      ) {
        try {
          finalRetailers =
            JSON.parse(
              req.query.retailers
            );
        } catch {
          finalRetailers = [];
        }
      }

      if (!finalRetailers.length) {
        finalRetailers =
          defaultRetailers;
      }

      /*
       * BUILD PRICE DATA
       */
      const products =
        normaliseRows(
          rows,
          finalItems
        );

      const result =
        buildBaskets(
          products,
          finalItems,
          finalRetailers
        );

      return res.status(200).json({
        status: "SUCCEEDED",

        source:
          "Apify UK Grocery Price Matrix",

        checkedAt:
          new Date().toISOString(),

        items:
          finalItems,

        baskets:
          result.baskets,

        bestBasket:
          result.bestBasket,

        partial:
          !result.bestBasket,

        productsFound:
          products.length
      });

    } catch (error) {
      console.error(
        "Best Basket polling error:",
        error
      );

      return res.status(500).json({
        error:
          "BEST_BASKET_POLL_ERROR",

        message:
          error?.message ||
          "Unable to complete price check."
      });
    }
  }

  return res.status(405).json({
    error:
      "METHOD_NOT_ALLOWED",

    message:
      "Only GET and POST requests are supported."
  });
}