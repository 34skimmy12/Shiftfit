/* ShiftFit screenshot cleanup v1 — structural correction for the approved dashboard. */
(function(){
  "use strict";
  if(window.__shiftfitScreenshotCleanup)return;
  window.__shiftfitScreenshotCleanup=true;

  function home(){return document.querySelector("#homeScreen")||document.querySelector(".screen.active")||document.body}
  function text(el){return (el?.textContent||"").replace(/\s+/g," ").trim().toLowerCase()}

  function removeLegacyTracker(){
    const h=home();
    // The old home tracker contains ADD FOOD / ADD WATER and must not sit above the new screenshot-matched tracker.
    const hits=[...h.querySelectorAll("button,a,div,section,article")].filter(el=>{
      const t=text(el);
      return t.includes("add food") || t.includes("add water");
    });
    hits.forEach(el=>{
      let p=el;
      for(let i=0;i<5 && p && p.parentElement;i++){
        const pt=text(p);
        if(pt.includes("add food") && pt.includes("add water")){
          if(!p.id?.startsWith("sf-") && !p.classList.contains("sf-home-action")) p.remove();
          break;
        }
        p=p.parentElement;
      }
    });
  }

  function moveEnhancements(){
    const h=home(), wrap=h.querySelector("#sf-home-enhancements"), plan=h.querySelector(".today-plan");
    if(!wrap||!plan)return;
    // Put the new tracker AFTER the complete Today's Plan card, never inside it.
    if(wrap.parentElement===plan || plan.contains(wrap)){
      const parent=plan.parentElement;
      if(parent)parent.insertBefore(wrap,plan.nextSibling);
    }
  }

  function removeDuplicateEnhancements(){
    const all=[...home().querySelectorAll("#sf-home-enhancements")];
    all.slice(1).forEach(x=>x.remove());
  }

  function polishTarget(){
    const h=home();
    const signup=h.querySelector(".signup");
    if(signup){signup.style.borderColor="#00d9ff";signup.style.color="#00d9ff";signup.style.background="transparent";}
    const badge=h.querySelector(".shift-badge");
    if(badge)badge.textContent="REST DAY";
    const shift=h.querySelector(".shift-time-row");
    if(shift && !text(shift).includes("no work shift"))shift.textContent="▣  No work shift";
  }

  function run(){removeDuplicateEnhancements();moveEnhancements();removeLegacyTracker();polishTarget()}
  function boot(){run();setTimeout(run,250);setTimeout(run,700);setTimeout(run,1500);setTimeout(run,3000)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
