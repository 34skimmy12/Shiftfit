/* ShiftFit Weekly Coach v1
 * Converts the user's real weekly tracking data into one clear next action.
 */
(function(){
  "use strict";
  const ROOT_ID="shiftfit-weekly-coach";
  const STYLE_ID="shiftfit-weekly-coach-style";
  const getJSON=(k,f)=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):f}catch(_){return f}};
  const n=v=>{const x=Number(v);return Number.isFinite(x)?x:null};
  const dates=()=>{const a=[],d=new Date();d.setHours(12,0,0,0);for(let i=6;i>=0;i--){const x=new Date(d);x.setDate(x.getDate()-i);a.push(x.toISOString().slice(0,10))}return a};
  function analyse(){
    const plan=getJSON("shiftfitPlan",{})||{}, h=getJSON("shiftfitProgressDailyHistory",{})||{};
    const cal=n(plan.calories||plan.targetCalories)||0, protein=n(plan.protein||plan.targetProtein)||0;
    let logged=0, calScore=0, calDays=0, proteinScore=0, proteinDays=0, water=0, workouts=0;
    dates().forEach(k=>{const r=h[k];if(!r)return;const any=n(r.calories)>0||n(r.protein)>0||n(r.water)>0||r.workout||r.weight!==null;if(any)logged++;
      if(cal>0&&n(r.calories)>0){calScore+=Math.max(0,100-Math.min(100,Math.abs(n(r.calories)-cal)/cal*100));calDays++}
      if(protein>0&&n(r.protein)>0){proteinScore+=Math.min(100,n(r.protein)/protein*100);proteinDays++}
      if(n(r.water)>=6)water++; if(r.workout)workouts++;
    });
    const metrics={logging:Math.round(logged/7*100),calories:calDays?Math.round(calScore/calDays):0,protein:proteinDays?Math.round(proteinScore/proteinDays):0,water:Math.round(water/7*100),workouts:Math.round(workouts/7*100)};
    let key="logging"; if(logged===0)key="logging"; else key=Object.keys(metrics).filter(k=>k!=="logging").sort((a,b)=>metrics[a]-metrics[b])[0];
    const actions={logging:["Start logging today","Log your meals, water or workout so ShiftFit can coach you from real data."],calories:["Tighten calorie consistency","Log today's food and aim to stay close to your personalised calorie target."],protein:["Prioritise protein","Build today's meals around your protein target — this is your biggest nutrition gap."],water:["Get your water in","Aim for at least 6 glasses today and spread them across your shift."],workouts:["Get one more session in","Complete your scheduled workout, or choose a recovery session if today is a rest day."]};
    const [title,detail]=actions[key];
    const avg=Object.values(metrics).reduce((a,b)=>a+b,0)/5;
    return {score:Math.round(avg),title,detail,metrics,logged};
  }
  function styles(){if(document.getElementById(STYLE_ID))return;const s=document.createElement("style");s.id=STYLE_ID;s.textContent=`#${ROOT_ID}{margin:14px 0;padding:17px;border:1px solid rgba(139,92,246,.45);border-radius:19px;background:linear-gradient(145deg,#1b1041,#0b1021);box-shadow:0 14px 34px rgba(0,0,0,.2)}#${ROOT_ID} .swc-k{font-size:9px;letter-spacing:.16em;font-weight:950;color:#a78bfa}#${ROOT_ID} .swc-title{margin-top:5px;font-size:20px;font-weight:950}#${ROOT_ID} .swc-detail{margin-top:5px;color:#b5bdd0;font-size:11px;line-height:1.5}#${ROOT_ID} .swc-score{float:right;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;border:2px solid #8b5cf6;background:#080d1d;font-weight:950;font-size:17px}#${ROOT_ID} .swc-action{margin-top:14px;padding:11px;border-radius:12px;background:rgba(53,223,141,.08);border:1px solid rgba(53,223,141,.2);font-size:11px;line-height:1.45}#${ROOT_ID} .swc-action strong{display:block;font-size:8px;letter-spacing:.12em;color:#8fe7c1;margin-bottom:3px}#${ROOT_ID} .swc-cta{margin-top:11px;width:100%;border:0;border-radius:11px;padding:11px;color:white;font-weight:900;background:linear-gradient(135deg,#8b3cff,#5123c5)}#${ROOT_ID} .swc-mini{margin-top:8px;color:#8993aa;font-size:9px}#${ROOT_ID} .swc-clear{clear:both}`;document.head.appendChild(s)}
  function render(){const host=document.getElementById("progressHistoryList")||document.querySelector("#progressScreen .screen-content")||document.getElementById("progressScreen");if(!host)return;let root=document.getElementById(ROOT_ID);if(!root){root=document.createElement("section");root.id=ROOT_ID;const acc=document.getElementById("shiftfit-accountability");if(acc&&acc.parentNode)acc.parentNode.insertBefore(root,acc.nextSibling);else host.prepend(root)}styles();const a=analyse();root.innerHTML=`<div class="swc-score">${a.score}</div><div class="swc-k">SHIFT FIT COACH</div><div class="swc-title">${a.title}</div><div class="swc-detail">${a.detail}</div><div class="swc-clear"></div><div class="swc-action"><strong>NEXT BEST ACTION</strong>${a.detail}</div><button class="swc-cta" onclick="typeof showAICoach==='function'?showAICoach():alert('AI Coach is available from the home screen.')">ASK AI COACH</button><div class="swc-mini">Based on your last 7 days of ShiftFit activity.</div>`}
  function boot(){render();setTimeout(render,600);setTimeout(render,1600)}
  window.shiftfitRenderWeeklyCoach=render;if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
