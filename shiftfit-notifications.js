/* ShiftFit Notifications — small UI/permission enhancement layered over the stable Settings screen. */
(function(){
  "use strict";
  if(window.__shiftFitNotificationsLoaded)return;
  window.__shiftFitNotificationsLoaded=true;

  const STYLE_ID="shiftfit-notifications-style";

  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement("style");
    s.id=STYLE_ID;
    s.textContent=`
      #shiftfit-settings-split-modal .check{justify-content:space-between;min-height:52px;box-sizing:border-box}
      #shiftfit-settings-split-modal .check input{appearance:none;-webkit-appearance:none;width:50px;height:30px;flex:0 0 50px;margin:0;border:1px solid #39466f;border-radius:999px;background:#151b31;position:relative;cursor:pointer;transition:.18s ease}
      #shiftfit-settings-split-modal .check input:before{content:"";position:absolute;width:22px;height:22px;left:3px;top:3px;border-radius:50%;background:#7f879c;transition:.18s ease}
      #shiftfit-settings-split-modal .check input:checked{background:#6638d8;border-color:#8b5cf6}
      #shiftfit-settings-split-modal .check input:checked:before{left:23px;background:#fff}
      #shiftfit-settings-split-modal .check input:disabled{opacity:.45;cursor:not-allowed}
      #shiftfit-settings-split-modal .notification-status{margin:2px 0 8px;padding:11px 12px;border-radius:12px;background:#0b1021;border:1px solid #293253;color:#aab1c5;font-size:11px;line-height:1.4}
    `;
    document.head.appendChild(s);
  }

  function enhance(){
    const modal=document.getElementById("shiftfit-settings-split-modal");
    if(!modal||!modal.classList.contains("open"))return;
    const heading=modal.querySelector("h1");
    if(!heading||heading.textContent.trim()!=="Notifications")return;
    addStyles();

    const master=modal.querySelector('input[data-k="notifications"]');
    const children=[
      modal.querySelector('input[data-k="mealReminders"]'),
      modal.querySelector('input[data-k="workoutReminders"]'),
      modal.querySelector('input[data-k="waterReminders"]')
    ].filter(Boolean);
    if(!master||master.dataset.shiftfitEnhanced==="1")return;

    const group=master.closest(".group");
    if(group){
      const save=group.querySelector("[data-save]");
      if(save){
        const status=document.createElement("div");
        status.className="notification-status";
        status.textContent="Notifications are enabled for ShiftFit reminders on this device.";
        group.insertBefore(status,save);
      }
    }

    function syncChildren(){
      children.forEach(input=>{
        input.disabled=!master.checked;
        if(input.parentElement)input.parentElement.style.opacity=master.checked?"1":".55";
      });
    }

    master.dataset.shiftfitEnhanced="1";
    master.addEventListener("change",function(){
      syncChildren();
      const status=group&&group.querySelector(".notification-status");
      if(status)status.textContent=master.checked?"Notifications are enabled for ShiftFit reminders on this device.":"Notifications are disabled. Reminder options are paused until you enable notifications again.";
      if(master.checked && "Notification" in window && Notification.permission==="default"){
        Notification.requestPermission().catch(function(){});
      }
    });
    syncChildren();
  }

  function watch(){
    enhance();
    const observer=new MutationObserver(enhance);
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(enhance,250);
    setTimeout(enhance,750);
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",watch,{once:true});else watch();
})();
