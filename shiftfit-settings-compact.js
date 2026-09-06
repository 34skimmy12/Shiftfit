/* ShiftFit: compact Settings rows. Applies inline sizing to the actual Settings elements. */
(function(){
  "use strict";
  if(window.__shiftFitSettingsCompactLoaded)return;
  window.__shiftFitSettingsCompactLoaded=true;
  function install(){
    var modal=document.getElementById("shiftfit-settings-split-modal");
    if(!modal)return;
    modal.querySelectorAll(".group").forEach(function(group){
      group.style.marginTop="10px";
      group.style.marginBottom="10px";
      group.style.padding="12px";
      group.style.borderRadius="18px";
    });
    modal.querySelectorAll(".item").forEach(function(item){
      item.style.gridTemplateColumns="42px minmax(0,1fr) 24px";
      item.style.gap="9px";
      item.style.padding="7px 0";
      item.style.minHeight="0";
      item.style.height="56px";
      item.style.boxSizing="border-box";
    });
    modal.querySelectorAll(".item .icon").forEach(function(icon){
      icon.style.width="40px";
      icon.style.height="40px";
      icon.style.minWidth="40px";
      icon.style.borderRadius="11px";
      icon.style.fontSize="18px";
    });
    modal.querySelectorAll(".item .title").forEach(function(el){
      el.style.fontSize="15px";
      el.style.lineHeight="1.1";
    });
    modal.querySelectorAll(".item .copy").forEach(function(el){
      el.style.fontSize="10px";
      el.style.lineHeight="1.15";
      el.style.marginTop="1px";
    });
    modal.querySelectorAll(".item .value").forEach(function(el){
      el.style.fontSize="9px";
      el.style.lineHeight="1.1";
      el.style.marginTop="2px";
    });
    modal.querySelectorAll(".item .arrow").forEach(function(el){
      el.style.fontSize="22px";
    });
  }
  function boot(){
    install();
    new MutationObserver(install).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
