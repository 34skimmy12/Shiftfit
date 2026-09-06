/* ShiftFit: remove the unused progress placeholder card and boot safe UI bridges. */
(function(){
  "use strict";
  function removePlaceholder(){
    const host=document.getElementById("progressScreen");
    if(!host)return;
    const candidates=host.querySelectorAll(".progress-coming-card, button, a, section, article, div");
    candidates.forEach(el=>{
      const text=(el.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
      if(text.includes("more progress tracking is coming") || text.includes("more progression coming"))el.remove();
    });
  }
  function loadScript(id,src){
    if(document.getElementById(id))return;
    const script=document.createElement("script");
    script.id=id;script.src=src;script.async=false;document.head.appendChild(script);
  }
  function boot(){
    removePlaceholder();
    loadScript("shiftfit-profile-plan-bridge-loader","./profile-plan-regeneration-bridge.js?v=6");
    loadScript("shiftfit-avatar-sync-loader","./shiftfit-avatar-sync.js?v=1");
    loadScript("shiftfit-direct-signup-loader","./shiftfit-signup-direct.js?v=1");
    setTimeout(removePlaceholder,500);
    setTimeout(removePlaceholder,1500);
    setTimeout(removePlaceholder,3000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
