/* ShiftFit Account & Sync UI v1 — restore, status and safer device linking. */
(function(){
  "use strict";
  if(window.__shiftFitAccountSyncUiLoaded)return;
  window.__shiftFitAccountSyncUiLoaded=true;

  function getSync(){return window.shiftfitCloudSync||null;}
  function toast(text){
    var old=document.querySelector(".toast");if(old)old.remove();
    var t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);
    setTimeout(function(){t.remove();},3000);
  }
  function makeButton(label,id,secondary){
    var b=document.createElement("button");b.type="button";b.id=id;b.textContent=label;b.className=secondary?"secondary":"save";return b;
  }
  function install(){
    var box=document.getElementById("shiftfit-account-state");
    if(!box)return;
    var group=box.querySelector(".group");
    if(!group||!document.getElementById("shiftfit-signout"))return;
    if(document.getElementById("shiftfit-cloud-controls"))return;
    var sync=getSync();
    if(!sync)return;

    var wrap=document.createElement("div");
    wrap.id="shiftfit-cloud-controls";
    wrap.style.marginTop="14px";

    var status=document.createElement("div");
    status.id="shiftfit-cloud-status";
    status.className="note";
    status.style.margin="0 0 10px";
    status.textContent=typeof sync.formatLastSync==="function"?sync.formatLastSync():"Cloud sync status available";
    wrap.appendChild(status);

    var restore=makeButton("Restore cloud data","shiftfit-restore-cloud",true);
    restore.style.marginTop="8px";
    wrap.appendChild(restore);

    var help=document.createElement("div");
    help.className="note";
    help.style.marginTop="8px";
    help.textContent="Restore replaces ShiftFit data on this device with your saved cloud backup.";
    wrap.appendChild(help);

    var syncButton=document.getElementById("shiftfit-sync-now");
    if(syncButton&&syncButton.parentNode===group){
      group.insertBefore(wrap,syncButton.nextSibling);
    }else group.appendChild(wrap);

    function refresh(){
      var s=getSync();
      if(!s)return;
      status.textContent=typeof s.formatLastSync==="function"?s.formatLastSync():"Cloud sync status available";
    }

    restore.onclick=async function(){
      var s=getSync();
      if(!s||typeof s.restoreCloud!=="function"){toast("Cloud restore is still loading. Please try again.");return;}
      if(!window.confirm("Restore your saved ShiftFit data to this device? This will replace the ShiftFit data currently stored on this device."))return;
      restore.disabled=true;restore.textContent="Restoring…";
      try{await s.restoreCloud({reload:true});}finally{restore.disabled=false;restore.textContent="Restore cloud data";refresh();}
    };

    window.addEventListener("shiftfitCloudSynced",refresh);
    window.addEventListener("shiftfitCloudRestored",refresh);
    refresh();
  }

  function boot(){
    install();
    var observer=new MutationObserver(function(){install();});
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
