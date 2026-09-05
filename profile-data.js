/* ShiftFit Profile Data v3 — reads the real ShiftFit storage and refreshes Profile on open. */
(function(){
  "use strict";
  const KEYS={profile:"profile",plan:"plan",weights:"weightHistory",daily:"progressHistory"};
  const LEGACY={profile:"shiftfitProfile",plan:"shiftfitPlan",weights:"shiftfitWeightHistory",daily:"shiftfitProgressDailyHistory"};

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
  function dateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}

  function values(){
    const p=load(KEYS.profile,{})||{};
    const plan=load(KEYS.plan,{})||{};
    const wh=load(KEYS.weights,[]);
    const dh=load(KEYS.daily,{})||{};
    const weights=Array.isArray(wh)?wh:[];
    const daily=Array.isArray(dh)?dh.reduce((a,x)=>{if(x&&x.date)a[String(x.date)]=x;return a;},{}):dh;

    const name=first(p,["name","fullName","firstName"])||first(plan,["name","fullName","firstName"])||"ShiftFit Member";
    const goal=String(first(p,["goal","fitnessGoal","targetGoal"])||first(plan,["goal","fitnessGoal","targetGoal"])||"").toLowerCase();
    const goalText={lose:"Lose weight",weight_loss:"Lose weight",loss:"Lose weight",maintain:"Maintain weight",maintenance:"Maintain weight",build:"Build muscle",muscle:"Build muscle",gain:"Build muscle"}[goal]||goal||"Your personalised plan";
    const cal=num(first(plan,["calories","targetCalories","dailyCalories","calorieTarget"]));
    const protein=num(first(plan,["protein","targetProtein","proteinTarget","proteinGrams"]));
    const shift=first(p,["shift","shiftType","schedule","workPattern"])||first(plan,["shift","shiftType","schedule","workPattern"])||"Set your shift pattern";

    const validWeights=weights.filter(x=>x&&num(x.weight)!==null).sort((a,b)=>String(a.date||"").localeCompare(String(b.date||"")));
    const current=num(first(p,["weight","currentWeight"]))||num(first(plan,["weight","currentWeight"]))||(validWeights.length?num(validWeights[validWeights.length-1].weight):null);
    const start=validWeights.length?num(validWeights[0].weight):current;
    const latest=validWeights.length?num(validWeights[validWeights.length-1].weight):current;
    const change=start!==null&&latest!==null?latest-start:null;

    const entries=Object.values(daily).filter(x=>x&&typeof x==="object");
    let workouts=0,mealsLogged=0;
    entries.forEach(x=>{
      if(x.workout===true||x.workout===1) workouts++;
      else if(Number(x.workouts)>0) workouts+=Number(x.workouts);
      mealsLogged+=Math.max(0,Number(x.mealsLogged||0));
    });

    let streak=0;
    const today=new Date();
    for(let i=0;i<365;i++){
      const d=new Date(today);d.setHours(12,0,0,0);d.setDate(today.getDate()-i);
      const x=daily[dateKey(d)];
      if(x&&(Number(x.calories)>0||Number(x.protein)>0||Number(x.water)>0||x.workout===true||x.workout===1||Number(x.workouts)>0||Number(x.mealsLogged)>0||x.weight!==null&&x.weight!==undefined))streak++;else break;
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