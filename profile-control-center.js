/* ShiftFit Profile Control Centre v1 — dedicated editors instead of routing Profile tabs to Plan Builder. */
(function(){
  "use strict";
  const PROFILE="shiftfit-profile-entry-modal";
  const EDITOR="shiftfit-profile-editor-modal";

  function raw(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch(_){return fallback;}}
  function put(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch(_){return false;}}
  function closeProfile(){const m=document.getElementById(PROFILE);if(m)m.classList.remove("open");}
  function closeEditor(){const m=document.getElementById(EDITOR);if(m)m.classList.remove("open");}
  function profile(){return raw("shiftfitProfile",{})||{};}
  function plan(){return raw("shiftfitPlan",{})||{};}
  function saveProfile(p){put("shiftfitProfile",p);try{if(window.shiftfitStorage&&typeof window.shiftfitStorage.save==="function")window.shiftfitStorage.save("profile",p);}catch(_){} }
  function savePlan(p){put("shiftfitPlan",p);try{if(window.shiftfitStorage&&typeof window.shiftfitStorage.save==="function")window.shiftfitStorage.save("plan",p);}catch(_){} }
  function value(o,keys,fallback){for(const k of keys){if(o&&o[k]!==undefined&&o[k]!==null&&o[k]!=="")return o[k];}return fallback;}
  function esc(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");}
  function findButton(text){return Array.from(document.querySelectorAll("button,a")).find(function(b){return String(b.textContent||"").trim().toLowerCase().includes(text.toLowerCase());});}
  function regenerate(){
    const b=findButton("save & generate my plan")||findButton("generate my plan");
    if(b){try{b.click();return true;}catch(_){} }
    if(typeof window.showPlanBuilder==="function")window.showPlanBuilder();
    return false;
  }

  function styles(){
    if(document.getElementById("shiftfit-profile-control-style"))return;
    const s=document.createElement("style");s.id="shiftfit-profile-control-style";s.textContent=`
      #${EDITOR}{position:fixed;inset:0;z-index:100000;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.78)}
      #${EDITOR}.open{display:flex}
      #${EDITOR} .pcs{width:min(500px,100%);height:100dvh;overflow:auto;background:linear-gradient(180deg,#08091a,#050711);padding:24px 18px calc(110px + env(safe-area-inset-bottom));box-sizing:border-box}
      #${EDITOR} .pctop{display:grid;grid-template-columns:48px 1fr 48px;align-items:center;gap:8px;margin-bottom:18px}
      #${EDITOR} .pcback{width:48px;height:48px;border-radius:50%;border:1px solid #303a60;background:#14182b;color:#fff;font-size:30px}
      #${EDITOR} .pclogo{text-align:center;font-size:25px;font-weight:1000;font-style:italic;letter-spacing:-2px}.pclogo .bolt{color:#ff9d22}.pclogo .shift{color:#f5f5f7}.pclogo .fit{color:#8656ff}
      #${EDITOR} h1{margin:0 4px;font-size:31px;letter-spacing:-1px}.pcsub{margin:5px 4px 20px;color:#aab1c5;font-size:14px;line-height:1.45}
      #${EDITOR} .pcgroup{padding:16px;margin:12px 0;border:1px solid #293253;border-radius:21px;background:linear-gradient(145deg,#11182d,#0b1020)}
      #${EDITOR} .pclabel{display:block;margin:0 0 7px;color:#bfc6da;font-size:12px;font-weight:800}#${EDITOR} .pcfield{width:100%;padding:14px;border:1px solid #354267;border-radius:13px;background:#0b1021;color:#fff;font-size:15px;outline:none}#${EDITOR} .pcfield:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.15)}
      #${EDITOR} .pcrow{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pcrow3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
      #${EDITOR} .pcsave{width:100%;margin-top:14px;padding:16px;border:0;border-radius:15px;background:linear-gradient(135deg,#8b3cff,#5123c5);color:#fff;font-size:14px;font-weight:950}
      #${EDITOR} .pcsecondary{width:100%;margin-top:9px;padding:13px;border:1px solid #39466f;border-radius:14px;background:#11182d;color:#d7d1ff;font-weight:850}
      #${EDITOR} .pcnote{margin-top:10px;color:#7f879c;font-size:11px;line-height:1.45}.pccheck{display:flex;align-items:center;gap:9px;color:#dce0ec;font-size:13px;margin-top:11px}.pccheck input{width:18px;height:18px}
      #${EDITOR} .pcstat{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.pcstatbox{padding:14px;border-radius:15px;border:1px solid #293253;background:#0d1326}.pcstatbox strong{display:block;font-size:21px}.pcstatbox span{display:block;margin-top:4px;color:#929bb1;font-size:10px}
      @media(max-width:390px){#${EDITOR} .pcs{padding-left:14px;padding-right:14px}#${EDITOR} h1{font-size:29px}}
    `;document.head.appendChild(s);
  }

  function shell(title,sub,body){
    let m=document.getElementById(EDITOR);
    if(!m){m=document.createElement("div");m.id=EDITOR;document.body.appendChild(m);}
    m.innerHTML=`<div class="pcs" role="dialog" aria-label="${esc(title)}"><div class="pctop"><button class="pcback" type="button">‹</button><div class="pclogo"><span class="bolt">⚡</span><span class="shift">SHIFT</span><span class="fit">FIT</span></div><div></div></div><h1>${esc(title)}</h1><div class="pcsub">${sub}</div>${body}</div>`;
    m.classList.add("open");m.querySelector(".pcback").onclick=closeEditor;m.onclick=function(e){if(e.target===m)closeEditor();};
    return m;
  }

  function openPersonal(){
    closeProfile();const p=profile();const wh=raw("shiftfitWeightHistory",[]);const last=Array.isArray(wh)&&wh.length?wh[wh.length-1]:null;
    const m=shell("Personal details","Keep the details ShiftFit uses to personalise your targets and plan.",`
      <div class="pcgroup"><label class="pclabel">Name</label><input class="pcfield" data-f="name" value="${esc(value(p,["name","fullName","firstName"],""))}" autocomplete="name"></div>
      <div class="pcgroup"><div class="pcrow"><div><label class="pclabel">Age</label><input class="pcfield" data-f="age" type="number" min="13" max="100" value="${esc(value(p,["age"],""))}"></div><div><label class="pclabel">Sex</label><select class="pcfield" data-f="sex"><option value="">Prefer not to say</option><option value="male">Male</option><option value="female">Female</option></select></div></div></div>
      <div class="pcgroup"><div class="pcrow"><div><label class="pclabel">Height (cm)</label><input class="pcfield" data-f="height" type="number" min="100" max="250" value="${esc(value(p,["height","heightCm"],""))}"></div><div><label class="pclabel">Current weight (kg)</label><input class="pcfield" data-f="weight" type="number" step="0.1" min="30" max="300" value="${esc(value(p,["weight","currentWeight"],last&&last.weight||""))}"></div></div></div>
      <button class="pcsave" type="button" data-save>Save personal details</button>
      <div class="pcnote">Your weight is also added to your weight history when you save a new value, so Progression can track the change.</div>`);
    const sex=value(p,["sex","gender"],"");const sel=m.querySelector('[data-f="sex"]');if(sel)sel.value=sex;
    m.querySelector("[data-save]").onclick=function(){
      const q=profile();q.name=m.querySelector('[data-f="name"]').value.trim();q.fullName=q.name;
      q.age=Number(m.querySelector('[data-f="age"]').value)||q.age||"";q.sex=m.querySelector('[data-f="sex"]').value||q.sex||"";q.height=Number(m.querySelector('[data-f="height"]').value)||q.height||"";q.weight=Number(m.querySelector('[data-f="weight"]').value)||q.weight||"";q.currentWeight=q.weight;saveProfile(q);
      const w=Number(q.weight);if(Number.isFinite(w)&&w>0){let h=raw("shiftfitWeightHistory",[]);if(!Array.isArray(h))h=[];const d=new Date();const date=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");const ix=h.findIndex(x=>x&&x.date===date);if(ix>=0)h[ix].weight=w;else h.push({date,weight:w});put("shiftfitWeightHistory",h);}
      closeEditor();try{if(typeof window.shiftfitRenderProfileData==="function")window.shiftfitRenderProfileData();}catch(_){};
    };
  }

  function openGoal(){
    closeProfile();const p=profile(),pl=plan();const goal=String(value(p,["goal","fitnessGoal","targetGoal"],value(pl,["goal","fitnessGoal","targetGoal"],"maintain"))).toLowerCase();
    const m=shell("Goal & nutrition","Set the goal and daily targets ShiftFit should use when generating your 7-day plan.",`
      <div class="pcgroup"><label class="pclabel">Primary goal</label><select class="pcfield" data-f="goal"><option value="lose">Lose weight</option><option value="maintain">Maintain weight</option><option value="build">Build muscle</option></select></div>
      <div class="pcgroup"><div class="pcrow"><div><label class="pclabel">Calories / day</label><input class="pcfield" data-f="calories" type="number" min="1000" max="6000" value="${esc(value(pl,["calories","targetCalories","dailyCalories"],""))}"></div><div><label class="pclabel">Protein (g)</label><input class="pcfield" data-f="protein" type="number" min="40" max="400" value="${esc(value(pl,["protein","targetProtein","proteinGrams"],""))}"></div></div></div>
      <div class="pcgroup"><div class="pcrow3"><div><label class="pclabel">Carbs (g)</label><input class="pcfield" data-f="carbs" type="number" min="0" max="800" value="${esc(value(pl,["carbs","targetCarbs","carbsGrams"],""))}"></div><div><label class="pclabel">Fat (g)</label><input class="pcfield" data-f="fat" type="number" min="0" max="250" value="${esc(value(pl,["fat","targetFat","fatGrams"],""))}"></div><div><label class="pclabel">Target weight</label><input class="pcfield" data-f="targetWeight" type="number" step="0.1" min="30" max="300" value="${esc(value(p,["targetWeight","goalWeight"],value(pl,["targetWeight","goalWeight"],"")))}"></div></div></div>
      <button class="pcsave" type="button" data-save>Save & generate my plan</button>
      <div class="pcnote">Saving keeps your personalised targets and triggers the existing ShiftFit plan generator so the Monday–Sunday meals can be rebuilt around them.</div>`);
    m.querySelector('[data-f="goal"]').value=goal;
    m.querySelector("[data-save]").onclick=function(){
      const q=profile(),n=plan();const g=m.querySelector('[data-f="goal"]').value;q.goal=g;q.fitnessGoal=g;q.targetWeight=Number(m.querySelector('[data-f="targetWeight"]').value)||q.targetWeight||"";n.goal=g;n.fitnessGoal=g;
      ["calories","protein","carbs","fat"].forEach(function(k){const v=Number(m.querySelector('[data-f="'+k+'"]').value);if(Number.isFinite(v)&&v>0){n[k]=v;n["target"+k.charAt(0).toUpperCase()+k.slice(1)]=v;}});n.targetWeight=q.targetWeight;saveProfile(q);savePlan(n);closeEditor();try{if(typeof window.shiftfitRenderProfileData==="function")window.shiftfitRenderProfileData();}catch(_){};setTimeout(regenerate,80);
    };
  }

  function openShift(){
    closeProfile();const p=profile();const shift=value(p,["shift","shiftType","schedule","workPattern"],raw("selectedShift","")||"day");const start=raw("customShiftStart","");const end=raw("customShiftEnd","");const overnight=!!raw("customShiftOvernight",false);
    const m=shell("Shift schedule","Tell ShiftFit when you work so your plan and daily routine can match your shift pattern.",`
      <div class="pcgroup"><label class="pclabel">Shift pattern</label><select class="pcfield" data-f="shift"><option value="day">Day shift</option><option value="night">Night shift</option><option value="rotating">Rotating shifts</option><option value="custom">Custom</option></select></div>
      <div class="pcgroup"><div class="pcrow"><div><label class="pclabel">Start time</label><input class="pcfield" data-f="start" type="time" value="${esc(start)}"></div><div><label class="pclabel">End time</label><input class="pcfield" data-f="end" type="time" value="${esc(end)}"></div></div><label class="pccheck"><input type="checkbox" data-f="overnight" ${overnight?"checked":""}> Shift finishes the following day</label></div>
      <button class="pcsave" type="button" data-save>Save shift schedule</button>
      <div class="pcnote">Your shift settings are saved to the same local keys used by the existing ShiftFit setup, so the rest of the app stays in sync.</div>`);
    const sel=m.querySelector('[data-f="shift"]');sel.value=String(shift).toLowerCase();if(!sel.value)sel.value="custom";
    m.querySelector("[data-save]").onclick=function(){const q=profile(),v=m.querySelector('[data-f="shift"]').value;q.shift=v;q.shiftType=v;q.schedule=v;saveProfile(q);put("selectedShift",v);put("customShiftStart",m.querySelector('[data-f="start"]').value);put("customShiftEnd",m.querySelector('[data-f="end"]').value);put("customShiftOvernight",m.querySelector('[data-f="overnight"]').checked);closeEditor();try{if(typeof window.shiftfitRenderProfileData==="function")window.shiftfitRenderProfileData();}catch(_){};};
  }

  function openProgression(){
    closeProfile();const p=profile(),wh=raw("shiftfitWeightHistory",[]);const daily=raw("shiftfitDailyProgressHistory",{})||{};const dates=Object.keys(daily);const workouts=dates.filter(d=>daily[d]&&(daily[d].workout===true||Number(daily[d].exercisesDone)>0)).length;const weights=Array.isArray(wh)?wh.filter(x=>x&&Number(x.weight)>0):[];const first=weights.length?Number(weights[0].weight):null,last=weights.length?Number(weights[weights.length-1].weight):null;const change=first!==null&&last!==null?last-first:null;
    const m=shell("Progression","A quick view of the numbers ShiftFit is tracking for you. Tap the full Progress screen for charts and history.",`<div class="pcgroup"><div class="pcstat"><div class="pcstatbox"><strong>${workouts}</strong><span>Workout days</span></div><div class="pcstatbox"><strong>${dates.length}</strong><span>Tracked days</span></div><div class="pcstatbox"><strong>${last===null?"—":last.toFixed(1)+" kg"}</strong><span>Latest weight</span></div><div class="pcstatbox"><strong>${change===null?"—":(change>0?"+":"")+change.toFixed(1)+" kg"}</strong><span>Weight change</span></div></div></div><button class="pcsave" type="button" data-open>Open full Progression</button><button class="pcsecondary" type="button" data-history>View History</button>`);
    m.querySelector("[data-open]").onclick=function(){closeEditor();if(typeof window.showProgressInsights==="function")window.showProgressInsights();};
    m.querySelector("[data-history]").onclick=function(){closeEditor();if(typeof window.hideAllScreens==="function")window.hideAllScreens();const s=document.getElementById("setupScreen");if(s)s.classList.add("active");if(typeof window.setNav==="function")window.setNav("");if(typeof window.showMyHistory==="function")window.showMyHistory();};
  }

  function route(btn){const key=String(btn&&btn.dataset&&btn.dataset.profileNav||"").trim().toLowerCase();if(!key)return; if(key==="shift schedule")openShift();else if(key==="goal & nutrition")openGoal();else if(key==="personal details")openPersonal();else if(key==="progression")openProgression();else if(key==="history"){closeProfile();if(typeof window.hideAllScreens==="function")window.hideAllScreens();const s=document.getElementById("setupScreen");if(s)s.classList.add("active");if(typeof window.setNav==="function")window.setNav("");if(typeof window.showMyHistory==="function")window.showMyHistory();}}

  function bind(){
    document.addEventListener("click",function(e){const btn=e.target&&e.target.closest?e.target.closest("#"+PROFILE+" [data-profile-nav]"):null;if(!btn)return;e.preventDefault();e.stopImmediatePropagation();route(btn);},true);
    document.addEventListener("keydown",function(e){if(e.key!=="Escape")return;closeEditor();});
  }
  function boot(){styles();bind();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();