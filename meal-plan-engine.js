/* ShiftFit target-aware meal-plan engine
 * Loaded after index.html so it replaces the old weekly generator without
 * disturbing the existing meal UI, swap flow, preferences or localStorage.
 */
(function(){
  "use strict";

  function safeNumber(value,fallback){
    const n=Number(value);
    return Number.isFinite(n)?n:(fallback||0);
  }

  function nutrition(type,index){
    if(typeof getSelectedMealNutrition==="function"){
      return getSelectedMealNutrition(type,index)||{};
    }
    return (window.mealNutritionProfiles?.[type]?.[index])||{};
  }

  function preferenceWeight(type,index){
    const prefs=window.mealPreferences?.[type]||{like:[],avoid:[]};
    if(Array.isArray(prefs.like)&&prefs.like.includes(index)) return 1.8;
    if(Array.isArray(prefs.avoid)&&prefs.avoid.includes(index)) return 0.12;
    return 1;
  }

  function scoreCandidate(day,plan,previousDays,usage){
    const types=["breakfast","lunch","dinner","snack"];
    const totals={calories:0,protein:0,carbs:0,fats:0};

    types.forEach(type=>{
      const n=nutrition(type,day[type]);
      totals.calories+=safeNumber(n.calories);
      totals.protein+=safeNumber(n.protein);
      totals.carbs+=safeNumber(n.carbs);
      totals.fats+=safeNumber(n.fats);
    });

    const tc=Math.max(1,safeNumber(plan.calories));
    const tp=Math.max(1,safeNumber(plan.protein));
    const tcarb=Math.max(1,safeNumber(plan.carbs));
    const tfat=Math.max(1,safeNumber(plan.fats));

    /* Calories + protein dominate because they are the primary goal signals. */
    let score=
      Math.abs(totals.calories-tc)/tc*7+
      Math.abs(totals.protein-tp)/tp*8+
      Math.abs(totals.carbs-tcarb)/tcarb*1.5+
      Math.abs(totals.fats-tfat)/tfat*1.5;

    /* Penalise repeating the same meal on nearby days. */
    previousDays.forEach(previous=>{
      types.forEach(type=>{
        if(Number(previous[type])===Number(day[type])) score+=0.45;
      });
    });

    /* Spread choices across the week where possible. */
    types.forEach(type=>{
      const key=type+":"+day[type];
      score+=safeNumber(usage[key],0)*0.16;
      score-=Math.log(Math.max(1,preferenceWeight(type,day[type])))*0.35;
    });

    /* Small random tie-breaker prevents every regeneration being identical. */
    score+=Math.random()*0.08;
    return score;
  }

  function randomInt(max){
    return Math.floor(Math.random()*Math.max(1,max));
  }

  function candidateIndexes(type){
    const count=Array.isArray(window.mealOptions?.[type])?window.mealOptions[type].length:0;
    if(!count) return [0];

    const result=[];
    for(let i=0;i<count;i++) result.push(i);

    /* Shuffle, then sort loosely by preference so liked meals are more likely
       to appear while avoided meals remain possible if the database is small. */
    result.sort((a,b)=>{
      const delta=preferenceWeight(type,b)-preferenceWeight(type,a);
      return delta || Math.random()-.5;
    });

    return result;
  }

  function buildTargetAwareWeek(plan){
    const types=["breakfast","lunch","dinner","snack"];
    const week=[];
    const usage={};

    for(let dayIndex=0;dayIndex<7;dayIndex++){
      let best=null;
      let bestScore=Infinity;

      /* Each day is optimised independently against the real personalised
         target, while previous days influence variety. */
      for(let attempt=0;attempt<260;attempt++){
        const candidate={};

        types.forEach(type=>{
          const choices=candidateIndexes(type);
          const preferredPool=choices.slice(0,Math.min(7,choices.length));
          const pool=preferredPool.length?preferredPool:choices;
          candidate[type]=pool[randomInt(pool.length)];
        });

        /* Avoid a day where all four meal types accidentally share the same
           database position. */
        if(new Set(types.map(type=>candidate[type])).size<3){
          const type=types[randomInt(types.length)];
          const choices=candidateIndexes(type);
          if(choices.length>1) candidate[type]=choices[(choices.indexOf(candidate[type])+1)%choices.length];
        }

        const score=scoreCandidate(candidate,plan,week,usage);
        if(score<bestScore){
          bestScore=score;
          best={...candidate};
        }
      }

      best=best||{breakfast:0,lunch:0,dinner:0,snack:0};
      week.push(best);
      types.forEach(type=>{
        const key=type+":"+best[type];
        usage[key]=(usage[key]||0)+1;
      });
    }

    return week;
  }

  window.shiftfitGenerateTargetAwareMealPlan=function(plan){
    if(!plan || !Array.isArray(window.mealOptions?.breakfast)) return;

    const generated=buildTargetAwareWeek(plan);
    if(!Array.isArray(generated)||generated.length!==7) return;

    window.weeklyMeals=generated.map(day=>({
      breakfast:Number(day.breakfast)||0,
      lunch:Number(day.lunch)||0,
      dinner:Number(day.dinner)||0,
      snack:Number(day.snack)||0
    }));

    if(typeof saveWeeklyMeals==="function") saveWeeklyMeals();
  };

  /* Replace the existing generator used by SAVE & GENERATE MY PLAN and the AI Coach. */
  window.generateWeeklyMealPlan=function(plan){
    window.shiftfitGenerateTargetAwareMealPlan(plan);
  };

  /* Also expose a clear version marker for diagnostics. */
  window.SHIFTFIT_MEAL_ENGINE_VERSION="v2-target-aware";
})();
