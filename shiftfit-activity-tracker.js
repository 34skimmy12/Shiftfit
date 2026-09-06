/* ShiftFit Activity Tracker — live browser pedometer + activity sync hub. */
(function(){
  "use strict";
  if(window.__shiftfitActivityTracker)return;
  window.__shiftfitActivityTracker=true;

  const DAY_KEY="shiftfitSteps_"+new Date().toISOString().slice(0,10);
  const STATE_KEY="shiftfitActivityState";
  const state=JSON.parse(localStorage.getItem(STATE_KEY)||"{}")||{};
  let steps=Number(localStorage.getItem(DAY_KEY)||0);
  let tracking=false;
  let lastMagnitude=0;
  let lastStepAt=0;

  function save(){localStorage.setItem(DAY_KEY,String(steps));localStorage.setItem(STATE_KEY,JSON.stringify({steps,lastUpdated:Date.now()}));}
  function esc(v){return String(v).replace(/[&<>\"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));}
  function findHome(){return document.querySelector("#homeScreen,.home-screen,.screen.home")||document.querySelector(".screen.active")||document.body;}
  function findTodayPlan(){
    const nodes=[...findHome().querySelectorAll("h1,h2,h3,h4,.section-title,.title")];
    return nodes.find(n=>(n.textContent||"").toLowerCase().includes("today's plan"))||null;
  }
  function icon(name){
    return name==="shoe"?"👟":name==="watch"?"⌚":"🔗";
  }
  function inject(){
    if(document.getElementById("sf-activity-module"))return;
    const host=findHome();
    if(!host)return;
    const wrap=document.createElement("div");
    wrap.id="sf-activity-module";
    wrap.innerHTML=`
      <section class="sf-activity-profile-card" aria-label="Steps and activity tracker">
        <div class="sf-step-main">
          <div class="sf-step-icon">👟</div>
          <div><div class="sf-step-value" id="sf-step-value">${steps.toLocaleString()}</div><div class="sf-step-label">steps today</div></div>
        </div>
        <button class="sf-step-open" id="sf-step-open" type="button" aria-label="Open activity tracker">›</button>
      </section>
      <section class="sf-quick-activity">
        <button type="button" class="sf-activity-action" data-action="steps"><span>👟</span><b>Log Steps</b><strong>+</strong></button>
        <button type="button" class="sf-activity-action" data-action="connect"><span>⌚</span><b>Connect & Sync</b><strong>+</strong></button>
      </section>`;
    const plan=findTodayPlan();
    if(plan){
      const card=plan.closest(".card,.panel,.today-plan,section,article,div");
      (card||plan).parentNode.insertBefore(wrap,(card||plan));
    }else host.prepend(wrap);
    document.getElementById("sf-step-open").onclick=openActivity;
    wrap.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>b.dataset.action==="connect"?openConnect():openActivity());
  }
  function updateUI(){
    const v=document.getElementById("sf-step-value");if(v)v.textContent=steps.toLocaleString();
    document.querySelectorAll("[data-shiftfit-steps]").forEach(e=>e.textContent=steps.toLocaleString());
  }
  function openActivity(){
    if(document.getElementById("sf-activity-modal"))return;
    const modal=document.createElement("div");modal.id="sf-activity-modal";
    modal.innerHTML=`<div class="sf-modal-backdrop" data-close="1"><div class="sf-activity-sheet" role="dialog" aria-modal="true">
      <button class="sf-modal-close" data-close="1">×</button>
      <div class="sf-modal-kicker">SHIFT FIT ACTIVITY</div><h2>Step & Activity Tracker</h2>
      <div class="sf-big-steps"><span>👟</span><b id="sf-modal-steps">${steps.toLocaleString()}</b><small>steps today</small></div>
      <div class="sf-activity-grid"><div><b id="sf-distance">${(steps*0.00072).toFixed(1)} km</b><small>estimated distance</small></div><div><b id="sf-active">${Math.round(steps/105)} min</b><small>active time</small></div><div><b id="sf-calories">${Math.round(steps*0.04)}</b><small>active kcal</small></div></div>
      <button class="sf-track-btn" id="sf-track-btn">${tracking?"STOP LIVE STEP COUNT":"START LIVE STEP COUNT"}</button>
      <p class="sf-modal-help">Uses your phone's motion sensors when this page is open. On iPhone, Safari may ask for Motion & Orientation permission.</p>
      <button class="sf-sync-btn" id="sf-sync-btn">⌚ Connect a watch / service</button>
    </div></div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-close]").forEach(e=>e.onclick=x=>{if(x.target===e||e.classList.contains("sf-modal-close"))modal.remove()});
    modal.querySelector("#sf-track-btn").onclick=toggleTracking;
    modal.querySelector("#sf-sync-btn").onclick=openConnect;
  }
  function refreshModal(){
    const m=document.getElementById("sf-modal-steps");if(m)m.textContent=steps.toLocaleString();
    const d=document.getElementById("sf-distance");if(d)d.textContent=(steps*0.00072).toFixed(1)+" km";
    const a=document.getElementById("sf-active");if(a)a.textContent=Math.round(steps/105)+" min";
    const c=document.getElementById("sf-calories");if(c)c.textContent=Math.round(steps*0.04);
    const b=document.getElementById("sf-track-btn");if(b)b.textContent=tracking?"STOP LIVE STEP COUNT":"START LIVE STEP COUNT";
  }
  async function toggleTracking(){
    if(tracking){stopTracking();return;}
    if(!window.isSecureContext){alert("Live step counting needs a secure HTTPS connection.");return;}
    if(typeof DeviceMotionEvent==="undefined"){alert("This device/browser does not expose motion sensors.");return;}
    try{
      if(typeof DeviceMotionEvent.requestPermission==="function"){
        const permission=await DeviceMotionEvent.requestPermission();
        if(permission!=="granted")throw new Error("Motion permission was not granted.");
      }
      window.addEventListener("devicemotion",onMotion,{passive:true});tracking=true;refreshModal();
    }catch(e){alert("Motion access was not granted. On iPhone, allow Motion & Fitness for Safari and try again.");}
  }
  function stopTracking(){window.removeEventListener("devicemotion",onMotion);tracking=false;refreshModal();save();}
  function onMotion(e){
    const a=e.accelerationIncludingGravity||e.acceleration;if(!a)return;
    const mag=Math.sqrt((a.x||0)**2+(a.y||0)**2+(a.z||0)**2);
    const delta=Math.abs(mag-lastMagnitude);lastMagnitude=mag;
    const now=Date.now();
    if(delta>2.0&&now-lastStepAt>350){steps++;lastStepAt=now;save();updateUI();refreshModal();}
  }
  function openConnect(){
    if(document.getElementById("sf-connect-modal"))return;
    const modal=document.createElement("div");modal.id="sf-connect-modal";
    modal.innerHTML=`<div class="sf-modal-backdrop" data-close="1"><div class="sf-connect-sheet" role="dialog" aria-modal="true">
      <button class="sf-modal-close" data-close="1">×</button><div class="sf-modal-kicker">CONNECTED FITNESS</div><h2>Connect & Sync</h2>
      <p class="sf-modal-help">Bring activity data into ShiftFit from your fitness services. OAuth connections are kept separate from your ShiftFit profile.</p>
      <button class="sf-provider" data-provider="strava"><span>🏃</span><div><b>Strava</b><small>Activities & workouts</small></div><strong>›</strong></button>
      <button class="sf-provider" data-provider="garmin"><span>⌚</span><div><b>Garmin</b><small>Steps, activities & health data</small></div><strong>›</strong></button>
      <button class="sf-provider" data-provider="apple"><span>❤️</span><div><b>Apple Health</b><small>iPhone health data</small></div><strong>›</strong></button>
      <div class="sf-sync-note">Live phone step counting is available now. Strava/Garmin/Apple Health background sync requires their approved APIs and OAuth/native integration; this screen is the connection hub ready for that integration.</div>
    </div></div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-close]").forEach(e=>e.onclick=x=>{if(x.target===e||e.classList.contains("sf-modal-close"))modal.remove()});
    modal.querySelectorAll("[data-provider]").forEach(b=>b.onclick=()=>providerMessage(b.dataset.provider));
  }
  function providerMessage(p){
    const name=p==="strava"?"Strava":p==="garmin"?"Garmin":"Apple Health";
    alert(name+" connection selected. The secure OAuth/native connection will be wired to ShiftFit's backend in the next integration step.");
  }
  function boot(){inject();setTimeout(inject,500);setTimeout(inject,1500);setTimeout(inject,3000);updateUI();}
  window.shiftfitActivity={getSteps:()=>steps,start:toggleTracking,stop:stopTracking,open:openActivity,connect:openConnect};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
