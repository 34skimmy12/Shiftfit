/* ShiftFit Profile Data v4 — reads the real ShiftFit storage and activity history. */
(function(){
  "use strict";

  const LEGACY={
    profile:"shiftfitProfile",
    plan:"shiftfitPlan",
    weights:"shiftfitWeightHistory",
    daily:"shiftfitDailyProgressHistory",
    streak:"shiftfitDailyStreakDates",
    tracker:"shiftfitTodayTracker"
  };

  function raw(key,fallback){try{const r=localStorage.getItem(key);return r?JSON.parse(r):fallback;}catch(_){return fallback;}}
  function load(name,fallback){
    try{
      if(window.shiftfitStorage&&typeof window.shiftfitStorage.load==="function"){
        const v=window.shiftfitStorage.load(name,undefined);
        if(v!==undefined&&v!==null)return v;
      }
    }catch(_){}
    return raw(LEGACY[name],fallback);
  }
  function num(v){const n=Number(v);return Number.isFinite(n)?n:null;}
  function first(o,keys){for(const k of keys){if(o&&o[k]!==undefined&&o[k]!==null&&o[k]!=="")return o[k];}return "";}

  function values(){
    const p=load("profile",{})||{};
    const plan=load("plan",{})||{};
    const wh=load("weights",[]);
    const dh=raw(LEGACY.daily,{})||{};
    const streakDates=raw(LEGACY.streak,[])||[];
    const tracker=raw(LEGACY.tracker,null);

    const weights=Array.isArray(wh)?wh:[];
    const daily=(dh&&typeof dh==="object"&&!Array.isArray(dh))?dh:{};

    const name=first(p,["name","fullName","firstName"])||first(plan,["name","fullName","firstName"])||"ShiftFit Member";
    const goal=String(first(p,["goal","fitnessGoal","targetGoal"])||first(plan,["goal","fitnessGoal","targetGoal"])||"").toLowerCase();
    const goalText={lose:"Lose weight",weight_loss:"Lose weight",loss:"Lose weight",maintain:"Maintain weight",maintenance:"Maintain weight",build:"Build muscle",muscle:"Build muscle",gain:"Build muscle"}[goal]||goal||"Your personalised plan";
    const cal=num(first(plan,["calories","targetCalories","dailyCalories","calorieTarget"]));
    const protein=num(first(plan,["protein","targetProtein","proteinTarget","proteinGrams"]));
    const shift=first(p,["shift","shiftType","schedule","workPattern"])||first(plan,["shift","shiftType","schedule","workPattern"])||"Set your shift pattern";

    const validWeights=weights.filter(x=>x&&num(x.weight)!==null).sort((a,b)=>String(a.date||"").localeCompare(String(b.date||"")));
    const current=num(first(p,["weight","currentWeight"])) ?? num(first(plan,["weight","currentWeight"])) ?? (validWeights.length?num(validWeights[validWeights.length-1].weight):null);
    const start=validWeights.length?num(validWeights[0].weight):current;
    const latest=validWeights.length?num(validWeights[validWeights.length-1].weight):current;
    const change=start!==null&&latest!==null?latest-start:null;

    const entries=Object.values(daily).filter(x=>x&&typeof x==="object");
    let workouts=0,mealsLogged=0;
    entries.forEach(x=>{
      if(x.workout===true||x.workout===1||Number(x.exercisesDone)>0) workouts++;
      if(Number(x.workouts)>0) workouts+=Math.max(0,Number(x.workouts)-((x.workout===true||x.workout===1)?1:0));
      if(Number(x.mealsLogged)>0) mealsLogged+=Math.max(0,Number(x.mealsLogged));
    });

    // The current tracker is the authoritative meal log for today.
    if(tracker&&typeof tracker==="object"&&Array.isArray(tracker.foods)){
      const today= new Date().toISOString().slice(0,10);
      if(tracker.date===today) mealsLogged=Math.max(mealsLogged,tracker.foods.length);
    }

    // Daily history may not yet have an explicit workout count, so fall back to
    // completed workout days recorded by the existing streak/activity layer only
    // when the daily history itself has no workout information at all.
    if(!entries.some(x=>x&&((x.workout===true||x.workout===1)||Number(x.exercisesDone)>0||Number(x.workouts)>0))){
      workouts=0;
    }

    let streak=0;
    const dates=new Set(Array.isArray(streakDates)?streakDates.map(String):[]);
    const cursor=new Date();
    const todayKey=cursor.getFullYear()+"-"+String(cursor.getMonth()+1).padStart(2,"0")+"-"+String(cursor.getDate()).padStart(2,"0");
    if(!dates.has(todayKey)) cursor.setDate(cursor.getDate()-1);
    while(true){
      const key=cursor.getFullYear()+"-"+String(cursor.getMonth()+1).padStart(2,"0")+"-"+String(cursor.getDate()).padStart(2,"0");
      if(!dates.has(key))break;
      streak++;
      cursor.setDate(cursor.getDate()-1);
    }

    return {name,goalText,cal,protein,shift,current,change,workouts,mealsLogged,streak};
  }

  function render(){
    const m=document.getElementById("shiftfit-profile-entry-modal");if(!m)return;
    const v=values();
    const nameEl=m.querySelector(".profile-name");if(nameEl)nameEl.textContent=v.name;
    const sub=m.querySelector(".profile-sub");if(sub)sub.textContent=`Level 1 · ${v.goalText}`;
    const stats=m.querySelectorAll(".profile-stat strong");
    if(stats[0])stats[0].textContent=String(v.streak);
    if(stats[1])stats[1].textContent=String(v.workouts);
    if(stats[2])stats[2].textContent=String(v.mealsLogged);
    if(stats[3])stats[3].textContent=v.change===null?"—":`${v.change>0?"+":""}${v.change.toFixed(1)} kg`;
    m.querySelectorAll(".profile-list-btn").forEach(btn=>{
      const key=(btn.dataset.profileNav||"").toLowerCase(),copy=btn.querySelector(".profile-list-copy");if(!copy)return;
      if(key==="shift schedule")copy.textContent=v.shift;
      if(key==="goal & nutrition")copy.textContent=`${v.goalText}${v.cal!==null?` · ${v.cal} kcal/day`:""}${v.protein!==null?` · ${v.protein}g protein`:""}`;
      if(key==="personal details")copy.textContent=v.current!==null?`Current weight ${v.current.toFixed(1)} kg`:"Add your personal details";
      if(key==="progression")copy.textContent=v.change===null?"Start logging weight to track change":"Track your weight, consistency and improvements";
      if(key==="history")copy.textContent=v.workouts||v.mealsLogged?`${v.workouts} workouts · ${v.mealsLogged} meals logged`:"Your logs and check-ins will appear here";
    });
  }

  window.shiftfitRenderProfileData=render;
  window.addEventListener("storage",render);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){render();setTimeout(render,500);setTimeout(render,1500);},{once:true});else{render();setTimeout(render,500);setTimeout(render,1500);}
})();