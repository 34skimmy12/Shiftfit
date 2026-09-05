/* ShiftFit: remove the unused progress placeholder card. */
(function(){
  "use strict";
  function removePlaceholder(){
    const host=document.getElementById("progressScreen");
    if(!host)return;
    const needle="more progression coming";
    const candidates=host.querySelectorAll("button,a,section,article,div");
    candidates.forEach(el=>{
      const text=(el.textContent||"").replace(/\s+/g," ").trim().toLowerCase();
      if(text.includes(needle) && text.length < 180){
        el.remove();
      }
    });
  }
  function boot(){removePlaceholder();setTimeout(removePlaceholder,500);setTimeout(removePlaceholder,1500);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
