/* ShiftFit Smart Meal Engine v4
 * Target-aware 7-day generation with hard avoid rules, preference weighting,
 * goal-aware macro priorities, diversity, shift-aware meal timing guidance,
 * and target-aware smart swap helpers.
 */
(function(){
  "use strict";

  const TYPES=["breakfast","lunch","dinner","snack"];
  const GOALS={lose:["lose","weight loss","fat loss"],maintain:["maintain","maintenance"],build:["build","muscle","gain"]};

  function num(value,fallback){const n=Number(value);return Number.isFinite(n)?n:(fallback||0);}
  function nutrition(type,index){
    if(typeof getSelectedMealNutrition==="function") return getSelectedMealNutrition(type,index)||{};
    if(typeof mealNutritionProfiles!=="undefined" && mealNutritionProfiles[type]?.[index]) return mealNutritionProfiles[type][index];
    return {};
  }
  function prefs(type){if(typeof mealPreferences!=="undefined" && mealPreferences[type]) return mealPreferences[type];return {like:[],avoid:[]};}
  function optionCount(type){if(typeof mealOptions!=="undefined" && Array.isArray(mealOptions[type])) return mealOptions[type].length;return 0;}
  function optionText(type,index){
    try{
      if(typeof mealOptions!=="undefined" && Array.isArray(mealOptions[type])){
        const item=mealOptions[type][index];
        if(typeof item==="string") return item;
        if(item&&typeof item==="object") return [item.name,item.title,item.meal,item.label,item.description].filter(Boolean).join(" ");
      }
    }catch(_){ }
    return "";
  }
  function planTerms(plan,key){
    const value=plan&&plan[key];
    if(Array.isArray(value)) return value.map(x=>String(x).trim().toLowerCase()).filter(Boolean);
    return String(value||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
  }
  function matchesTerm(text,terms){
    const hay=String(text||"").toLowerCase();
    return terms.some(term=>term && hay.includes(term));
  }
  function isAvoided(type,index,plan){
    const p=prefs(type);
    if(Array.isArray(p.avoid)&&p.avoid.includes(index)) return true;
    return matchesTerm(optionText(type,index),planTerms(plan,"foodAvoid"));
  }
  function preferenceWeight(type,index,plan){
    if(isAvoided(type,index,plan)) return 0;
    const p=prefs(type);
    if(Array.isArray(p.like)&&p.like.includes(index)) return 2.5;
    return matchesTerm(optionText(type,index),planTerms(plan,"foodLikes"))?3.2:1;
  }
  function normaliseGoal(plan){
    const raw=String((plan&&plan.goal)||((typeof selectedGoal!=="undefined")?selectedGoal:"")||"").toLowerCase();
    if(GOALS.build.some(x=>raw.includes(x))) return "build";
    if(GOALS.lose.some(x=>raw.includes(x))) return "lose";
    return "maintain";
  }
  function shiftName(plan){
    let value="";
    try{if(plan&&plan.shiftPattern) value=plan.shiftPattern;else if(typeof selectedShift!=="undefined") value=selectedShift;}catch(_){ }
    if(!value){try{value=localStorage.getItem("shiftfitSelectedShift")||localStorage.getItem("selectedShift")||"";}catch(_){ }}
    return String(value||"").toLowerCase();
  }
  function timingProfile(plan){
    const shift=shiftName(plan);
    if(shift.includes("night")) return {breakfast:0.7,lunch:1,dinner:1.05,snack:1.2,label:"Night shift"};
    if(shift.includes("late")||shift.includes("evening")) return {breakfast:0.8,lunch:1,dinner:1.08,snack:1.12,label:"Late shift"};
    if(shift.includes("early")) return {breakfast:1.18,lunch:1.05,dinner:0.92,snack:0.92,label:"Early shift"};
    return {breakfast:1,lunch:1,dinner:1,snack:1,label:"Standard shift"};
  }
  function goalWeights(goal){
    if(goal==="build") return {calories:6,protein:11,carbs:2,fats:1.5};
    if(goal==="lose") return {calories:10,protein:10,carbs:1.5,fats:1.2};
    return {calories:8,protein:9,carbs:2,fats:2};
  }
  function totalsFor(day){
    const totals={calories:0,protein:0,carbs:0,fats:0};
    TYPES.forEach(type=>{const n=nutrition(type,day[type]);totals.calories+=num(n.calories);totals.protein+=num(n.protein);totals.carbs+=num(n.carbs);totals.fats+=num(n.fats);});
    return totals;
  }
  function scoreCandidate(day,plan,previousDays,usage,goal,timing){
    const totals=totalsFor(day),tc=Math.max(1,num(plan.calories)),tp=Math.max(1,num(plan.protein)),tcarb=Math.max(1,num(plan.carbs)),tfat=Math.max(1,num(plan.fats)),w=goalWeights(goal);
    let score=Math.abs(totals.calories-tc)/tc*w.calories+Math.abs(totals.protein-tp)/tp*w.protein+Math.abs(totals.carbs-tcarb)/tcarb*w.carbs+Math.abs(totals.fats-tfat)/tfat*w.fats;
    previousDays.forEach(previous=>TYPES.forEach(type=>{if(Number(previous[type])===Number(day[type])) score+=0.65;}));
    TYPES.forEach(type=>{
      const idx=day[type],pref=preferenceWeight(type,idx,plan);
      if(pref===0) score+=1000;
      score+=num(usage[type+":"+idx],0)*0.28;
      score-=Math.log(Math.max(1,pref))*0.55;
      const n=nutrition(type,idx),calories=num(n.calories),protein=num(n.protein);
      if(timing[type]>1&&calories>0) score-=Math.min(0.5,(protein/Math.max(1,calories))*timing[type]*0.18);
    });
    score+=Math.random()*0.06;
    return score;
  }
  function candidates(type,plan){
    const count=optionCount(type);if(!count)return[0];
    const result=[];for(let i=0;i<count;i++)if(!isAvoided(type,i,plan))result.push(i);
    if(!result.length)for(let i=0;i<count;i++)result.push(i);
    result.sort((a,b)=>{const delta=preferenceWeight(type,b,plan)-preferenceWeight(type,a,plan);return delta||Math.random()-.5;});
    return result;
  }
  function randomInt(max){return Math.floor(Math.random()*Math.max(1,max));}
  function buildWeek(plan){
    const week=[],usage={},goal=normaliseGoal(plan),timing=timingProfile(plan);
    for(let dayIndex=0;dayIndex<7;dayIndex++){
      let best=null,bestScore=Infinity;
      for(let attempt=0;attempt<360;attempt++){
        const candidate={};
        TYPES.forEach(type=>{const choices=candidates(type,plan),pool=choices.slice(0,Math.min(10,choices.length));candidate[type]=pool[randomInt(pool.length)];});
        const score=scoreCandidate(candidate,plan,week,usage,goal,timing);
        if(score<bestScore){bestScore=score;best={...candidate};}
      }
      best=best||{breakfast:0,lunch:0,dinner:0,snack:0};week.push(best);
      TYPES.forEach(type=>{const key=type+":"+best[type];usage[key]=(usage[key]||0)+1;});
    }
    return week;
  }
  function persist(week){
    weeklyMeals=week.map(day=>({breakfast:Number(day.breakfast)||0,lunch:Number(day.lunch)||0,dinner:Number(day.dinner)||0,snack:Number(day.snack)||0}));
    if(typeof saveWeeklyMeals==="function")saveWeeklyMeals();
  }
  window.shiftfitGenerateTargetAwareMealPlan=function(plan){
    if(!plan||typeof mealOptions==="undefined"||!Array.isArray(mealOptions.breakfast))return;
    const generated=buildWeek(plan);if(generated.length===7)persist(generated);
  };
  window.generateWeeklyMealPlan=function(plan){window.shiftfitGenerateTargetAwareMealPlan(plan);};
  window.shiftfitGetSmartMealCandidates=function(type,currentIndex,plan,usedIndexes){
    const choices=candidates(type,plan).filter(i=>Number(i)!==Number(currentIndex)),used=Array.isArray(usedIndexes)?usedIndexes.map(Number):[];
    return choices.sort((a,b)=>{
      const score=index=>{const n=nutrition(type,index);let s=0,target=num(plan&&plan.calories),ptarget=num(plan&&plan.protein),calories=num(n.calories),protein=num(n.protein);if(target)s+=Math.abs(calories-target/4)/(target/4)*2;if(ptarget)s+=Math.abs(protein-ptarget/4)/(ptarget/4)*3;if(used.includes(index))s+=2;s-=Math.log(Math.max(1,preferenceWeight(type,index,plan)))*0.6;return s;};
      return score(a)-score(b);
    });
  };
  window.SHIFTFIT_MEAL_ENGINE_VERSION="v4-smart-constraints";
  window.SHIFTFIT_MEAL_TIMING_PROFILE=timingProfile();
})();
