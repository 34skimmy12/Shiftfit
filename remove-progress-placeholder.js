/* ShiftFit: remove the unused progress placeholder card and boot stable UI bridges. */
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
    loadScript("shiftfit-profile-plan-bridge-loader","./profile-plan-regeneration-bridge.js?v=5");
    loadScript("shiftfit-avatar-sync-loader","./shiftfit-avatar-sync.js?v=1");
    loadScript("shiftfit-notifications-loader","./shiftfit-notifications.js?v=1");
    loadScript("shiftfit-app-settings-loader","./shiftfit-app-settings.js?v=1");
    loadScript("shiftfit-settings-back-fix-loader","./shiftfit-settings-back-fix.js?v=1");
    loadScript("shiftfit-account-settings-loader","./shiftfit-account-settings.js?v=1");
    loadScript("shiftfit-data-privacy-loader","./shiftfit-data-privacy.js?v=1");
    loadScript("shiftfit-support-ai-loader","./shiftfit-support-ai.js?v=1");
    loadScript("shiftfit-gmail-support-loader","./shiftfit-gmail-support.js?v=1");
    loadScript("shiftfit-settings-compact-loader","./shiftfit-settings-compact.js?v=2");
    setTimeout(removePlaceholder,500);
    setTimeout(removePlaceholder,1500);
    setTimeout(removePlaceholder,3000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
