/* ShiftFit: remove unused progress placeholder and boot the final approved UI. */
(function(){
  "use strict";
  function removePlaceholder(){const host=document.getElementById("progressScreen");if(!host)return;host.querySelectorAll(".progress-coming-card,button,a,section,article,div").forEach(el=>{const text=(el.textContent||"").replace(/\s+/g," ").trim().toLowerCase();if(text.includes("more progress tracking is coming")||text.includes("more progression coming"))el.remove()})}
  function loadScript(id,src){if(document.getElementById(id))return;const s=document.createElement("script");s.id=id;s.src=src;s.async=false;document.head.appendChild(s)}
  function loadCSS(id,href){if(document.getElementById(id))return;const l=document.createElement("link");l.id=id;l.rel="stylesheet";l.href=href;(document.body||document.head).appendChild(l)}
  function boot(){
    removePlaceholder();
    loadCSS("shiftfit-brand-theme","./shiftfit-brand-theme.css?v=5");
    loadScript("shiftfit-home-polish-loader","./shiftfit-home-polish.js?v=2");
    loadScript("shiftfit-final-ui-loader","./shiftfit-final-ui.js?v=1");
    loadScript("shiftfit-profile-control-center-loader","./profile-control-center.js?v=1");
    loadScript("shiftfit-profile-plan-bridge-loader","./profile-plan-regeneration-bridge.js?v=5");
    loadScript("shiftfit-avatar-sync-loader","./shiftfit-avatar-sync.js?v=1");
    loadScript("shiftfit-notifications-loader","./shiftfit-notifications.js?v=1");
    loadScript("shiftfit-app-settings-loader","./shiftfit-app-settings.js?v=1");
    loadScript("shiftfit-settings-back-fix-loader","./shiftfit-settings-back-fix.js?v=1");
    loadScript("shiftfit-account-settings-loader","./shiftfit-account-settings.js?v=1");
    loadScript("shiftfit-data-privacy-loader","./shiftfit-data-privacy.js?v=1");
    loadScript("shiftfit-support-ai-loader","./shiftfit-support-ai.js?v=2");
    loadScript("shiftfit-gmail-support-loader","./shiftfit-gmail-support.js?v=1");
    loadScript("shiftfit-settings-compact-loader","./shiftfit-settings-compact.js?v=3");
    /* The older activity-module injector is intentionally not loaded: the approved home-polish owns the single Steps button. */
    setTimeout(removePlaceholder,500);setTimeout(removePlaceholder,1500);setTimeout(removePlaceholder,3000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitRemoveProgressPlaceholder=removePlaceholder;
})();
