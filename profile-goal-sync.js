/* ShiftFit Goal & Nutrition v2 — keep Profile targets aligned with the real Plan Builder formula. */
(function(){
  "use strict";

  const EDITOR="shiftfit-profile-editor-modal";
  const RULES={
    lose:{calorieFactor:0.85,proteinPerKg:2.2,fatPerKg:0.8},
    maintain:{calorieFactor:1,proteinPerKg:2.0,fatPerKg:0.9},
    gain:{calorieFactor:1.10,proteinPerKg:2.0,fatPerKg:1.0}
  };

  function raw(key,fallback){
    try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch(_){return fallback;}
  }
  function num(v){const n=Number(v);return Number.isFinite(n)?n:null;}
  function field(key){return document.querySelector('#'+EDITOR+' [data-f="'+key+'"]');}
  function profile(){return raw("shiftfitProfile",{})||{};}
  function plan(){return raw("shiftfitPlan",{})||{};}

  function userValue(p,pl,keys,fallback){
    for(const k of keys){
      if(p&&p[k]!==undefined&&p[k]!==null&&p[k]!=="")return p[k];
      if(pl&&pl[k]!==undefined&&pl[k]!==null&&pl[k]!=="")return pl[k];
    }
    return fallback;
  }

  function calculate(goal){
    const p=profile(),pl=plan(),rule=RULES[goal]||RULES.maintain;
    const age=num(userValue(p,pl,["age"],null));
    const weight=num(userValue(p,pl,["weight","currentWeight"],null));
    const height=num(userValue(p,pl,["height","heightCm"],null));
    const sex=String(userValue(p,pl,["sex","gender"],"male")).toLowerCase();
    const activity=num(userValue(p,pl,["activity","activityLevel","activityMultiplier"],1.55))||1.55;
    if(age===null||weight===null||height===null||weight<=0||height<=0)return null;

    const bmr=sex==="female"
      ?(10*weight)+(6.25*height)-(5*age)-161
      :(10*weight)+(6.25*height)-(5*age)+5;
    const maintenance=Math.round(bmr*activity);
    const calories=Math.max(1200,Math.round(maintenance*rule.calorieFactor));
    const protein=Math.round(weight*rule.proteinPerKg);
    const fats=Math.round(weight*rule.fatPerKg);
    const carbs=Math.max(0,Math.round((calories-(protein*4)-(fats*9))/4));
    return {calories,protein,carbs,fats,maintenance,weight};
  }

  function set(el,value){
    if(!el)return;
    el.value=String(value);
    el.dispatchEvent(new Event("input",{bubbles:true}));
    el.dispatchEvent(new Event("change",{bubbles:true}));
  }

  function syncFromGoal(){
    const goalEl=field("goal");
    if(!goalEl)return;
    const result=calculate(String(goalEl.value||"maintain").toLowerCase());
    if(!result)return;
    set(field("calories"),result.calories);
    set(field("protein"),result.protein);
    set(field("carbs"),result.carbs);
    set(field("fat"),result.fats);

    const note=document.querySelector('#'+EDITOR+' .pcnote');
    if(note){
      note.textContent="Goal-based targets: calories use your age, sex, height, weight and activity level. Protein, carbs and fat are then calculated for the selected goal. You can fine-tune them before saving.";
    }
  }

  function syncMacrosFromCalories(){
    const goalEl=field("goal"),calEl=field("calories");
    if(!goalEl||!calEl)return;
    const p=profile(),pl=plan(),rule=RULES[String(goalEl.value||"maintain").toLowerCase()]||RULES.maintain;
    const weight=num(userValue(p,pl,["weight","currentWeight"],null));
    const calories=num(calEl.value);
    if(weight===null||calories===null||calories<1000)return;
    const protein=Math.round(weight*rule.proteinPerKg);
    const fats=Math.round(weight*rule.fatPerKg);
    const carbs=Math.max(0,Math.round((calories-(protein*4)-(fats*9))/4));
    set(field("protein"),protein);
    set(field("carbs"),carbs);
    set(field("fat"),fats);
  }

  function bind(){
    const m=document.getElementById(EDITOR);
    if(!m||!m.classList.contains("open")||m.dataset.goalSyncBound==="1")return;
    const goal=field("goal");
    if(!goal)return;
    m.dataset.goalSyncBound="1";
    goal.addEventListener("change",syncFromGoal);
    const calories=field("calories");
    if(calories)calories.addEventListener("change",syncMacrosFromCalories);
    syncFromGoal();
  }

  const observer=new MutationObserver(bind);
  if(document.documentElement)observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["class"]});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bind);else bind();
})();
