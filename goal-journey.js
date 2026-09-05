/* ShiftFit Goal Journey v1
 * Connects the real weight baseline/history to the existing target-weight UI.
 * Stores only the user's chosen target; never invents weigh-ins.
 */
(function(){
  "use strict";
  const TARGET_KEY="shiftfitGoalTargetWeight";
  const HISTORY_KEY="shiftfitWeightHistory";
  const PLAN_KEY="shiftfitPlan";

  function json(key,fallback){try{const r=localStorage.getItem(key);return r?JSON.parse(r):fallback;}catch(_){return fallback;}}
  function num(v){const n=Number(v);return Number.isFinite(n)?n:null;}
  function history(){const h=json(HISTORY_KEY,[]);return Array.isArray(h)?h.filter(x=>x&&num(x.weight)>=20&&num(x.weight)<=400).sort((a,b)=>String(a.date).localeCompare(String(b.date))):[];}
  function target(){const n=num(localStorage.getItem(TARGET_KEY));return n!==null&&n>=20&&n<=400?Math.round(n*10)/10:null;}
  function saveTarget(v){localStorage.setItem(TARGET_KEY,String(Math.round(v*10)/10));}
  function startWeight(){const h=history();return h.length?num(h[0].weight):null;}
  function currentWeight(){const h=history();return h.length?num(h[h.length-1].weight):null;}

  function render(){
    const h=history(), start=startWeight(), current=currentWeight(), t=target();
    const set=(id,value)=>{const e=document.getElementById(id);if(e)e.textContent=value;};
    if(t===null){
      set("targetWeightValue","—");set("weightTargetJourneyValue","—");set("weightToGoValue","Set a target");set("weightGoalPercent","0%");set("weightGoalFill","");
      const fill=document.getElementById("weightGoalFill");if(fill)fill.style.width="0%";
      return;
    }
    set("targetWeightValue",t.toFixed(1));set("weightTargetJourneyValue",t.toFixed(1));
    if(start===null||current===null){set("weightGoalPercent","0%");set("weightToGoValue","— kg to go");return;}
    const total=Math.abs(start-t), done=Math.abs(start-current);
    let progress=total>0?(done/total)*100:100;
    if((t<start&&current>start)||(t>start&&current<start))progress=0;
    progress=Math.max(0,Math.min(100,progress));
    const toGo=Math.abs(current-t);
    set("weightGoalPercent",`${Math.round(progress)}%`);
    set("weightToGoValue",toGo<0.05?"Goal reached 🎯":`${toGo.toFixed(1)} kg to go`);
    const fill=document.getElementById("weightGoalFill");if(fill)fill.style.width=`${progress}%`;
    const card=document.getElementById("weightToGoValue");if(card)card.style.color=progress>=100?"#35df8d":"";
  }

  function install(){
    const original=window.saveTargetWeight;
    window.saveTargetWeight=function(){
      const input=document.getElementById("targetWeightInput");
      const v=input?num(input.value):null;
      const start=startWeight();
      if(v===null||v<20||v>400){alert("Please enter a target weight between 20 and 400 kg.");return;}
      if(start!==null && Math.abs(v-start)<0.05){alert("Choose a target weight different from your starting weight.");return;}
      saveTarget(v);
      try{if(typeof original==="function") original();}catch(_){}
      render();
      try{if(typeof renderWeightProgress==="function")renderWeightProgress();if(typeof renderWeightTrend==="function")renderWeightTrend();if(typeof updateProgressInsights==="function")updateProgressInsights();}catch(_){}
    };
    window.shiftfitRenderGoalJourney=render;
    render();
    setTimeout(render,300);setTimeout(render,1000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
})();
