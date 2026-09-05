/* ShiftFit Profile Navigation v1 — route each Profile tab to its actual destination. */
(function(){
  "use strict";

  const MODAL="#shiftfit-profile-entry-modal";

  function closeProfile(){
    const m=document.querySelector(MODAL);
    if(m)m.classList.remove("open");
  }

  function goSetup(target){
    if(typeof window.showPlanBuilder!=="function")return;
    window.showPlanBuilder();
    if(typeof window.setNav==="function")window.setNav("");

    const selectors={
      shift:[".shift-engine-card"],
      goal:[".goal-grid","#goalBadge"],
      personal:["#userAge"]
    };
    const list=selectors[target]||[];

    function locate(){
      for(const selector of list){
        const el=document.querySelector(selector);
        if(el){
          el.scrollIntoView({behavior:"smooth",block:"start"});
          if(target==="personal"&&typeof el.focus==="function"){
            try{el.focus({preventScroll:true});}catch(_){}
          }
          return true;
        }
      }
      return false;
    }

    if(locate())return;
    [50,150,300,600].forEach(function(ms){setTimeout(locate,ms);});
  }

  function goHistory(){
    if(typeof window.hideAllScreens==="function")window.hideAllScreens();
    const setup=document.getElementById("setupScreen");
    if(setup)setup.classList.add("active");
    if(typeof window.setNav==="function")window.setNav("");
    if(typeof window.showMyHistory==="function")window.showMyHistory();
  }

  function goProgression(){
    if(typeof window.showProgressInsights==="function")window.showProgressInsights();
  }

  function handle(label){
    const key=String(label||"").trim().toLowerCase();
    closeProfile();
    if(key==="history")return goHistory();
    if(key==="progression")return goProgression();
    if(key==="shift schedule")return goSetup("shift");
    if(key==="goal & nutrition")return goSetup("goal");
    if(key==="personal details")return goSetup("personal");
  }

  document.addEventListener("click",function(e){
    const btn=e.target&&e.target.closest?e.target.closest(MODAL+" [data-profile-nav]"):null;
    if(!btn)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    handle(btn.dataset.profileNav);
  },true);
})();
