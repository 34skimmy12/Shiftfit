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

  const defaultRetailers = [
    "tesco",
    "sainsburys",
    "asda",
    "morrisons",
    "waitrose",
    "aldi"
  ];

  const normaliseRetailer = value => {
    const key = clean(value);

    const aliases = {
      "tesco": "tesco",
      "tesco uk": "tesco",
      "sainsburys": "sainsburys",
      "sainsbury's": "sainsburys",
      "asda": "asda",
      "morrisons": "morrisons",
      "waitrose": "waitrose",
      "aldi": "aldi"
    };

    return aliases[key] || key.replace(/\s+/g, "");
  };

  const normaliseItems = body => {
    return (
      Array.isArray(body?.items)
        ? body.items
        : []
    )
      .map(item => ({
        name: String(item?.name || "").trim(),
        qty: Math.max(
          1,
          Number(item?.qty) || 1
        )
      }))
      .filter(item => item.name)
      .slice(0, 30);
  };

  /*
   * START APIFY PRICE CHECK
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
      Array.isArray(body?.retailers) &&
      body.retailers.length
        ? body.retailers.map(
            normaliseRetailer
          )
        : defaultRetailers;

    if (!items.length) {
      return res.status(400).json({
        error: "NO_ITEMS",
        message:
          "No shopping-list items were supplied."
      });
    }

    try {
      const url =
        "https://api.apify.com/v2/actors/" +
        "studio-amba~uk-grocery-price-matrix/runs" +
        "?token=" +
        encodeURIComponent(token);

      const input = {
        searchQueries:
          items.map(
            item => item.name
          ),

        retailers,

        maxItemsPerSource: 15,

        timeoutPerSourceSecs: 150,

        proxyConfiguration: {
          useApifyProxy: true,

          apifyProxyGroups: [
            "RESIDENTIAL"
          ],

          apifyProxyCountry: "GB"
        }
      };

      const response =
        await fetch(
          url,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(input)
          }
        );

      const text =
        await response.text();

      /*
       * IMPORTANT:
       * Return Apify's actual error.
       */
      if (!response.ok) {
        let providerError = null;

        try {
          providerError =
            JSON.parse(text);
        } catch {
          providerError = null;
        }

        const message =
          providerError?.error?.message ||
          providerError?.message ||
          providerError?.error ||
          text ||
          "Apify rejected the request.";

        console.error(
          "APIFY START FAILED",
          {
            status:
              response.status,

            response:
              text.slice(0, 3000)
          }
        );

        return res.status(502).json({
          error:
            "PRICE_PROVIDER_START_ERROR",

          providerStatus:
            response.status,

          providerMessage:
            String(message).slice(
              0,
              2000
            ),

          providerResponse:
            text.slice(
              0,
              3000
            )
        });
      }

      let data;

      try {
        data =
          JSON.parse(text);
      } catch {
        return res.status(502).json({
          error:
            "INVALID_PROVIDER_RESPONSE",

          message:
            "Apify returned an invalid response.",

          providerResponse:
            text.slice(0, 3000)
        });
      }

      const run =
        data.data || data;

      if (!run.id) {
        return res.status(502).json({
          error:
            "NO_APIFY_RUN_ID",

          message:
            "Apify did not return a run ID.",

          providerResponse:
            text.slice(0, 3000)
        });
      }

      return res.status(202).json({
        status: "RUNNING",

        runId:
          run.id,

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
        "BEST BASKET START ERROR",
        error
      );

      return res.status(500).json({
        error:
          "BEST_BASKET_START_ERROR",

        message:
          error?.message ||
          "Unable to contact Apify."
      });
    }
  }

  /*
   * POLL APIFY RUN
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

      const response =
        await fetch(runUrl);

      const text =
        await response.text();

      if (!response.ok) {
        return res.status(502).json({
          error:
            "APIFY_STATUS_ERROR",

          providerStatus:
            response.status,

          providerResponse:
            text.slice(0, 3000)
        });
      }

      let data;

      try {
        data =
          JSON.parse(text);
      } catch {
        return res.status(502).json({
          error:
            "INVALID_APIFY_STATUS",

          message:
            "Apify returned invalid status data."
        });
      }

      const run =
        data.data || data;

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
            "Apify completed but returned no dataset."
        });
      }

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

          providerResponse:
            datasetText.slice(0, 3000)
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

      let items = [];

      if (
        typeof req.query?.items ===
        "string"
      ) {
        try {
          items =
            JSON.parse(
              req.query.items
            );
        } catch {
          items = [];
        }
      }

      if (!items.length) {
        items =
          rows
            .map(row => ({
              name:
                String(
                  row?.item ||
                  row?.query ||
                  row?.searchQuery ||
                  ""
                ),
              qty: 1
            }))
            .filter(
              item => item.name
            );
      }

      let retailers =
        defaultRetailers;

      if (
        typeof req.query?.retailers ===
        "string"
      ) {
        try {
          const supplied =
            JSON.parse(
              req.query.retailers
            );

          if (
            Array.isArray(
              supplied
            ) &&
            supplied.length
          ) {
            retailers =
              supplied.map(
                normaliseRetailer
              );
          }
        } catch {
          retailers =
            defaultRetailers;
        }
      }

      /*
       * Return raw Apify data for now.
       * This lets us verify exactly what the Actor produced.
       */
      return res.status(200).json({
        status:
          "SUCCEEDED",

        source:
          "Apify UK Grocery Price Matrix",

        checkedAt:
          new Date().toISOString(),

        items,

        retailers,

        productsFound:
          rows.length,

        rawResults:
          rows.slice(0, 100)
      });

    } catch (error) {
      console.error(
        "BEST BASKET POLL ERROR",
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
      "Only GET and POST are supported."
  });
}