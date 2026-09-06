/* ShiftFit Profile Plan Regeneration Bridge v2 */
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
  function openSignup(){
    var auth=window.shiftfitAuth;
    var modal=document.getElementById("shiftfit-settings-split-modal");
    if(auth&&typeof auth.openSignup==="function"){
      if(modal)modal.classList.add("open");
      auth.openSignup();
      return;
    }
    if(modal)modal.classList.add("open");
    var accountLink=document.createElement("button");
    accountLink.type="button";
    accountLink.setAttribute("data-page","account");
    accountLink.style.cssText="position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(accountLink);
    accountLink.click();
    setTimeout(function(){var signup=document.getElementById("shiftfit-show-signup");if(signup)signup.click();accountLink.remove();},150);
  }
  function installSignupEntry(){
    if(window.__shiftFitSignupEntryInstalled)return;
    window.__shiftFitSignupEntryInstalled=true;
    var style=document.createElement("style");
    style.id="shiftfit-signup-entry-style";
    style.textContent=".home-header{position:relative}.home-header .logo{position:absolute;left:50%;transform:translateX(-50%) skew(-5deg);white-space:nowrap}.home-header .signup-entry{width:auto;min-width:76px;height:38px;padding:0 12px;border:1px solid rgba(139,92,246,.75);border-radius:12px;background:rgba(36,22,78,.72);color:#f5f3ff;font-size:10px;font-weight:950;letter-spacing:.6px;box-shadow:0 0 14px rgba(109,40,217,.22);display:flex;align-items:center;justify-content:center}.home-header .signup-entry:active{transform:scale(.97)}";
    document.head.appendChild(style);
    function apply(){
      var header=document.querySelector(".home-header");
      if(!header)return;
      var menu=header.querySelector(".menu-btn");
      if(menu){
        menu.className="signup-entry";
        menu.removeAttribute("aria-label");
        menu.innerHTML="<span>SIGN UP</span>";
        menu.type="button";
        if(menu.dataset.shiftfitSignupBound!=="1"){
          menu.dataset.shiftfitSignupBound="1";
          menu.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();openSignup();});
        }
        return;
      }
      var existing=header.querySelector(".signup-entry");
      if(existing&&existing.dataset.shiftfitSignupBound!=="1"){
        existing.dataset.shiftfitSignupBound="1";
        existing.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();openSignup();});
      }
    }
    apply();
    if(!window.__shiftFitSignupObserver){
      window.__shiftFitSignupObserver=new MutationObserver(function(){apply();});
      window.__shiftFitSignupObserver.observe(document.body,{childList:true,subtree:true});
    }
  }
  function loadTheme(){if(document.getElementById("shiftfit-theme-loader"))return;var s=document.createElement("script");s.id="shiftfit-theme-loader";s.src="./shiftfit-theme.js?v=6";s.async=false;document.head.appendChild(s);}
  function loadAuth(){if(document.getElementById("shiftfit-auth-loader"))return;var s=document.createElement("script");s.id="shiftfit-auth-loader";s.src="./shiftfit-auth.js?v=3";s.async=false;document.head.appendChild(s);}
  function loadCloudSync(){if(document.getElementById("shiftfit-cloud-sync-loader"))return;var s=document.createElement("script");s.id="shiftfit-cloud-sync-loader";s.src="./shiftfit-cloud-sync.js?v=1";s.async=false;document.head.appendChild(s);}
  function boot(){installBridge();installAccountBackFix();installSignupEntry();loadTheme();loadAuth();loadCloudSync();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
