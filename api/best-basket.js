import { supermarkets, findProducts } from "./price-database.js";

export default async function handler(req, res) {

  /*
   * =========================================================
   * SHIFT FIT — BEST BASKET
   * Shift Fit Price Database
   *
   * Flow:
   * Shopping List
   *      ↓
   * POST /api/best-basket
   *      ↓
   * runId
   *      ↓
   * GET /api/best-basket?runId=...
   *      ↓
   * Supermarket comparison
   *      ↓
   * Cheapest complete basket
   *      ↓
   * Cheapest mixed basket
   *
   * IMPORTANT:
   * Quantity is calculated as:
   *
   * unit price × quantity = line total
   * =========================================================
   */

  try {

    /*
     * =======================================================
     * POST
     * Start a basket comparison
     * =======================================================
     */

    if (req.method === "POST") {

      const body =
        req.body && typeof req.body === "object"
          ? req.body
          : {};


      /*
       * -------------------------------------------------------
       * NORMALISE SHOPPING ITEMS
       * -------------------------------------------------------
       *
       * Supports:
       *
       * { name:"Chicken breast", qty:2 }
       *
       * or
       *
       * { item:"Chicken breast", quantity:2 }
       *
       * or
       *
       * { query:"Chicken breast", qty:2 }
       */

      const rawItems =
        Array.isArray(body.items)
          ? body.items
          : [];


      const items =
        rawItems
          .map((item) => {

            if (typeof item === "string") {

              return {
                name: item.trim(),
                qty: 1
              };

            }


            if (!item || typeof item !== "object") {

              return null;

            }


            const name =
              String(
                item.name ??
                item.item ??
                item.query ??
                ""
              ).trim();


            let qty =
              Number(
                item.qty ??
                item.quantity ??
                1
              );


            if (
              !Number.isFinite(qty) ||
              qty < 1
            ) {

              qty = 1;

            }


            qty =
              Math.max(
                1,
                Math.floor(qty)
              );


            return {
              name,
              qty
            };

          })
          .filter(
            item =>
              item &&
              item.name
          )
          .slice(0, 30);


      /*
       * -------------------------------------------------------
       * NORMALISE RETAILERS
       * -------------------------------------------------------
       */

      const requestedRetailers =
        Array.isArray(body.retailers)
          ? body.retailers
          : Object.keys(supermarkets);


      const retailers =
        requestedRetailers
          .map(
            retailer =>
              String(
                retailer
              )
              .toLowerCase()
              .trim()
          )
          .filter(
            retailer =>
              retailer &&
              supermarkets[retailer]
          );


      /*
       * -------------------------------------------------------
       * VALIDATION
       * -------------------------------------------------------
       */

      if (!items.length) {

        return res.status(400).json({

          status: "FAILED",

          error:
            "Your shopping list is empty.",

          message:
            "Add at least one shopping item before checking prices."

        });

      }


      if (!retailers.length) {

        return res.status(400).json({

          status: "FAILED",

          error:
            "No valid supermarkets were supplied.",

          message:
            "Please select at least one supermarket."

        });

      }


      /*
       * -------------------------------------------------------
       * CREATE RUN ID
       * -------------------------------------------------------
       *
       * We keep the existing POST → runId → GET architecture.
       */

      const runPayload = {

        items,

        retailers,

        createdAt:
          new Date().toISOString()

      };


      const runId =
        Buffer
          .from(
            JSON.stringify(runPayload),
            "utf8"
          )
          .toString("base64url");


      /*
       * -------------------------------------------------------
       * RETURN RUNNING RESPONSE
       * -------------------------------------------------------
       */

      return res.status(202).json({

        status: "RUNNING",

        runId,

        items,

        retailers,

        startedAt:
          runPayload.createdAt,

        statusMessage:
          "ShiftFit is calculating your supermarket basket."

      });

    }


    /*
     * =======================================================
     * GET
     * Complete a basket comparison
     * =======================================================
     */

    if (req.method === "GET") {

      const runId =
        req.query &&
        req.query.runId
          ? String(req.query.runId)
          : "";


      if (!runId) {

        return res.status(400).json({

          status: "FAILED",

          error:
            "Missing runId.",

          message:
            "The basket comparison ID was not supplied."

        });

      }


      /*
       * -------------------------------------------------------
       * DECODE RUN
       * -------------------------------------------------------
       */

      let runData;


      try {

        runData =
          JSON.parse(
            Buffer
              .from(
                runId,
                "base64url"
              )
              .toString("utf8")
          );

      } catch (error) {

        return res.status(400).json({

          status: "FAILED",

          error:
            "Invalid runId.",

          message:
            "The basket comparison ID could not be read."

        });

      }


      const items =
        Array.isArray(runData.items)
          ? runData.items
          : [];


      const retailers =
        Array.isArray(runData.retailers)
          ? runData.retailers
          : [];


      /*
       * =======================================================
       * BUILD SUPERMARKET RESULTS
       * =======================================================
       */

      const supermarketResults = [];


      /*
       * Keep every individual item result.
       *
       * This is useful for:
       *
       * - supermarket cards
       * - mixed basket
       * - debugging
       * - future live pricing
       */

      const allItemResults = [];


      for (
        const retailerId
        of retailers
      ) {

        const retailer =
          supermarkets[retailerId];


        if (!retailer) {

          continue;

        }


        const retailerName =
          retailer.name ||
          retailerId;


        let supermarketTotal = 0;

        const matchedItems = [];

        const missingItems = [];


        /*
         * -----------------------------------------------------
         * CHECK EVERY SHOPPING ITEM
         * -----------------------------------------------------
         */

        for (
          const requestedItem
          of items
        ) {

          const itemName =
            String(
              requestedItem.name
            ).trim();


          const quantity =
            Math.max(
              1,
              Math.floor(
                Number(
                  requestedItem.qty
                ) || 1
              )
            );


          /*
           * Search this retailer only.
           */

          const matches =
            findProducts(
              itemName,
              [retailerId]
            );


          /*
           * ---------------------------------------------------
           * ITEM NOT FOUND
           * ---------------------------------------------------
           */

          if (
            !Array.isArray(matches) ||
            !matches.length
          ) {

            missingItems.push({

              item:
                itemName,

              quantity

            });


            allItemResults.push({

              item:
                itemName,

              query:
                itemName,

              quantity,

              qty:
                quantity,

              retailer:
                retailerId,

              retailerName,

              available:
                false,

              productName:
                null,

              packSize:
                null,

              unitPrice:
                null,

              total:
                0,

              updatedAt:
                null

            });


            continue;

          }


          /*
           * ---------------------------------------------------
           * CHOOSE CHEAPEST MATCH
           * ---------------------------------------------------
           */

          const product =
            [...matches]
              .filter(
                match =>
                  Number.isFinite(
                    Number(
                      match.price
                    )
                  )
              )
              .sort(
                (a,b) =>
                  Number(a.price) -
                  Number(b.price)
              )[0];


          if (!product) {

            missingItems.push({

              item:
                itemName,

              quantity

            });


            allItemResults.push({

              item:
                itemName,

              query:
                itemName,

              quantity,

              qty:
                quantity,

              retailer:
                retailerId,

              retailerName,

              available:
                false,

              productName:
                null,

              packSize:
                null,

              unitPrice:
                null,

              total:
                0,

              updatedAt:
                null

            });


            continue;

          }


          /*
           * ---------------------------------------------------
           * PRICE CALCULATION
           * ---------------------------------------------------
           *
           * THIS IS THE IMPORTANT PART.
           *
           * Example:
           *
           * Chicken breast = £7.99
           * Quantity = 2
           *
           * £7.99 × 2 = £15.98
           */

          const unitPrice =
            Number(
              product.price
            );


          const lineTotal =
            unitPrice *
            quantity;


          supermarketTotal +=
            lineTotal;


          /*
           * ---------------------------------------------------
           * BUILD MATCHED ITEM
           * ---------------------------------------------------
           */

          const matchedItem = {

            item:
              itemName,

            name:
              itemName,

            query:
              itemName,

            quantity,

            qty:
              quantity,

            retailer:
              retailerId,

            retailerName,

            productId:
              product.id ??
              null,

            productName:
              product.name ??
              product.productName ??
              itemName,

            product:
              product.name ??
              product.productName ??
              itemName,

            packSize:
              product.packSize ??
              product.pack ??
              "",

            pack:
              product.packSize ??
              product.pack ??
              "",

            unitPrice,

            price:
              unitPrice,

            total:
              lineTotal,

            lineTotal:
              lineTotal,

            updatedAt:
              product.updatedAt ??
              null,

            available:
              true

          };


          matchedItems.push(
            matchedItem
          );


          allItemResults.push(
            matchedItem
          );

        }


        /*
         * -----------------------------------------------------
         * SUPERMARKET RESULT
         * -----------------------------------------------------
         */

        supermarketResults.push({

          retailer:
            retailerId,

          retailerName,

          total:
            Number(
              supermarketTotal.toFixed(2)
            ),

          matchedItems,

          items:
            matchedItems,

          missingItems,

          missing:
            missingItems,

          complete:
            missingItems.length===0,

          requestedItemCount:
            items.length,

          matchedItemCount:
            matchedItems.length,

          missingItemCount:
            missingItems.length

        });

      }


      /*
       * =======================================================
       * SORT SUPERMARKETS
       * =======================================================
       *
       * Complete baskets are compared against each other.
       *
       * Incomplete baskets are still returned but don't win.
       */

      const sortedSupermarkets =
        [...supermarketResults]
          .sort(
            (a,b) => {

              if (
                a.complete &&
                !b.complete
              ) {

                return -1;

              }


              if (
                !a.complete &&
                b.complete
              ) {

                return 1;

              }


              return (
                Number(a.total) -
                Number(b.total)
              );

            }
          );


      /*
       * =======================================================
       * COMPLETE SUPERMARKETS
       * =======================================================
       */

      const completeSupermarkets =
        sortedSupermarkets
          .filter(
            basket =>
              basket.complete
          );


      const cheapestComplete =
        completeSupermarkets.length
          ? completeSupermarkets[0]
          : null;


      const secondComplete =
        completeSupermarkets.length > 1
          ? completeSupermarkets[1]
          : null;


      const cheapestCompleteTotal =
        cheapestComplete
          ? Number(
              cheapestComplete.total
            )
          : null;


      /*
       * =======================================================
       * MIXED BASKET
       * =======================================================
       *
       * For every shopping item:
       *
       * 1. Look across ALL supermarkets.
       * 2. Find the cheapest available product.
       * 3. Multiply by requested quantity.
       * 4. Add it to the mixed basket.
       */

      const mixedBasketItems = [];


      let mixedBasketTotal = 0;


      for (
        const requestedItem
        of items
      ) {

        const itemName =
          String(
            requestedItem.name
          ).trim();


        const quantity =
          Math.max(
            1,
            Math.floor(
              Number(
                requestedItem.qty
              ) || 1
            )
          );


        /*
         * Find every available result
         * for this specific item.
         */

        const choices =
          allItemResults
            .filter(
              result =>
                result.available === true &&
                String(
                  result.item
                ).toLowerCase() ===
                itemName.toLowerCase()
            );


        /*
         * -----------------------------------------------------
         * NO AVAILABLE PRODUCT
         * -----------------------------------------------------
         */

        if (!choices.length) {

          mixedBasketItems.push({

            item:
              itemName,

            name:
              itemName,

            query:
              itemName,

            quantity,

            qty:
              quantity,

            available:
              false,

            retailer:
              null,

            retailerName:
              null,

            productId:
              null,

            productName:
              null,

            packSize:
              null,

            unitPrice:
              null,

            total:
              0,

            updatedAt:
              null

          });


          continue;

        }


        /*
         * -----------------------------------------------------
         * CHEAPEST PRODUCT
         * -----------------------------------------------------
         */

        const cheapest =
          [...choices]
            .sort(
              (a,b) =>
                Number(a.unitPrice) -
                Number(b.unitPrice)
            )[0];


        /*
         * IMPORTANT:
         *
         * The quantity is taken from the ORIGINAL
         * shopping list.
         *
         * We don't trust a retailer response to decide
         * how many the customer wanted.
         */

        const unitPrice =
          Number(
            cheapest.unitPrice
          );


        const total =
          unitPrice *
          quantity;


        mixedBasketTotal +=
          total;


        /*
         * -----------------------------------------------------
         * MIXED ITEM
         * -----------------------------------------------------
         */

        mixedBasketItems.push({

          item:
            itemName,

          name:
            itemName,

          query:
            itemName,

          quantity,

          qty:
            quantity,

          retailer:
            cheapest.retailer,

          retailerName:
            cheapest.retailerName,

          productId:
            cheapest.productId,

          productName:
            cheapest.productName,

          product:
            cheapest.productName,

          packSize:
            cheapest.packSize,

          pack:
            cheapest.packSize,

          unitPrice,

          price:
            unitPrice,

          total,

          lineTotal:
            total,

          updatedAt:
            cheapest.updatedAt,

          available:
            true

        });

      }


      mixedBasketTotal =
        Number(
          mixedBasketTotal.toFixed(2)
        );


      /*
       * =======================================================
       * MIXED BASKET SAVINGS
       * =======================================================
       */

      let potentialSavings = null;


      if (
        cheapestCompleteTotal !== null
      ) {

        potentialSavings =
          Number(
            (
              cheapestCompleteTotal -
              mixedBasketTotal
            ).toFixed(2)
          );

      }


      /*
       * =======================================================
       * SUMMARY
       * =======================================================
       */

      const completeCount =
        completeSupermarkets.length;


      const incompleteCount =
        supermarketResults.length -
        completeCount;


      /*
       * =======================================================
       * RAW RESULTS
       * =======================================================
       *
       * Useful for debugging and future development.
       */

      const rawResults =
        allItemResults.map(
          result => ({

            item:
              result.item,

            query:
              result.query,

            retailer:
              result.retailer,

            retailerName:
              result.retailerName,

            productId:
              result.productId,

            productName:
              result.productName,

            packSize:
              result.packSize,

            price:
              result.unitPrice,

            unitPrice:
              result.unitPrice,

            quantity:
              result.quantity,

            qty:
              result.quantity,

            total:
              result.total,

            available:
              result.available,

            updatedAt:
              result.updatedAt

          })
        );


      /*
       * =======================================================
       * FINAL RESPONSE
       * =======================================================
       */

      return res.status(200).json({

        status:
          "SUCCEEDED",

        source:
          "ShiftFit Price Database",

        live:
          false,

        seeded:
          true,

        checkedAt:
          new Date().toISOString(),

        items,

        retailers,

        productsFound:
          allItemResults.filter(
            result =>
              result.available
          ).length,

        summary: {

          requestedItems:
            items.length,

          completeSupermarkets:
            completeCount,

          incompleteSupermarkets:
            incompleteCount,

          cheapestCompleteSupermarket:
            cheapestComplete
              ? cheapestComplete.retailerName
              : null,

          cheapestCompleteTotal,

          secondCheapestCompleteSupermarket:
            secondComplete
              ? secondComplete.retailerName
              : null,

          secondCheapestCompleteTotal:
            secondComplete
              ? Number(
                  secondComplete.total
                )
              : null,

          mixedBasketTotal:
            mixedBasketTotal,

          potentialSavings

        },

        /*
         * -----------------------------------------------------
         * CHEAPEST MIXED BASKET
         * -----------------------------------------------------
         */

        mixedBasket: {

          total:
            mixedBasketTotal,

          items:
            mixedBasketItems,

          itemCount:
            mixedBasketItems.length,

          availableItemCount:
            mixedBasketItems.filter(
              item =>
                item.available
            ).length,

          missingItemCount:
            mixedBasketItems.filter(
              item =>
                !item.available
            ).length

        },

        /*
         * -----------------------------------------------------
         * SUPERMARKET RESULTS
         * -----------------------------------------------------
         */

        supermarkets:
          sortedSupermarkets,

        /*
         * -----------------------------------------------------
         * ALL ITEM RESULTS
         * -----------------------------------------------------
         */

        itemResults:
          allItemResults,

        /*
         * -----------------------------------------------------
         * RAW DATA
         * -----------------------------------------------------
         */

        rawResults

      });

    }


    /*
     * =======================================================
     * METHOD NOT SUPPORTED
     * =======================================================
     */

    return res.status(405).json({

      status:
        "FAILED",

      error:
        "Method not allowed.",

      message:
        "Use POST to start a price check or GET with a runId to retrieve it."

    });


  } catch (error) {

    /*
     * =======================================================
     * GLOBAL ERROR HANDLER
     * =======================================================
     */

    console.error(
      "ShiftFit Best Basket Error:",
      error
    );


    return res.status(500).json({

      status:
        "FAILED",

      error:
        "Best Basket failed.",

      message:
        error &&
        error.message
          ? error.message
          : "An unexpected error occurred while calculating the basket."

    });

  }

}