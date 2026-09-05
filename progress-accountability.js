/* ShiftFit Progress Accountability v1
 * Turns the existing progress history into a clear weekly score,
 * consistency view and next-action coaching card.
 */
(function(){
  "use strict";

  const ROOT_ID="shiftfit-accountability";
  const STYLE_ID="shiftfit-accountability-style";

  function getJSON(key,fallback){
    try{
      const raw=localStorage.getItem(key);
      return raw?JSON.parse(raw):fallback;
    }catch(_){return fallback;}
  }

  function getPlan(){return getJSON("shiftfitPlan",{})||{};}

  function dateKey(date=new Date()){
    const d=new Date(date); d.setHours(12,0,0,0);
    const y=d.getFullYear();
    const m=String(d.getMonth()+1).padStart(2,"0");
    const day=String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }

  function last7(){
    const out=[]; const now=new Date();
    for(let i=6;i>=0;i--){
      const d=new Date(now); d.setDate(d.getDate()-i); out.push(dateKey(d));
    }
    return out;
  }

  function readHistory(){
    const h=getJSON("shiftfitProgressDailyHistory",{});
    return h&&typeof h==="object"&&!Array.isArray(h)?h:{};
  }

  function pct(value,total){
    if(!total||!Number.isFinite(Number(total))) return 0;
    return Math.max(0,Math.min(100,Math.round((Number(value)/Number(total))*100)));
  }

  function analyse(){
    try{ if(typeof recordTodayProgressSnapshot==="function") recordTodayProgressSnapshot(); }catch(_){}
    const plan=getPlan();
    const targetCal=Number(plan.calories||plan.targetCalories||0);
    const targetProtein=Number(plan.protein||plan.targetProtein||0);
    const history=readHistory();
    const dates=last7();
    const rows=dates.map(k=>history[k]||null);

    let loggedDays=0, calorieDays=0, proteinDays=0, waterDays=0, workoutDays=0;
    let calorieScore=0, proteinScore=0, waterScore=0;
    rows.forEach(row=>{
      if(!row) return;
      const hasAny=Number(row.calories)>0||Number(row.protein)>0||Number(row.water)>0||row.workout||row.weight!==null;
      if(hasAny) loggedDays++;
      if(targetCal>0&&Number(row.calories)>0){
        const adherence=100-Math.min(100,Math.abs(Number(row.calories)-targetCal)/targetCal*100);
        calorieScore+=Math.max(0,adherence); calorieDays++;
      }
      if(targetProtein>0&&Number(row.protein)>0){
        proteinScore+=Math.min(100,Number(row.protein)/targetProtein*100); proteinDays++;
      }
      if(Number(row.water)>=6){waterDays++;}
      if(row.workout) workoutDays++;
    });

    const loggingPct=pct(loggedDays,7);
    const calPct=calorieDays?pct(calorieScore,calorieDays):0;
    const proteinPct=proteinDays?pct(proteinScore,proteinDays):0;
    const waterPct=pct(waterDays,7);
    const workoutPct=pct(workoutDays,7);
    const score=Math.round(loggingPct*.30 + calPct*.25 + proteinPct*.20 + waterPct*.10 + workoutPct*.15);

    let headline="Build your first streak";
    let detail="Log one meal, workout or weigh-in today and ShiftFit will start learning your consistency.";
    if(score>=85){headline="Excellent consistency 🔥";detail="You're doing the important bit: showing up consistently. Keep the same routine this week.";}
    else if(score>=65){headline="Good week — keep pushing 💪";detail="You've built a solid base. Tighten up the weakest area below and your score will climb.";}
    else if(score>=40){headline="Momentum is building 🚀";detail="You're getting started. A few more consistent days will give ShiftFit a much clearer picture.";}

    const metrics=[
      {label:"LOGGING",value:loggingPct,detail:`${loggedDays}/7 days`},
      {label:"CALORIES",value:calPct,detail:calorieDays?`${Math.round(calorieScore/calorieDays)}% on target`:"Start logging"},
      {label:"PROTEIN",value:proteinPct,detail:proteinDays?`${Math.round(proteinScore/proteinDays)}% of target`:"Start logging"},
      {label:"WATER",value:waterPct,detail:`${waterDays}/7 days ≥ 6`},
      {label:"WORKOUTS",value:workoutPct,detail:`${workoutDays}/7 days`}
    ];

    const weakest=metrics.slice(1).sort((a,b)=>a.value-b.value)[0];
    let action="Log your first activity today.";
    if(weakest){
      const actions={CALORIES:"Log your food today so ShiftFit can measure calorie adherence.",PROTEIN:"Prioritise your protein target today — it is currently your biggest gap.",WATER:"Aim for at least 6 glasses of water today.",WORKOUTS:"Complete today's scheduled workout, or use the recovery session if you're on a rest day."};
      action=actions[weakest.label]||action;
    }

    return {score,headline,detail,action,metrics};
  }

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement("style"); s.id=STYLE_ID; s.textContent=`
      #${ROOT_ID}{margin:0 0 14px;padding:16px;border:1px solid #303a60;border-radius:18px;background:linear-gradient(145deg,#151b36,#0b1021);box-shadow:0 12px 30px rgba(0,0,0,.16)}
      #${ROOT_ID} .sfa-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
      #${ROOT_ID} .sfa-kicker{font-size:9px;font-weight:900;letter-spacing:.14em;color:#9da6bd}
      #${ROOT_ID} .sfa-score{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;border:2px solid #8b5cf6;background:#080d1d;font-size:18px;font-weight:950}
      #${ROOT_ID} .sfa-title{margin:5px 0 2px;font-size:17px;font-weight:950}
      #${ROOT_ID} .sfa-detail{color:#9fa7bb;font-size:10px;line-height:1.45}
      #${ROOT_ID} .sfa-metrics{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:13px}
      #${ROOT_ID} .sfa-metric{padding:9px;border:1px solid #303a60;border-radius:11px;background:#080d1d}
      #${ROOT_ID} .sfa-metric:last-child{grid-column:1/-1}
      #${ROOT_ID} .sfa-metric-top{display:flex;justify-content:space-between;gap:8px;color:#aab1c5;font-size:8px;font-weight:900;letter-spacing:.1em}
      #${ROOT_ID} .sfa-bar{height:5px;margin-top:7px;border-radius:99px;background:#202844;overflow:hidden}
      #${ROOT_ID} .sfa-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#6d28d9,#35df8d)}
      #${ROOT_ID} .sfa-action{margin-top:11px;padding:10px 11px;border-radius:11px;background:rgba(139,92,246,.10);border:1px solid rgba(139,92,246,.3);color:#c8b8ff;font-size:10px;line-height:1.4}
      #${ROOT_ID} .sfa-action strong{display:block;color:#fff;font-size:8px;letter-spacing:.1em;margin-bottom:3px}
      @media(max-width:390px){#${ROOT_ID}{padding:14px}.sfa-score{width:54px;height:54px}.sfa-title{font-size:16px}}
    `; document.head.appendChild(s);
  }

  function render(){
    const list=document.getElementById("progressHistoryList");
    if(!list) return;
    let root=document.getElementById(ROOT_ID);
    if(!root){root=document.createElement("section");root.id=ROOT_ID;list.parentNode.insertBefore(root,list);}
    addStyles();
    const a=analyse();
    root.innerHTML=`
      <div class="sfa-head">
        <div>
          <div class="sfa-kicker">7-DAY ACCOUNTABILITY</div>
          <div class="sfa-title">${a.headline}</div>
          <div class="sfa-detail">${a.detail}</div>
        </div>
        <div class="sfa-score">${a.score}</div>
      </div>
      <div class="sfa-metrics">
        ${a.metrics.map(m=>`<div class="sfa-metric"><div class="sfa-metric-top"><span>${m.label}</span><span>${m.value}%</span></div><div class="sfa-bar"><div class="sfa-fill" style="width:${m.value}%"></div></div><div class="sfa-detail" style="margin-top:5px">${m.detail}</div></div>`).join("")}
      </div>
      <div class="sfa-action"><strong>NEXT BEST ACTION</strong>${a.action}</div>
    `;
  }

  function boot(){
    render();
    setTimeout(render,500);
    setTimeout(render,1500);
  }

  window.shiftfitRenderAccountability=render;
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true}); else boot();
})();
