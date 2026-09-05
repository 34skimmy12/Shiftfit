/* ShiftFit Meal Plan Integrator
 * Connects the existing Build Your Plan form directly to the smart 7-day
 * meal engine. No duplicate personalisation screen.
 */
(function(){
  "use strict";

  const STYLE_ID="shiftfit-smart-preferences-style";
  const PREF_ID="shiftfit-smart-preferences";
  const FOOD_CATALOGUE=[
    "Chicken","Beef","Turkey","Salmon","Tuna","Eggs","Greek yoghurt",
    "Cottage cheese","Protein powder","Protein bar","Oats","Rice","Pasta",
    "Wraps","Bread","Rice cakes","Sweet potato","Potatoes","Beans",
    "Vegetables","Spinach","Broccoli","Peppers","Onions","Tomatoes",
    "Cucumber","Lettuce","Carrots","Berries","Bananas","Apples",
    "Avocado","Peanut butter","Almonds","Nuts","Chia seeds","Honey"
  ];

  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||"")||fallback;}catch(_){return fallback;}}
  function writeJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){} }
  function esc(value){return String(value??"").replace(/[&<>\"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
  function getPlan(){return readJSON("shiftfitPlan",{})||{};}
  function getShift(){
    try{
      if(typeof selectedShift!=="undefined" && selectedShift) return String(selectedShift).toLowerCase();
    }catch(_){}
    return String(localStorage.getItem("shiftfitSelectedShift")||"day").toLowerCase();
  }
  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement("style");s.id=STYLE_ID;s.textContent=`
      #${PREF_ID}{margin-top:18px;padding:17px;border:1px solid #303a60;border-radius:18px;background:linear-gradient(145deg,#151b36,#0c1123)}
      #${PREF_ID} .sfsp-title{font-size:14px;font-weight:900;margin-bottom:4px}
      #${PREF_ID} .sfsp-sub{color:#9fa7bb;font-size:11px;line-height:1.45;margin-bottom:13px}
      #${PREF_ID} .sfsp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      #${PREF_ID} label{display:block;color:#bfc5d5;font-size:10px;font-weight:850;letter-spacing:.5px;margin-bottom:6px}
      #${PREF_ID} input{width:100%;height:48px;border:1px solid #374164;border-radius:11px;background:#080d1d;color:white;padding:0 12px;font-size:14px;font-weight:700;outline:none}
      #${PREF_ID} input:focus{border-color:#8b5cf6;box-shadow:0 0 0 3px rgba(139,92,246,.12)}
      #${PREF_ID} .sfsp-help{grid-column:1/-1;color:#747d94;font-size:10px;line-height:1.4;margin-top:-3px}
      @media(max-width:390px){#${PREF_ID} .sfsp-grid{grid-template-columns:1fr}}
    `;document.head.appendChild(s);
  }
  function renderPreferences(){
    if(document.getElementById(PREF_ID))return;
    const generate=document.querySelector(".generate-btn");if(!generate)return;
    addStyles();
    const plan=getPlan();
    const likes=Array.isArray(plan.foodLikes)?plan.foodLikes.join(", "):String(plan.foodLikes||"");
    const avoid=Array.isArray(plan.foodAvoid)?plan.foodAvoid.join(", "):String(plan.foodAvoid||"");
    const box=document.createElement("section");box.id=PREF_ID;box.innerHTML=`
      <div class="sfsp-title">🥗 SMART FOOD PREFERENCES</div>
      <div class="sfsp-sub">Optional. Tell ShiftFit what you like and what you want excluded when rebuilding your 7-day meal plan.</div>
      <div class="sfsp-grid">
        <div><label for="sfSmartLikes">FOODS I LIKE</label><input id="sfSmartLikes" value="${esc(likes)}" placeholder="Chicken, oats, salmon..."></div>
        <div><label for="sfSmartAvoid">FOODS TO AVOID</label><input id="sfSmartAvoid" value="${esc(avoid)}" placeholder="Peanuts, tuna..."></div>
        <div class="sfsp-help">Separate foods with commas. Avoid foods are treated as hard exclusions where the meal catalogue allows it.</div>
      </div>`;
    generate.parentNode.insertBefore(box,generate);
  }
  function capturePreferences(){
    const plan=getPlan();
    const likes=(document.getElementById("sfSmartLikes")?.value||"").split(",").map(x=>x.trim()).filter(Boolean);
    const avoid=(document.getElementById("sfSmartAvoid")?.value||"").split(",").map(x=>x.trim()).filter(Boolean);
    plan.foodLikes=likes;plan.foodAvoid=avoid;plan.shiftPattern=getShift();
    writeJSON("shiftfitPlan",plan);
  }
  function ensureTargets(plan){
    plan.calories=Number(plan.calories)||Number(plan.targetCalories)||0;
    plan.protein=Number(plan.protein)||Number(plan.targetProtein)||0;
    plan.carbs=Number(plan.carbs)||Number(plan.targetCarbs)||0;
    plan.fats=Number(plan.fats)||Number(plan.targetFats)||0;
    plan.targetCalories=plan.calories;plan.targetProtein=plan.protein;plan.targetCarbs=plan.carbs;plan.targetFats=plan.fats;
    return plan;
  }
  function wireGenerate(){
    if(typeof window.generatePlan!=="function" || window.generatePlan.__shiftfitSmartWrapped)return false;
    const original=window.generatePlan;
    function wrappedGeneratePlan(){
      capturePreferences();
      let result;
      try{result=original.apply(this,arguments);}catch(error){console.error("ShiftFit original plan generation failed",error);throw error;}
      const run=()=>{
        const plan=ensureTargets(getPlan());
        plan.shiftPattern=getShift();
        writeJSON("shiftfitPlan",plan);
        if(typeof window.shiftfitGenerateTargetAwareMealPlan==="function"){
          try{window.shiftfitGenerateTargetAwareMealPlan(plan);}
          catch(error){console.error("ShiftFit smart meal generation failed",error);}
        }
      };
      setTimeout(run,50);
      return result;
    }
    wrappedGeneratePlan.__shiftfitSmartWrapped=true;
    wrappedGeneratePlan.__shiftfitOriginal=original;
    window.generatePlan=wrappedGeneratePlan;
    return true;
  }
  function boot(){
    renderPreferences();
    wireGenerate();
    setTimeout(()=>{renderPreferences();wireGenerate();},300);
    setTimeout(()=>{renderPreferences();wireGenerate();},1000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
