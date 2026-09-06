/* ShiftFit Settings — reliable back-button bridge v2. */
(function(){
  "use strict";
  if(window.__shiftFitSettingsBackFixLoaded)return;
  window.__shiftFitSettingsBackFixLoaded=true;
  document.addEventListener("click",function(e){
    const target=e.target&&e.target.closest?e.target.closest("#shiftfit-settings-split-modal .sheet .back"):null;
    if(!target)return;
    const modal=document.getElementById("shiftfit-settings-split-modal");
    if(!modal||!modal.classList.contains("open"))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const title=modal.querySelector(".backrow h1");
    const name=title?title.textContent.trim():"";
    if(name&&name!=="Settings"&&typeof window.shiftfitSettings?.open==="function"){
      window.shiftfitSettings.open();
      return;
    }
    modal.classList.remove("open");
  },true);
})();
