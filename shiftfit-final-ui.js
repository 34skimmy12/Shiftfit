/* ShiftFit Final UI — screenshot-matched black/cyan dashboard pass. */
(function(){
  "use strict";
  if(window.__shiftfitFinalUIv2)return;
  window.__shiftfitFinalUIv2=true;

  const css=`
  :root{
    --sf-cyan:#00d9ff!important;--sf-cyan-soft:#63d7f1!important;--sf-bg:#001014!important;--sf-card:#03181d!important;--sf-card2:#062229!important;--sf-line:#007d91!important;--sf-muted:#b7c6cc!important;
  }
  html,body{background:#000!important;color:#f7f9fa!important}
  body{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;background:radial-gradient(circle at 50% 12%,#04252a 0,#001014 38%,#00080a 100%)!important}
  .app{max-width:710px!important;padding:25px 29px 112px!important}
  .home-header{height:142px!important;margin-bottom:4px!important}
  .logo{font-size:32px!important;letter-spacing:-1.6px!important}
  .logo-bolt,.logo-fit{color:#00d9ff!important;text-shadow:0 0 15px rgba(0,217,255,.55)!important}.logo-shift{color:#f7f9fa!important}
  .avatar{width:102px!important;height:102px!important;border:3px solid #00d9ff!important;box-shadow:0 0 16px rgba(0,217,255,.28)!important}
  .user-row{gap:21px!important;margin:4px 2px 28px!important}.user-name{font-size:34px!important}.user-level{font-size:18px!important}
  .today-plan{padding:25px 28px 20px!important;border-radius:21px!important;border:1.7px solid #008096!important;background:linear-gradient(145deg,#03171b,#021216)!important;box-shadow:inset 0 0 30px rgba(0,217,255,.02)!important}
  .plan-heading{font-size:29px!important}.shift-badge{background:transparent!important;border:2px solid #00d9ff!important;border-radius:16px!important;color:#00d9ff!important;padding:14px 25px!important;font-size:18px!important}.shift-time-row{margin-top:21px!important;font-size:19px!important;color:#d6e0e3!important}.plan-stats{margin-top:20px!important;padding-top:15px!important;border-top:1px solid #1c444a!important}.plan-stat{padding:0!important;border-right:1px solid #12434a!important}.plan-stat-label{font-size:16px!important;color:#c3d0d5!important}.plan-stat-value{font-size:29px!important}.stat-icon{font-size:32px!important}
  .sf-track-day{margin-top:20px;padding:20px 27px 16px;border:1.7px solid #008096;border-radius:21px;background:linear-gradient(145deg,#03171b,#021216);box-shadow:inset 0 0 30px rgba(0,217,255,.02)}
  .sf-track-kicker{color:#00d9ff;font-size:16px;font-weight:800;letter-spacing:2.4px}.sf-track-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.sf-track-title{font-size:31px;font-weight:800;margin-top:4px}.sf-water-pill{height:52px;display:flex;align-items:center;gap:7px;border:1.7px solid #007e94;background:#062b33;border-radius:19px;padding-left:15px;color:#e7f2f4;font-weight:800;font-size:17px}.sf-water-pill button{width:45px;height:45px;border:0;border-radius:50%;background:#00d9ff;color:#001014;font-size:31px;font-weight:400;margin-right:2px}
  .sf-macro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px}.sf-macro{min-height:84px;border-radius:14px;background:linear-gradient(#082c34,#062229);display:flex;flex-direction:column;align-items:center;justify-content:center}.sf-macro b{font-size:14px;color:#00d9ff;font-weight:700;letter-spacing:.6px}.sf-macro strong{font-size:25px;margin-top:7px}.sf-macro small{font-size:13px;color:#bdcbd0;margin-top:5px}.sf-nutrition{display:flex;justify-content:space-between;margin:22px 0 10px;font-size:16px}.sf-nutrition-bar{height:11px;border-radius:10px;background:#063038;overflow:hidden}.sf-nutrition-bar span{display:block;height:100%;width:0;background:#00d9ff}
  .sf-home-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:0}.sf-home-action{height:68px;border:1.7px solid #007e94!important;border-radius:16px;background:#02161b!important;color:#f7f9fa!important;display:flex;align-items:center;padding:0 23px;font-weight:700;font-size:16px}.sf-home-action .ico{font-size:28px;color:#00d9ff;margin-right:18px}.sf-home-action .plus{margin-left:auto;color:#00d9ff;font-size:30px;font-weight:400}
  .sf-quick-stats{margin-top:0;padding:18px 27px 17px;border:1.7px solid #008096;border-radius:21px;background:linear-gradient(145deg,#03171b,#021216)}.sf-quick-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.sf-quick-head h3{margin:0;font-size:29px}.sf-view-all{border:0;background:transparent;color:#00d9ff;font-size:16px;font-weight:700}.sf-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.sf-mini-stat{height:111px;border-radius:14px;background:linear-gradient(#082c34,#062229);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.sf-mini-stat .ico{font-size:29px}.sf-mini-stat strong{font-size:23px;margin-top:8px}.sf-mini-stat small{font-size:14px;color:#d0dade;margin-top:5px}.sf-connect-row{height:68px;margin-top:13px;border-radius:14px;background:linear-gradient(90deg,#06272e,#07313a);display:flex;align-items:center;padding:0 12px;gap:12px}.sf-connect-row>.ico{font-size:28px;color:#00d9ff}.sf-connect-copy{display:flex;flex-direction:column;min-width:0;flex:1}.sf-connect-copy b{font-size:16px}.sf-connect-copy small{font-size:13px;color:#c4d1d5;margin-top:5px;white-space:nowrap}.sf-connect-btn{height:49px;border:1.8px solid #00d9ff!important;border-radius:13px;background:transparent!important;color:#00d9ff!important;padding:0 17px;font-weight:800;white-space:nowrap}
  .sf-home-enhancements{display:flex;flex-direction:column;gap:18px}.action-grid{display:none!important}.ai-card{display:none!important}
  .bottom-nav,.nav-bar,.tab-bar{background:rgba(0,12,15,.98)!important;border-top:1px solid #12353a!important;box-shadow:none!important}.bottom-nav button,.nav-bar button,.tab-bar button{color:#b8c4c8!important}.bottom-nav .active,.nav-bar .active,.tab-bar .active{color:#00d9ff!important}
  .primary,.primary-btn,.save-btn,.finish-button.ready{background:linear-gradient(135deg,#00d9ff,#2e8ed1)!important;color:#001014!important}
  .workout-day,.meal-kicker,.setup-kicker,.shopping-kicker,.accent,.highlight,.brand-accent{color:#00d9ff!important}
  @media(max-width:600px){
    .app{padding:14px 18px 100px!important}.home-header{height:110px!important}.logo{font-size:25px!important}.user-row{gap:12px!important;margin-bottom:20px!important}.avatar{width:76px!important;height:76px!important}.user-name{font-size:27px!important}.user-level{font-size:14px!important}
    .today-plan{padding:20px 18px!important}.plan-heading{font-size:25px!important}.shift-badge{padding:11px 14px!important;font-size:14px!important}.shift-time-row{font-size:16px!important;margin-top:15px!important}.plan-stat-label{font-size:13px!important}.plan-stat-value{font-size:22px!important}.stat-icon{font-size:27px!important}
    .sf-track-day{padding:18px!important}.sf-track-kicker{font-size:13px}.sf-track-title{font-size:25px}.sf-water-pill{height:50px;font-size:15px;padding-left:12px}.sf-water-pill button{width:42px;height:42px;font-size:27px}.sf-macro-grid{gap:7px}.sf-macro{min-height:76px}.sf-macro b{font-size:11px}.sf-macro strong{font-size:19px}.sf-macro small{font-size:11px}.sf-nutrition{font-size:14px}
    .sf-home-action{height:62px;padding:0 13px;font-size:14px}.sf-home-action .ico{font-size:23px;margin-right:10px}.sf-home-action .plus{font-size:28px}
    .sf-quick-stats{padding:18px!important}.sf-quick-head h3{font-size:25px}.sf-stat-grid{gap:7px}.sf-mini-stat{height:95px}.sf-mini-stat .ico{font-size:24px}.sf-mini-stat strong{font-size:18px}.sf-mini-stat small{font-size:11px}.sf-connect-copy b{font-size:14px}.sf-connect-copy small{font-size:10px}.sf-connect-btn{height:43px;padding:0 10px;font-size:12px}
  }
  @media(max-width:420px){.sf-macro-grid,.sf-stat-grid{grid-template-columns:repeat(2,1fr)}.sf-track-head{align-items:flex-start}.sf-water-pill{margin-top:2px}.sf-connect-row{height:auto;min-height:68px}.sf-connect-copy small{white-space:normal}}
  `;
  const style=document.createElement("style");style.id="shiftfit-final-ui-css-v2";style.textContent=css;document.head.appendChild(style);

  function home(){return document.querySelector("#homeScreen")||document.querySelector(".screen.active")||document.body}
  function heading(text){return [...home().querySelectorAll("h1,h2,h3,h4,.section-title,.title,.plan-heading")].find(e=>(e.textContent||"").toLowerCase().includes(text))}
  function steps(){try{if(window.shiftfitActivity&&typeof window.shiftfitActivity.getSteps==="function")return Number(window.shiftfitActivity.getSteps())||0;const raw=localStorage.getItem("shiftfit_steps_v1");return raw?Number(JSON.parse(raw).steps)||0:0}catch(e){return 0}}
  function invoke(label){const all=[...home().querySelectorAll("button,[role=button],a")];const hit=all.find(b=>(b.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes(label));if(hit)hit.click()}
  function inject(){
    const h=home();if(!h||document.getElementById("sf-home-enhancements"))return;
    const plan=heading("today's plan");if(!plan)return;
    const card=plan.closest(".today-plan,.card,.panel,section,article");if(!card)return;
    const wrap=document.createElement("div");wrap.id="sf-home-enhancements";wrap.className="sf-home-enhancements";
    wrap.innerHTML=`
      <section class="sf-track-day" id="sf-track-day">
        <div class="sf-track-head"><div><div class="sf-track-kicker">TODAY'S PLAN</div><div class="sf-track-title">Track your day</div></div><div class="sf-water-pill">💧 <span id="sf-water-count">0 / 8</span><button type="button" id="sf-water-add">+</button></div></div>
        <div class="sf-macro-grid"><div class="sf-macro"><b>CALORIES</b><strong>2,973</strong><small>remaining</small></div><div class="sf-macro"><b>PROTEIN</b><strong>184g</strong><small>remaining</small></div><div class="sf-macro"><b>CARBS</b><strong>373g</strong><small>remaining</small></div><div class="sf-macro"><b>FAT</b><strong>83g</strong><small>remaining</small></div></div>
        <div class="sf-nutrition"><span>Today's nutrition</span><b>0%</b></div><div class="sf-nutrition-bar"><span></span></div>
      </section>
      <div class="sf-home-actions"><button class="sf-home-action" data-go="meal"><span class="ico">🍴</span><span>Log Meal</span><span class="plus">+</span></button><button class="sf-home-action" data-go="workout"><span class="ico">♎</span><span>Log Workout</span><span class="plus">+</span></button><button class="sf-home-action" data-go="steps"><span class="ico">👟</span><span>Log Steps</span><span class="plus">+</span></button><button class="sf-home-action" data-go="water"><span class="ico">💧</span><span>Log Water</span><span class="plus">+</span></button></div>
      <section class="sf-quick-stats"><div class="sf-quick-head"><h3>Quick Stats</h3><button class="sf-view-all" type="button">View All ›</button></div><div class="sf-stat-grid"><div class="sf-mini-stat"><span class="ico">👟</span><strong id="sf-q-steps">0</strong><small>Steps</small></div><div class="sf-mini-stat"><span class="ico">↔️</span><strong id="sf-q-distance">0.0 km</strong><small>Distance</small></div><div class="sf-mini-stat"><span class="ico">⏱️</span><strong id="sf-q-active">0 min</strong><small>Active Time</small></div><div class="sf-mini-stat"><span class="ico">🔥</span><strong id="sf-q-cal">0</strong><small>Active Calories</small></div></div><div class="sf-connect-row"><span class="ico">⌚</span><div class="sf-connect-copy"><b>Connect &amp; Sync</b><small>Strava, Garmin, Apple Health &amp; more</small></div><button class="sf-connect-btn" type="button" id="sf-connect-open">🔗 CONNECT</button></div></section>`;
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
  function boot(){inject();setTimeout(inject,400);setTimeout(inject,1000);setTimeout(inject,1800);setInterval(update,1000)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
