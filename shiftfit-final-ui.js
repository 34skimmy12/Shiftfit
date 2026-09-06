/* ShiftFit Final UI — approved black/cyan dashboard layout. */
(function(){
  "use strict";
  if(window.__shiftfitFinalUI)return;
  window.__shiftfitFinalUI=true;

  const css=`
  :root{
    --sf-cyan:#63d7f1!important;--sf-blue:#2e8ed1!important;--sf-bg:#071012!important;--sf-card:#101719!important;--sf-card2:#0c1315!important;--sf-line:#145866!important;--sf-muted:#a7adb5!important;
  }
  html,body{background:#061012!important;color:#f7f8fa!important}
  body{background:radial-gradient(ellipse at 50% -15%,rgba(99,215,241,.08),transparent 45%),linear-gradient(180deg,#0a1113 0%,#071012 48%,#05090a 100%)!important}
  body::before{background:linear-gradient(rgba(99,215,241,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(99,215,241,.012) 1px,transparent 1px)!important}
  .app{max-width:500px!important;padding:18px 18px 112px!important}
  .home-header{margin-bottom:20px!important}
  .logo{font-size:29px!important;font-weight:1000!important}
  .logo-bolt,.logo-fit{color:#63d7f1!important;text-shadow:0 0 12px rgba(99,215,241,.55)!important}.logo-shift{color:#f7f8fa!important}
  .avatar{border-color:#63d7f1!important;box-shadow:0 0 15px rgba(99,215,241,.28)!important}
  .user-row{margin:5px 2px 20px!important}
  .user-name{font-size:24px!important}.user-level{font-size:14px!important}
  .today-plan,.meal-summary,.progress-card,.action-card,.ai-card,.exercise-card,.workout-stat,.stat-card,.meal-card,.workout-card{background:#101719!important;border-color:#145866!important;box-shadow:none!important}
  .today-plan{border-radius:22px!important;padding:20px!important}
  .shift-badge{background:transparent!important;border:1px solid #63d7f1!important;color:#63d7f1!important;border-radius:14px!important;padding:9px 16px!important}
  .plan-heading{font-size:22px!important}.shift-time-row{color:#b9c5ca!important}
  .plan-stats{border-top-color:#173238!important}.plan-stat{border-right-color:#173238!important}.plan-stat-label{color:#a7adb5!important}.plan-stat-value{font-size:21px!important}
  .sf-track-day{margin-top:18px;padding:20px;border:1px solid #145866;border-radius:22px;background:linear-gradient(145deg,#101a1d,#0b1113)}
  .sf-track-kicker{color:#63d7f1;font-size:12px;font-weight:950;letter-spacing:3px}.sf-track-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.sf-track-title{font-size:27px;font-weight:900;margin-top:5px}.sf-water-pill{display:flex;align-items:center;gap:7px;border:1px solid #12556a;background:#0b2028;border-radius:18px;padding:10px 13px;color:#c8f5ff;font-weight:900;white-space:nowrap}.sf-water-pill button{border:0;background:#63d7f1;color:#061016;width:30px;height:30px;border-radius:50%;font-size:22px;font-weight:900}.sf-macro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:17px}.sf-macro{padding:13px 6px;border-radius:16px;background:#0d2024;text-align:center}.sf-macro b{display:block;color:#63d7f1;font-size:11px;letter-spacing:1px}.sf-macro strong{display:block;font-size:18px;margin-top:7px}.sf-macro small{display:block;color:#a7adb5;margin-top:3px;font-size:10px}.sf-nutrition{display:flex;justify-content:space-between;margin-top:18px;color:#bfc9cd;font-size:13px;font-weight:800}.sf-nutrition-bar{height:9px;border-radius:20px;background:#10252a;overflow:hidden;margin-top:8px}.sf-nutrition-bar span{display:block;height:100%;width:0;background:linear-gradient(90deg,#2e8ed1,#63d7f1)}
  .sf-home-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}.sf-home-action{height:66px;border:1px solid #145866!important;border-radius:17px;background:#0c1719!important;color:#f7f8fa!important;display:flex;align-items:center;gap:12px;padding:0 15px;font-weight:800}.sf-home-action .ico{font-size:25px;color:#63d7f1}.sf-home-action .plus{margin-left:auto;color:#63d7f1;font-size:26px;font-weight:400}
  .sf-quick-stats{margin-top:18px;padding:18px;border:1px solid #145866;border-radius:22px;background:#0c1416}.sf-quick-head{display:flex;justify-content:space-between;align-items:center}.sf-quick-head h3{margin:0;font-size:22px}.sf-view-all{border:0;background:transparent;color:#63d7f1;font-weight:800}.sf-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:15px}.sf-mini-stat{padding:12px 5px;border-radius:15px;background:#0b2227;text-align:center}.sf-mini-stat .ico{font-size:22px}.sf-mini-stat strong{display:block;font-size:17px;margin-top:5px}.sf-mini-stat small{display:block;color:#b2bdc1;font-size:10px;margin-top:3px}.sf-connect-row{display:flex;align-items:center;gap:11px;margin-top:12px;padding:12px;border:1px solid #173a42;border-radius:15px;background:#0a1b1f}.sf-connect-copy{flex:1}.sf-connect-copy b{display:block}.sf-connect-copy small{color:#a7adb5}.sf-connect-btn{border:1px solid #63d7f1!important;background:transparent!important;color:#63d7f1!important;border-radius:12px;padding:9px 13px;font-weight:900}
  .action-grid{display:none!important}.ai-card{display:none!important}
  .bottom-nav,.nav-bar,.tab-bar{background:rgba(5,12,14,.98)!important;border-top:1px solid #173238!important;box-shadow:none!important}.bottom-nav .active,.nav-bar .active,.tab-bar .active{color:#63d7f1!important}.bottom-nav button,.nav-bar button,.tab-bar button{color:#a7adb5!important}.bottom-nav .active,.nav-bar .active,.tab-bar .active{color:#63d7f1!important}
  .bottom-nav svg,.nav-bar svg,.tab-bar svg{filter:none!important}
  button.primary,.primary,.primary-btn,.action-button,.save-btn,.finish-button.ready{background:linear-gradient(135deg,#63d7f1,#2e8ed1)!important;color:#061016!important;border-color:transparent!important}.action-button{display:none!important}
  .workout-day,.meal-kicker,.setup-kicker,.shopping-kicker,.accent,.highlight,.brand-accent{color:#63d7f1!important}
  [style*="#6d28d9"],[style*="#8b5cf6"],[style*="#a78bfa"],[style*="#7c3aed"],[style*="#4f46e5"],[style*="#854cff"],[style*="#8656ff"],[style*="rgba(109,40,217"],[style*="rgba(139,92,246"]{background:#101719!important;color:#63d7f1!important;border-color:#145866!important}
  [style*="purple"],[style*="violet"],[style*="rgb(109, 40, 217)"],[style*="rgb(139, 92, 246)"]{color:#63d7f1!important;border-color:#145866!important}
  @media(max-width:600px){.sf-macro-grid{gap:7px}.sf-macro{padding:11px 3px}.sf-track-title{font-size:25px}.sf-stat-grid{gap:6px}.sf-mini-stat{padding:11px 3px}.sf-mini-stat strong{font-size:15px}.sf-home-action{height:62px}}
  `;
  const style=document.createElement("style");style.id="shiftfit-final-ui-css";style.textContent=css;document.head.appendChild(style);

  function home(){return document.querySelector("#homeScreen")||document.querySelector(".screen.active")||document.body}
  function textNode(t){return [...home().querySelectorAll("h1,h2,h3,h4,.section-title,.title")].find(e=>(e.textContent||"").toLowerCase().includes(t))}
  function steps(){return window.shiftfitActivity&&typeof window.shiftfitActivity.getSteps==="function"?window.shiftfitActivity.getSteps():Number(localStorage.getItem("shiftfit_steps_v1")&&JSON.parse(localStorage.getItem("shiftfit_steps_v1")).steps||0)}
  function invoke(label){
    const all=[...home().querySelectorAll("button,[role=button],a")];const hit=all.find(b=>(b.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes(label));if(hit)hit.click();else if(label.includes("steps")&&window.shiftfitActivity)window.shiftfitActivity.open();
  }
  function inject(){
    const h=home(); if(!h||document.getElementById("sf-track-day"))return;
    const plan=textNode("today's plan"); if(!plan)return;
    const card=plan.closest(".today-plan,.card,.panel,section,article,div"); if(!card)return;
    const wrap=document.createElement("div");wrap.id="sf-home-enhancements";
    wrap.innerHTML=`
      <section class="sf-track-day" id="sf-track-day"><div class="sf-track-head"><div><div class="sf-track-kicker">TODAY'S PLAN</div><div class="sf-track-title">Track your day</div></div><div class="sf-water-pill">💧 <span id="sf-water-count">0 / 8</span><button type="button" id="sf-water-add">+</button></div></div><div class="sf-macro-grid"><div class="sf-macro"><b>CALORIES</b><strong>2,973</strong><small>remaining</small></div><div class="sf-macro"><b>PROTEIN</b><strong>184g</strong><small>remaining</small></div><div class="sf-macro"><b>CARBS</b><strong>373g</strong><small>remaining</small></div><div class="sf-macro"><b>FAT</b><strong>83g</strong><small>remaining</small></div></div><div class="sf-nutrition"><span>Today's nutrition</span><strong>0%</strong></div><div class="sf-nutrition-bar"><span></span></div></section>
      <div class="sf-home-actions"><button class="sf-home-action" data-go="meal"><span class="ico">🍽️</span><span>Log Meal</span><span class="plus">+</span></button><button class="sf-home-action" data-go="workout"><span class="ico">🏋️</span><span>Log Workout</span><span class="plus">+</span></button><button class="sf-home-action" data-go="steps"><span class="ico">👟</span><span>Log Steps</span><span class="plus">+</span></button><button class="sf-home-action" data-go="water"><span class="ico">💧</span><span>Log Water</span><span class="plus">+</span></button></div>
      <section class="sf-quick-stats"><div class="sf-quick-head"><h3>Quick Stats</h3><button class="sf-view-all" type="button">View All ›</button></div><div class="sf-stat-grid"><div class="sf-mini-stat"><span class="ico">👟</span><strong id="sf-q-steps">0</strong><small>Steps</small></div><div class="sf-mini-stat"><span class="ico">↔️</span><strong id="sf-q-distance">0.0 km</strong><small>Distance</small></div><div class="sf-mini-stat"><span class="ico">⏱️</span><strong id="sf-q-active">0 min</strong><small>Active Time</small></div><div class="sf-mini-stat"><span class="ico">🔥</span><strong id="sf-q-cal">0</strong><small>Active Calories</small></div></div><div class="sf-connect-row"><span class="ico">⌚</span><div class="sf-connect-copy"><b>Connect & Sync</b><small>Strava, Garmin, Apple Health & more</small></div><button class="sf-connect-btn" type="button" id="sf-connect-open">🔗 CONNECT</button></div></section>`;
    card.parentNode.insertBefore(wrap,card.nextSibling);
    wrap.querySelector('[data-go="meal"]').onclick=()=>invoke("meal");
    wrap.querySelector('[data-go="workout"]').onclick=()=>invoke("workout");
    wrap.querySelector('[data-go="steps"]').onclick=()=>window.shiftfitActivity&&window.shiftfitActivity.open();
    wrap.querySelector('[data-go="water"]').onclick=()=>invoke("water");
    wrap.querySelector('#sf-connect-open').onclick=()=>window.shiftfitActivity&&window.shiftfitActivity.connect();
    wrap.querySelector('.sf-view-all').onclick=()=>window.shiftfitActivity&&window.shiftfitActivity.open();
    wrap.querySelector('#sf-water-add').onclick=()=>{const el=wrap.querySelector('#sf-water-count');const n=Number((el.textContent||"0").split("/")[0])+1;el.textContent=Math.min(n,8)+" / 8"};
    update();
  }
  function update(){const s=steps();const a=document.getElementById("sf-q-steps");if(a)a.textContent=s.toLocaleString();const d=document.getElementById("sf-q-distance");if(d)d.textContent=(s*.00072).toFixed(1)+" km";const t=document.getElementById("sf-q-active");if(t)t.textContent=Math.round(s/105)+" min";const c=document.getElementById("sf-q-cal");if(c)c.textContent=Math.round(s*.04)}
  function boot(){inject();setTimeout(inject,500);setTimeout(inject,1500);setInterval(update,1000)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
