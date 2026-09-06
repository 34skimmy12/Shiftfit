/* ShiftFit: remove the unused progress placeholder card. */
(function(){
  "use strict";
  function removePlaceholder(){
    const host=document.getElementById("progressScreen");
    if(!host)return;
    const candidates=host.querySelectorAll(".progress-coming-card, button, a, section, article, div");
    candidates.forEach(el=>{
      const text=(el.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
      if(text.includes("more progress tracking is coming") || text.includes("more progression coming")){
        el.remove();
      }
    });
  }
  function loadHeaderBridge(){
    if(document.getElementById("shiftfit-profile-plan-bridge-loader"))return;
    const script=document.createElement("script");
    script.id="shiftfit-profile-plan-bridge-loader";
    script.src="./profile-plan-regeneration-bridge.js?v=4";
    script.async=false;
    document.head.appendChild(script);
  }
  function boot(){
    removePlaceholder();
    loadHeaderBridge();
    setTimeout(removePlaceholder,500);
    setTimeout(removePlaceholder,1500);
    setTimeout(removePlaceholder,3000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
