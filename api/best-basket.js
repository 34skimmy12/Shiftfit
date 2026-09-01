async function checkBestBasket(){
  const button=
    document.getElementById("checkPricesButton");

  const results=
    document.getElementById("basketResults");

  const items=
    getBasketItems();

  if(!items.length){
    setBasketStatus(
      "Your shopping list is empty. Add some items first.",
      "error"
    );
    return;
  }

  button.disabled=true;
  button.textContent="⏳ STARTING PRICE CHECK...";

  results.innerHTML="";

  setBasketStatus(
    "Starting live supermarket comparison...",
    ""
  );

  try{

    /*
     * STEP 1
     * Start the Apify job.
     */
    const startResponse=
      await fetch(
        "/api/best-basket",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            items:items,
            retailers:basketRetailers
          })
        }
      );

    let startData=null;

    try{
      startData=
        await startResponse.json();
    }catch(error){
      throw new Error(
        "The price service returned an invalid response."
      );
    }

    if(!startResponse.ok){

      if(startData && startData.message){
        throw new Error(
          startData.message
        );
      }

      if(startData && startData.error){
        throw new Error(
          startData.error.replaceAll("_"," ")
        );
      }

      throw new Error(
        "The live price service could not start."
      );
    }

    if(!startData.runId){
      throw new Error(
        "The price service did not return a run ID."
      );
    }

    const runId=
      startData.runId;

    /*
     * STEP 2
     * Poll Apify until the job finishes.
     */
    button.textContent=
      "⏳ CHECKING SUPERMARKETS...";

    setBasketStatus(
      "ShiftFit is checking Tesco, Sainsbury's, Asda, Morrisons, Waitrose and Aldi. This may take a little while.",
      ""
    );

    const maxAttempts=40;
    let attempt=0;

    while(attempt<maxAttempts){

      attempt++;

      /*
       * Wait 3 seconds between checks.
       */
      await new Promise(resolve=>
        setTimeout(resolve,3000)
      );

      const queryItems=
        encodeURIComponent(
          JSON.stringify(items)
        );

      const queryRetailers=
        encodeURIComponent(
          JSON.stringify(basketRetailers)
        );

      const pollResponse=
        await fetch(
          "/api/best-basket"+
          "?runId="+encodeURIComponent(runId)+
          "&items="+queryItems+
          "&retailers="+queryRetailers
        );

      let pollData=null;

      try{
        pollData=
          await pollResponse.json();
      }catch(error){
        throw new Error(
          "The price service returned an invalid polling response."
        );
      }

      if(!pollResponse.ok){

        if(
          pollData &&
          pollData.message
        ){
          throw new Error(
            pollData.message
          );
        }

        if(
          pollData &&
          pollData.error
        ){
          throw new Error(
            pollData.error.replaceAll("_"," ")
          );
        }

        throw new Error(
          "The live price service could not complete the request."
        );
      }

      /*
       * Still running.
       */
      if(
        pollData.status==="RUNNING"
      ){

        const progress=
          Math.min(
            95,
            Math.round(
              (attempt/maxAttempts)*100
            )
          );

        button.textContent=
          "⏳ CHECKING... "+progress+"%";

        setBasketStatus(
          pollData.statusMessage ||
          "ShiftFit is comparing live supermarket prices...",
          ""
        );

        continue;
      }

      /*
       * Failed.
       */
      if(
        pollData.status==="FAILED"
      ){
        throw new Error(
          pollData.message ||
          "The supermarket price check failed."
        );
      }

      /*
       * Finished successfully.
       */
      if(
        pollData.status==="SUCCEEDED"
      ){

        button.textContent=
          "✅ PRICES FOUND";

        renderBasketResults(
          pollData
        );

        return;
      }

    }

    /*
     * If we reach this point the scraper has taken
     * longer than our frontend is willing to wait.
     */
    throw new Error(
      "The supermarket comparison is taking longer than expected. Please try again in a moment."
    );

  }catch(error){

    console.error(
      "Best Basket error:",
      error
    );

    setBasketStatus(
      "We couldn't get live prices right now. "+
      error.message,
      "error"
    );

    results.innerHTML=`
      <div class="basket-empty">
        <strong>Price check failed.</strong><br>
        Your shopping list is safe. Try the price check again in a moment.
      </div>
    `;

  }finally{

    button.disabled=false;

    button.textContent=
      "💷 CHECK LIVE PRICES";
  }
}