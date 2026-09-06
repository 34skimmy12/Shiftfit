/* ShiftFit Profile Plan Regeneration Bridge v3.1 — no legacy signup interception */
(function(){
  "use strict";
  function readPlan(){try{const raw=localStorage.getItem("shiftfitPlan");return raw?JSON.parse(raw):null;}catch(_){return null;}}
  function savePlan(plan){try{localStorage.setItem("shiftfitPlan",JSON.stringify(plan));if(window.shiftfitStorage&&typeof window.shiftfitStorage.save==="function")window.shiftfitStorage.save("plan",plan);}catch(_){} }
  function regenerateFromSavedTargets(){
    const plan=readPlan();
    if(!plan||typeof plan!=="object"){if(typeof window.showPlanBuilder==="function")window.showPlanBuilder();return;}
    const fats=Number(plan.fats??plan.fat??plan.targetFats??plan.targetFat);
    if(Number.isFinite(fats)&&fats>0){plan.fats=fats;plan.fat=fats;plan.targetFats=fats;plan.targetFat=fats;}
    ["calories","protein","carbs"].forEach(function(key){const value=Number(plan[key]??plan["target"+key.charAt(0).toUpperCase()+key.slice(1)]);if(Number.isFinite(value)&&value>0)plan[key]=value;});
    savePlan(plan);
    try{
      if(typeof window.generateWeeklyMealPlan==="function")window.generateWeeklyMealPlan(plan);
      if(typeof window.updatePlan==="function")window.updatePlan(plan);
      if(typeof window.showPlanSuccess==="function")window.showPlanSuccess();
      if(typeof window.showMeals==="function")window.showMeals();
    }catch(error){console.warn("Profile plan regeneration failed.",error);if(typeof window.showPlanBuilder==="function")window.showPlanBuilder();}
  }
  function installBridge(){
    if(!document.body||document.getElementById("shiftfit-profile-plan-generate-bridge"))return;
    const button=document.createElement("button");
    button.id="shiftfit-profile-plan-generate-bridge";button.type="button";button.textContent="Save & Generate My Plan";
    button.style.cssText="position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    button.setAttribute("aria-hidden","true");
    button.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();regenerateFromSavedTargets();});
    document.body.insertBefore(button,document.body.firstChild);
  }
  function installAccountBackFix(){
    if(window.__shiftFitAccountBackFixInstalled)return;
    window.__shiftFitAccountBackFixInstalled=true;
    document.addEventListener("click",function(event){
      const button=event.target&&event.target.closest?event.target.closest("#shiftfit-settings-split-modal .sheet .back[data-shiftfit-account-back]"):null;
      if(!button)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const modal=document.getElementById("shiftfit-settings-split-modal");
      if(modal)modal.classList.remove("open");
    },true);
  }
  function loadTheme(){if(document.getElementById("shiftfit-theme-loader"))return;var s=document.createElement("script");s.id="shiftfit-theme-loader";s.src="./shiftfit-theme.js?v=6";s.async=false;document.head.appendChild(s);}
  function loadAuth(){if(document.getElementById("shiftfit-auth-loader"))return;var s=document.createElement("script");s.id="shiftfit-auth-loader";s.src="./shiftfit-auth.js?v=6";s.async=false;document.head.appendChild(s);}
  function loadCloudSync(){if(document.getElementById("shiftfit-cloud-sync-loader"))return;var s=document.createElement("script");s.id="shiftfit-cloud-sync-loader";s.src="./shiftfit-cloud-sync.js?v=2";s.async=false;document.head.appendChild(s);}
  function loadAccountSyncUi(){if(document.getElementById("shiftfit-account-sync-ui-loader"))return;var s=document.createElement("script");s.id="shiftfit-account-sync-ui-loader";s.src="./shiftfit-account-sync-ui.js?v=1";s.async=false;document.head.appendChild(s);}
  function boot(){installBridge();installAccountBackFix();loadTheme();loadAuth();loadCloudSync();loadAccountSyncUi();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
