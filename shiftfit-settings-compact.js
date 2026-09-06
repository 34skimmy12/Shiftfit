/* ShiftFit: compact Settings rows. Visual-only; does not move, remove, or rename tabs. */
(function(){
  "use strict";
  if(window.__shiftFitSettingsCompactLoaded)return;
  window.__shiftFitSettingsCompactLoaded=true;
  function install(){
    var modal=document.getElementById("shiftfit-settings-split-modal");
    if(!modal)return;
    var style=document.getElementById("shiftfit-settings-compact-style");
    if(!style){
      style=document.createElement("style");
      style.id="shiftfit-settings-compact-style";
      document.head.appendChild(style);
    }
    style.textContent=`
      /* ONLY the Settings modal. Profile is intentionally untouched. */
      #shiftfit-settings-split-modal .item{
        grid-template-columns:42px minmax(0,1fr) 24px !important;
        gap:10px !important;
        padding:9px 0 !important;
        min-height:0 !important;
      }
      #shiftfit-settings-split-modal .item .icon{
        width:42px !important;
        height:42px !important;
        min-width:42px !important;
        border-radius:12px !important;
        font-size:19px !important;
      }
      #shiftfit-settings-split-modal .item .title{
        font-size:15px !important;
        line-height:1.15 !important;
      }
      #shiftfit-settings-split-modal .item .copy{
        font-size:10.5px !important;
        line-height:1.25 !important;
        margin-top:2px !important;
      }
      #shiftfit-settings-split-modal .item .value{
        font-size:9.5px !important;
        line-height:1.2 !important;
        margin-top:3px !important;
      }
      #shiftfit-settings-split-modal .item .arrow{
        font-size:24px !important;
      }
    `;
  }
  function boot(){
    install();
    new MutationObserver(install).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
