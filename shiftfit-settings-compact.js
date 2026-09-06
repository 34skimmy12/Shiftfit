/* ShiftFit: compact Settings rows — targets the real split-settings modal. */
(function(){
  "use strict";
  if(window.__shiftFitSettingsCompactLoaded)return;
  window.__shiftFitSettingsCompactLoaded=true;

  function install(){
    var modal=document.getElementById("shiftfit-settings-split-modal");
    if(!modal)return;
    var old=document.getElementById("shiftfit-settings-compact-style");
    if(old)old.remove();

    var style=document.createElement("style");
    style.id="shiftfit-settings-compact-style";
    style.textContent=`
      /* Settings only — compact rows */
      #shiftfit-settings-split-modal .group{margin-bottom:14px !important;}
      #shiftfit-settings-split-modal .group button,
      #shiftfit-settings-split-modal .item,
      #shiftfit-settings-split-modal .settings-row,
      #shiftfit-settings-split-modal .setting-row{
        min-height:64px !important;
        padding:8px 12px !important;
        margin:0 !important;
      }
      #shiftfit-settings-split-modal .group button > div,
      #shiftfit-settings-split-modal .item > div{
        gap:10px !important;
      }
      #shiftfit-settings-split-modal .icon{
        width:44px !important;
        height:44px !important;
        min-width:44px !important;
      }
      #shiftfit-settings-split-modal h3,
      #shiftfit-settings-split-modal strong{
        font-size:16px !important;
        line-height:1.15 !important;
      }
      #shiftfit-settings-split-modal p,
      #shiftfit-settings-split-modal small{
        font-size:13px !important;
        line-height:1.2 !important;
        margin-top:3px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function boot(){
    install();
    new MutationObserver(install).observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();
