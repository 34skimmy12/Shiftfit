/* ShiftFit Weight Baseline v1
 * Seeds the user's first profile weight as the genuine starting point for Progress.
 * Never overwrites an existing weigh-in history.
 */
(function(){
  "use strict";

  const HISTORY_KEY="shiftfitWeightHistory";
  const PROFILE_KEY="shiftfitProfile";
  const PLAN_KEY="shiftfitPlan";
  const SEEDED_KEY="shiftfitWeightBaselineSeeded";

  function json(key,fallback){
    try{
      const raw=localStorage.getItem(key);
      return raw?JSON.parse(raw):fallback;
    }catch(_){return fallback;}
  }

  function dateKey(date=new Date()){
    const d=new Date(date); d.setHours(12,0,0,0);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  function profileWeight(){
    const profile=json(PROFILE_KEY,null);
    const plan=json(PLAN_KEY,null);
    const candidates=[
      profile&&profile.weight,
      plan&&plan.weight,
      plan&&plan.currentWeight
    ];
    for(const value of candidates){
      const n=Number(value);
      if(Number.isFinite(n)&&n>=20&&n<=400) return Math.round(n*10)/10;
    }
    return null;
  }

  function seed(){
    let history=json(HISTORY_KEY,[]);
    if(!Array.isArray(history)) history=[];

    const valid=history.filter(x=>x&&x.date&&Number.isFinite(Number(x.weight))&&Number(x.weight)>=20&&Number(x.weight)<=400);
    if(valid.length){
      try{localStorage.setItem(SEEDED_KEY,"1");}catch(_){}
      return false;
    }

    const weight=profileWeight();
    if(weight===null) return false;

    history.push({
      date:dateKey(),
      weight,
      source:"profile-baseline",
      loggedAt:new Date().toISOString()
    });

    try{
      localStorage.setItem(HISTORY_KEY,JSON.stringify(history.slice(-90)));
      localStorage.setItem(SEEDED_KEY,"1");
    }catch(_){return false;}

    return true;
  }

  function refresh(){
    seed();
    try{
      if(typeof renderWeightProgress==="function") renderWeightProgress();
      if(typeof renderWeightTrend==="function") renderWeightTrend();
      if(typeof renderProgressHistory==="function") renderProgressHistory();
      if(typeof updateProgressInsights==="function") updateProgressInsights();
    }catch(_){}
  }

  window.shiftfitSeedWeightBaseline=seed;
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",refresh,{once:true});
  else refresh();
})();
