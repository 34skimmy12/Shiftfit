/* ShiftFit Home v1 — exact black/cyan home treatment + real in-page step counter. */
(function(){
  "use strict";
  const KEY="shiftfit_steps_v1";
  const today=()=>new Date().toISOString().slice(0,10);
  function loadSteps(){
    try{const v=JSON.parse(localStorage.getItem(KEY)||"null");return v&&v.date===today()?Number(v.steps)||0:0}catch(e){return 0}
  }
  function saveSteps(n){try{localStorage.setItem(KEY,JSON.stringify({date:today(),steps:n}))}catch(e){}}
  let steps=loadSteps(), lastStepAt=0, lastMag=0, tracking=false;
  const style=document.createElement("style");
  style.id="shiftfit-home-polish-css";
  style.textContent=`
  .sf-step-button{margin-left:auto;min-width:190px;height:76px;padding:10px 14px;border:1px solid #63d7f1;border-radius:20px;background:linear-gradient(145deg,rgba(16,62,72,.72),rgba(8,24,29,.92));color:#fff;display:flex;align-items:center;gap:12px;text-align:left;box-shadow:0 0 22px rgba(99,215,241,.10);font-family:Arial,Helvetica,sans-serif}
  .sf-step-icon{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(0,194,230,.12);font-size:24px;flex:none}
  .sf-step-number{font-size:23px;font-weight:900;line-height:1}.sf-step-label{font-size:13px;color:#a7d8e4;margin-top:4px}.sf-step-arrow{margin-left:auto;color:#63d7f1;font-size:30px}
  .sf-step-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.78);display:none;align-items:flex-end;justify-content:center;padding:18px}.sf-step-overlay.open{display:flex}
  .sf-step-sheet{width:min(520px,100%);max-height:88vh;overflow:auto;border:1px solid #176d7d;border-radius:28px;background:linear-gradient(145deg,#151b1d,#090c0d);box-shadow:0 24px 70px rgba(0,0,0,.65);padding:24px;color:#f7f8fa;font-family:Arial,Helvetica,sans-serif}
  .sf-step-head{display:flex;justify-content:space-between;align-items:center}.sf-step-head h2{margin:0;font-size:27px}.sf-step-close{border:1px solid #303030;background:#171717;color:#fff;border-radius:12px;width:42px;height:42px;font-size:24px}
  .sf-step-hero{margin:18px 0;padding:22px;border:1px solid #145b69;border-radius:22px;background:radial-gradient(circle at 50% 0,rgba(99,215,241,.16),transparent 60%),#101617;text-align:center}.sf-step-hero strong{display:block;font-size:48px}.sf-step-hero span{color:#a7adb5}
  .sf-step-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.sf-step-actions button{min-height:52px;border-radius:14px;border:1px solid #2f4b52;background:#151b1d;color:#fff;font-weight:800}.sf-step-actions .sf-primary{background:linear-gradient(135deg,#63d7f1,#2e8ed1);color:#061016;border-color:transparent}
  .sf-sync-card{margin-top:18px;padding:18px;border:1px solid #303030;border-radius:20px;background:#151515}.sf-sync-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid #292929}.sf-sync-row:last-child{border-bottom:0}.sf-sync-name{font-weight:800}.sf-sync-sub{font-size:12px;color:#a7adb5;margin-top:3px}.sf-sync-btn{border:1px solid #63d7f1!important;background:transparent!important;color:#63d7f1!important;border-radius:11px;padding:9px 13px;font-weight:800}
  .user-row{gap:13px}.user-row .sf-step-button{flex:0 0 auto}.sf-step-button *{pointer-events:none}
  @media(max-width:600px){.sf-step-button{min-width:0;width:172px;height:68px;padding:8px 10px;border-radius:18px}.sf-step-icon{width:36px;height:36px;font-size:21px}.sf-step-number{font-size:20px}.sf-step-label{font-size:11px}.sf-step-arrow{font-size:25px}.user-row{align-items:center}}
  /* Final brand pass: replace legacy purple accents everywhere, including inline styles. */
  button,[role="button"]{font-family:Arial,Helvetica,sans-serif}
  [style*="#6d28d9"],[style*="#8b5cf6"],[style*="#a78bfa"],[style*="#7c3aed"],[style*="#4f46e5"],[style*="#854cff"],[style*="#8656ff"],[style*="rgb(109, 40, 217)"],[style*="rgb(139, 92, 246)"]{background:linear-gradient(135deg,#63d7f1,#2e8ed1)!important;color:#061016!important;border-color:transparent!important}
  [style*="purple"],[style*="violet"]{color:#63d7f1!important;border-color:#63d7f1!important}
  .bottom-nav,.nav-bar,.tab-bar{background:rgba(7,12,15,.96)!important;border-color:#26363b!important}
  .bottom-nav .active,.nav-bar .active,.tab-bar .active{color:#63d7f1!important}
  `;
  document.head.appendChild(style);

  function format(n){return Number(n||0).toLocaleString("en-GB")}
  function update(){document.querySelectorAll("[data-sf-step-value]").forEach(el=>el.textContent=format(steps));}
  function injectButton(){
    const row=document.querySelector(".user-row"); if(!row || row.querySelector(".sf-step-button")) return false;
    const b=document.createElement("button"); b.className="sf-step-button"; b.type="button"; b.innerHTML='<span class="sf-step-icon">👟</span><span><span class="sf-step-number" data-sf-step-value>'+format(steps)+'</span><span class="sf-step-label">steps today</span></span><span class="sf-step-arrow">›</span>';
    b.addEventListener("click",openSheet); row.appendChild(b); return true;
  }
  function openSheet(){
    let ov=document.getElementById("sf-step-overlay");
    if(!ov){
      ov=document.createElement("div"); ov.id="sf-step-overlay"; ov.className="sf-step-overlay";
      ov.innerHTML='<div class="sf-step-sheet"><div class="sf-step-head"><h2>Steps & Activity</h2><button class="sf-step-close" type="button">×</button></div><div class="sf-step-hero"><strong data-sf-step-value>'+format(steps)+'</strong><span>steps today</span></div><div class="sf-step-actions"><button class="sf-primary" id="sf-start-steps">Start Stepometer</button><button id="sf-reset-steps">Reset Today</button></div><div class="sf-sync-card"><h3 style="margin:0 0 6px">Connect & Sync</h3><div class="sf-sync-row"><div><div class="sf-sync-name">Strava</div><div class="sf-sync-sub">Activities & workouts</div></div><button class="sf-sync-btn" data-sync="Strava">Connect</button></div><div class="sf-sync-row"><div><div class="sf-sync-name">Garmin</div><div class="sf-sync-sub">Steps, activities & workouts</div></div><button class="sf-sync-btn" data-sync="Garmin">Connect</button></div><div class="sf-sync-row"><div><div class="sf-sync-name">Apple Health</div><div class="sf-sync-sub">Health & activity data</div></div><button class="sf-sync-btn" data-sync="Apple Health">Connect</button></div></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener("click",e=>{if(e.target===ov)ov.classList.remove("open")});
      ov.querySelector(".sf-step-close").onclick=()=>ov.classList.remove("open");
      ov.querySelector("#sf-reset-steps").onclick=()=>{steps=0;saveSteps(steps);update()};
      ov.querySelector("#sf-start-steps").onclick=toggleTracking;
      ov.querySelectorAll("[data-sync]").forEach(btn=>btn.onclick=()=>alert(btn.dataset.sync+" connection is ready for OAuth setup. We will never fake a sync."));
    }
    update(); ov.classList.add("open");
  }
  function magnitude(e){const a=e.accelerationIncludingGravity||e.acceleration;if(!a)return 0;return Math.sqrt((a.x||0)**2+(a.y||0)**2+(a.z||0)**2)}
  function onMotion(e){
    const m=magnitude(e), now=Date.now();
    if(!m)return;
    const delta=Math.abs(m-lastMag); lastMag=m;
    if(delta>2.2 && m>11 && now-lastStepAt>350){steps++;lastStepAt=now;saveSteps(steps);update()}
  }
  async function toggleTracking(){
    const btn=document.getElementById("sf-start-steps");
    if(tracking){window.removeEventListener("devicemotion",onMotion);tracking=false;if(btn)btn.textContent="Start Stepometer";return}
    try{
      if(typeof DeviceMotionEvent!=="undefined" && typeof DeviceMotionEvent.requestPermission==="function"){
        const p=await DeviceMotionEvent.requestPermission(); if(p!=="granted")throw new Error("Motion permission denied");
      }
      if(typeof DeviceMotionEvent==="undefined")throw new Error("Motion sensors are not available in this browser");
      window.addEventListener("devicemotion",onMotion);tracking=true;if(btn)btn.textContent="Stop Stepometer";
    }catch(err){alert("Stepometer needs motion permission. Open ShiftFit in Safari on your iPhone and allow Motion & Fitness access.")}
  }
  function boot(){injectButton();update();setTimeout(injectButton,500);setTimeout(injectButton,1500)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
