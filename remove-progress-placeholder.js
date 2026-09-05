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
  function boot(){removePlaceholder();setTimeout(removePlaceholder,500);setTimeout(removePlaceholder,1500);setTimeout(removePlaceholder,3000);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
