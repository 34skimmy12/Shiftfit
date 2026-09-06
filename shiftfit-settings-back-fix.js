/* ShiftFit Settings — reliable back-button bridge. */
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
    if(typeof target.onclick==="function")target.onclick.call(target,e);
  },true);
})();
