/* ShiftFit Profile Data v2 — hydrates Profile from the app's existing local data. */
(function(){
  "use strict";
  const PROFILE_KEY="shiftfitProfile", PLAN_KEY="shiftfitPlan", WEIGHT_KEY="shiftfitWeightHistory", DAILY_KEY="shiftfitProgressDailyHistory", MEALS_KEY="weeklyMeals";
  function json(k,f){try{const r=localStorage.getItem(k);return r?JSON.parse(r):f;}catch(_){return f;}}
  function num(v){const n=Number(v);return Number.isFinite(n)?n:null;}
  function first(o,keys){for(const k of keys){if(o&&o[k]!==undefined&&o[k]!==null&&o[k]!=="")return o[k];}return "";}
  function data(){
    const dailyRaw=json(DAILY_KEY,{});
    const daily=Array.isArray(dailyRaw)?dailyRaw.reduce((a,x)=>{if(x&&x.date)a[String(x.date)]=x;return a;},{}):(dailyRaw&&typeof dailyRaw==="object"?dailyRaw:{});
    const mealsRaw=json(MEALS_KEY,[]);
    return {p:json(PROFILE_KEY,{})||{},plan:json(PLAN_KEY,{})||{},weights:Array.isArray(json(WEIGHT_KEY,[]))?json(WEIGHT_KEY,[]):[],daily,meals:mealsRaw};
  }
  function goalLabel(goal){return {lose:"Lose weight",weight_loss:"Lose weight",loss:"Lose weight",maintain:"Maintain weight",maintenance:"Maintain weight",build:"Build muscle",muscle:"Build muscle",gain:"Build muscle"}[String(goal||"").trim().toLowerCase()]||goal||"Your personalised plan";}
  function dateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
  function values(){
    const {p,plan,weights,daily,meals}=data();
    const name=first(p,["name","fullName","firstName"])||first(plan,["name","firstName"])||"ShiftFit Member";
    const goal=first(p,["goal","fitnessGoal","targetGoal"])||first(plan,["goal","fitnessGoal","targetGoal"]);
    const goalText=goalLabel(goal);
    const cal=num(first(plan,["calories","targetCalories","dailyCalories","calorieTarget"]));
    const protein=num(first(plan,["protein","targetProtein","proteinTarget","proteinGrams"]));
    const shift=first(p,["shift","shiftType","schedule","workPattern"])||first(plan,["shift","shiftType","schedule","workPattern"])||"Set your shift pattern";
    const currentRaw=first(p,["weight","currentWeight"])||first(plan,["weight","currentWeight"]);
    const current=num(currentRaw);
    const sorted=weights.filter(x=>x&&num(x.weight)!==null).sort((a,b)=>String(a.date||"").localeCompare(String(b.date||"")));
    const start=sorted.length?num(sorted[0].weight):current;
    const latest=sorted.length?num(sorted[sorted.length-1].weight):current;
    const change=start!==null&&latest!==null?latest-start:null;
    const entries=Object.values(daily).filter(x=>x&&typeof x==="object");
    const workouts=entries.reduce((n,x)=>n+(x.workout===true||x.workout===1||Number(x.workouts)>0?Number(x.workouts)>0?Number(x.workouts):1:0),0);
    const mealsLogged=entries.reduce((n,x)=>n+Math.max(0,Number(x.mealsLogged||x.meals||0)),0);
    let fallbackMeals=0;
    if(!mealsLogged&&Array.isArray(meals))fallbackMeals=meals.reduce((n,day)=>n+(day&&Array.isArray(day.meals)?day.meals.filter(Boolean).length:0),0);
    let streak=0;
    const today=new Date();
    for(let i=0;i<365;i++){
      const d=new Date(today);d.setHours(0,0,0,0);d.setDate(today.getDate()-i);
      const x=daily[dateKey(d)];
      if(x&&(Number(x.calories)>0||Number(x.protein)>0||Number(x.water)>0||x.workout||Number(x.workouts)>0||Number(x.mealsLogged)>0||Number(x.meals)>0||x.weight!==null&&x.weight!==undefined)){streak++;}else break;
    }
    return {name,goalText,cal,protein,shift,current,change,workouts,mealsLogged:mealsLogged||fallbackMeals,streak};
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
    const rows=m.querySelectorAll(".profile-list-btn");
    rows.forEach(btn=>{
      const key=(btn.dataset.profileNav||"").toLowerCase();
      const copy=btn.querySelector(".profile-list-copy");if(!copy)return;
      if(key==="shift schedule")copy.textContent=v.shift;
      if(key==="goal & nutrition")copy.textContent=`${v.goalText}${v.cal!==null?` · ${v.cal} kcal/day`:""}${v.protein!==null?` · ${v.protein}g protein`:""}`;
      if(key==="personal details")copy.textContent=v.current!==null?`Current weight ${v.current.toFixed(1)} kg`:`Add your personal details`;
      if(key==="progression")copy.textContent=v.change===null?"Start logging weight to track change":"Track your weight, consistency and improvements";
      if(key==="history")copy.textContent=v.workouts||v.mealsLogged?`${v.workouts} workouts · ${v.mealsLogged} meals logged`:"Your logs and check-ins will appear here";
    });
  }
  function boot(){render();[300,800,1600,3000].forEach(t=>setTimeout(render,t));}
  window.shiftfitRenderProfileData=render;
  window.addEventListener("storage",render);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
