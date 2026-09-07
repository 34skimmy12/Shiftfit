/* ShiftFit Home v3 — reference-locked Home dashboard. */
(function(){
  "use strict";
  if(window.__shiftfitFinalUIv3)return;
  window.__shiftfitFinalUIv3=true;

  const css=`
  /* Home reference geometry */
  #homeScreen{padding-bottom:0!important}
  #homeScreen .sf-home-enhancements{display:flex!important;flex-direction:column!important;gap:12px!important}
  #homeScreen .today-plan{margin:0!important}
  #homeScreen .sf-track-day{margin:0!important}
  #homeScreen .sf-home-actions{margin:0!important}
  #homeScreen .sf-quick-stats{margin:0!important}

  .sf-track-day,.sf-quick-stats{
    border:1.5px solid #007f94!important;
    border-radius:21px!important;
    background:linear-gradient(145deg,#03171b,#021216)!important;
    box-shadow:inset 0 0 30px rgba(0,217,255,.018)!important;
  }
  .sf-track-day{padding:18px 18px 15px!important}
  .sf-track-kicker{color:#00d9ff!important;font-size:13px!important;font-weight:800!important;letter-spacing:2.3px!important}
  .sf-track-title{font-size:25px!important;line-height:1.05!important;font-weight:800!important;margin-top:5px!important}
  .sf-track-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important}
  .sf-water-pill{height:50px!important;border:1.5px solid #007f94!important;background:#062b33!important;border-radius:18px!important;padding-left:11px!important;color:#e7f2f4!important;font-size:15px!important;font-weight:800!important}
  .sf-water-pill button{width:42px!important;height:42px!important;border-radius:50%!important;background:#00d9ff!important;color:#001014!important;font-size:28px!important;margin-right:2px!important}

  .sf-macro-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important;margin-top:18px!important}
  .sf-macro{min-height:76px!important;border-radius:14px!important;background:linear-gradient(#082c34,#062229)!important}
  .sf-macro b{font-size:10px!important;color:#00d9ff!important;letter-spacing:.5px!important}
  .sf-macro strong{font-size:19px!important;margin-top:6px!important}
  .sf-macro small{font-size:11px!important;color:#bdcbd0!important;margin-top:4px!important}
  .sf-nutrition{display:flex!important;justify-content:space-between!important;margin:19px 0 9px!important;font-size:14px!important}
  .sf-nutrition-bar{height:10px!important;border-radius:10px!important;background:#063038!important}
  .sf-nutrition-bar span{background:#00d9ff!important}

  .sf-home-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:10px!important}
  .sf-home-action{height:62px!important;border:1.5px solid #007f94!important;border-radius:15px!important;background:#02161b!important;color:#f7f9fa!important;padding:0 13px!important;font-size:14px!important;font-weight:700!important}
  .sf-home-action .ico{font-size:23px!important;color:#00d9ff!important;margin-right:10px!important}
  .sf-home-action .plus{margin-left:auto!important;color:#00d9ff!important;font-size:28px!important}

  .sf-quick-stats{padding:18px!important}
  .sf-quick-head{display:flex!important;justify-content:space-between!important;align-items:center!important;margin-bottom:14px!important}
  .sf-quick-head h3{margin:0!important;font-size:25px!important}
  .sf-view-all{border:0!important;background:transparent!important;color:#00d9ff!important;font-size:14px!important;font-weight:700!important}
  .sf-stat-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important}
  .sf-mini-stat{height:95px!important;border-radius:14px!important;background:linear-gradient(#082c34,#062229)!important}
  .sf-mini-stat .ico{font-size:24px!important}
  .sf-mini-stat strong{font-size:18px!important;margin-top:7px!important}
  .sf-mini-stat small{font-size:11px!important;color:#d0dade!important;margin-top:4px!important}
  .sf-connect-row{height:68px!important;margin-top:12px!important;border-radius:14px!important;background:linear-gradient(90deg,#06272e,#07313a)!important;padding:0 11px!important;gap:10px!important}
  .sf-connect-row>.ico{font-size:26px!important;color:#00d9ff!important}
  .sf-connect-copy b{font-size:14px!important}.sf-connect-copy small{font-size:10px!important;color:#c4d1d5!important}
  .sf-connect-btn{height:43px!important;border:1.7px solid #00d9ff!important;border-radius:13px!important;background:transparent!important;color:#00d9ff!important;padding:0 10px!important;font-size:12px!important;font-weight:800!important}

  /* Reference header / profile proportions */
  #homeScreen .home-header{height:110px!important;margin-bottom:0!important}
  #homeScreen .logo{font-size:25px!important}
  #homeScreen .user-row{gap:12px!important;margin:4px 0 20px!important}
  #homeScreen .avatar{width:76px!important;height:76px!important;border:3px solid #00d9ff!important}
  #homeScreen .user-name{font-size:27px!important}.user-level{font-size:14px!important}
  #homeScreen .today-plan{padding:20px 18px!important;border-radius:21px!important;border:1.5px solid #007f94!important;background:linear-gradient(145deg,#03171b,#021216)!important}
  #homeScreen .plan-heading{font-size:25px!important}
  #homeScreen .shift-badge{padding:11px 14px!important;font-size:14px!important;border:1.7px solid #00d9ff!important;border-radius:15px!important;background:transparent!important;color:#00d9ff!important}
  #homeScreen .shift-time-row{font-size:16px!important;margin-top:15px!important}
  #homeScreen .plan-stats{margin-top:17px!important;padding-top:15px!important}
  #homeScreen .plan-stat-label{font-size:13px!important}.plan-stat-value{font-size:22px!important}.stat-icon{font-size:27px!important}

  /* Six-tab navigation: compact, but visually weighted like the reference. */
  #homeScreen~.bottom-nav,.bottom-nav{height:52px!important;min-height:52px!important;padding:2px 3px!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;background:rgba(0,12,15,.98)!important;border-top:1px solid #12353a!important;box-shadow:0 -4px 18px rgba(0,0,0,.22)!important}
  .bottom-nav .nav-item{min-width:0!important;width:100%!important;height:46px!important;padding:3px 2px!important;border:0!important;border-radius:9px!important;background:transparent!important;color:#9fb0b5!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;font-size:7.5px!important;line-height:1!important;font-weight:650!important;white-space:nowrap!important}
  .bottom-nav .nav-icon{width:17px!important;height:17px!important;font-size:17px!important;line-height:17px!important;margin:0 0 2px!important}
  .bottom-nav .nav-item.active{color:#00d9ff!important;background:rgba(0,217,255,.055)!important}
  @media(max-width:420px){
    .sf-macro-grid,.sf-stat-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
    .sf-track-head{align-items:flex-start!important}
    .sf-connect-row{min-height:68px!important;height:auto!important}
    .sf-connect-copy small{white-space:normal!important}
  }
  `;
  const style=document.createElement("style");style.id="shiftfit-home-reference-v3";style.textContent=css;document.head.appendChild(style);

  function home(){return document.querySelector("#homeScreen")||document.querySelector(".screen.active")}
  function findText(root,text){return [...root.querySelectorAll("h1,h2,h3,h4,.section-title,.title,.plan-heading")].find(e=>(e.textContent||"").toLowerCase().includes(text))}
  function steps(){try{if(window.shiftfitActivity&&typeof window.shiftfitActivity.getSteps==="function")return Number(window.shiftfitActivity.getSteps())||0;const raw=localStorage.getItem("shiftfit_steps_v1");return raw?Number(JSON.parse(raw).steps)||0:0}catch(e){return 0}}
  function invoke(label){const h=home();if(!h)return;const hit=[...h.querySelectorAll("button,[role=button],a")].find(b=>(b.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes(label));if(hit)hit.click()}
  function targetValues(h){
    const card=h.querySelector(".today-plan");
    const vals={cal:"2,973",protein:"184g",carbs:"373g",fat:"83g"};
    if(card){const txt=card.textContent||"";const m=txt.match(/([\d,]+)\s*(?:cal|calories)/i);if(m)vals.cal=m[1];}
    return vals;
  }
  function inject(){
    const h=home();if(!h||document.getElementById("sf-home-enhancements"))return;
    const plan=findText(h,"today's plan");if(!plan)return;
    const card=plan.closest(".today-plan,.card,.panel,section,article");if(!card)return;
    const v=targetValues(h);
    const wrap=document.createElement("div");wrap.id="sf-home-enhancements";wrap.className="sf-home-enhancements";
    wrap.innerHTML=`<section class="sf-track-day" id="sf-track-day"><div class="sf-track-head"><div><div class="sf-track-kicker">TODAY'S PLAN</div><div class="sf-track-title">Track your day</div></div><div class="sf-water-pill">💧 <span id="sf-water-count">0 / 8</span><button type="button" id="sf-water-add">+</button></div></div><div class="sf-macro-grid"><div class="sf-macro"><b>CALORIES</b><strong>${v.cal}</strong><small>remaining</small></div><div class="sf-macro"><b>PROTEIN</b><strong>${v.protein}</strong><small>remaining</small></div><div class="sf-macro"><b>CARBS</b><strong>${v.carbs}</strong><small>remaining</small></div><div class="sf-macro"><b>FAT</b><strong>${v.fat}</strong><small>remaining</small></div></div><div class="sf-nutrition"><span>Today's nutrition</span><b>0%</b></div><div class="sf-nutrition-bar"><span></span></div></section><div class="sf-home-actions"><button class="sf-home-action" data-go="meal"><span class="ico">🍴</span><span>Log Meal</span><span class="plus">+</span></button><button class="sf-home-action" data-go="workout"><span class="ico">♎</span><span>Log Workout</span><span class="plus">+</span></button><button class="sf-home-action" data-go="steps"><span class="ico">👟</span><span>Log Steps</span><span class="plus">+</span></button><button class="sf-home-action" data-go="water"><span class="ico">💧</span><span>Log Water</span><span class="plus">+</span></button></div><section class="sf-quick-stats"><div class="sf-quick-head"><h3>Quick Stats</h3><button class="sf-view-all" type="button">View All ›</button></div><div class="sf-stat-grid"><div class="sf-mini-stat"><span class="ico">👟</span><strong id="sf-q-steps">0</strong><small>Steps</small></div><div class="sf-mini-stat"><span class="ico">↔️</span><strong id="sf-q-distance">0.0 km</strong><small>Distance</small></div><div class="sf-mini-stat"><span class="ico">⏱️</span><strong id="sf-q-active">0 min</strong><small>Active Time</small></div><div class="sf-mini-stat"><span class="ico">🔥</span><strong id="sf-q-cal">0</strong><small>Active Calories</small></div></div><div class="sf-connect-row"><span class="ico">⌚</span><div class="sf-connect-copy"><b>Connect &amp; Sync</b><small>Strava, Garmin, Apple Health &amp; more</small></div><button class="sf-connect-btn" type="button" id="sf-connect-open">🔗 CONNECT</button></div></section>`;
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
  function update(){const s=steps();const a=document.getElementById("sf-q-steps");if(a)a.textContent=s.toLocaleString("en-GB");const d=document.getElementById("sf-q-distance");if(d)d.textContent=(s*.00072).toFixed(1)+" km";const t=document.getElementById("sf-q-active");if(t)t.textContent=Math.round(s/105)+" min";const c=document.getElementById("sf-q-cal");if(c)c.textContent=Math.round(s*.04)}
  function boot(){inject();setTimeout(inject,400);setTimeout(inject,1000);setTimeout(inject,1800);setInterval(update,1000)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
