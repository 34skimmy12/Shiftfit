/* ShiftFit App Settings — surgical settings-tab enhancement. */
(function(){
  "use strict";
  if(window.__shiftFitAppSettingsLoaded)return;
  window.__shiftFitAppSettingsLoaded=true;
  const MODAL="shiftfit-settings-split-modal";
  const STORE="shiftfitSettings";
  function raw(){try{return JSON.parse(localStorage.getItem(STORE)||"{}")}catch(_){return {}}}
  function save(v){try{localStorage.setItem(STORE,JSON.stringify(v));window.dispatchEvent(new CustomEvent("shiftfitSettingsChanged",{detail:v}));}catch(_){} }
  function open(){
    const m=document.getElementById(MODAL);if(!m)return;
    const v=Object.assign({units:"metric",weekStarts:"monday"},raw());
    m.innerHTML=`<div class="sheet"><div class="top"><button class="back" type="button">‹</button><div class="logo"><span class="bolt">⚡</span><span>SHIFT</span><span class="fit">FIT</span></div><div></div></div><div class="backrow"><h1>App settings</h1></div><div class="subtitle">Set the basic preferences used across ShiftFit.</div><div class="group"><label class="label">Units</label><select class="field" data-app-units><option value="metric">Metric (kg, cm)</option><option value="imperial">Imperial (lb, ft/in)</option></select><label class="label">Week starts on</label><select class="field" data-app-week><option value="monday">Monday</option><option value="sunday">Sunday</option></select><button class="save" type="button" data-app-save>Save app settings</button><div class="note">Your unit preference is saved for ShiftFit screens that support metric or imperial values. Your week-start preference is saved for weekly views.</div></div></div>`;
    m.classList.add("open");
    m.querySelector("[data-app-units]").value=v.units;
    m.querySelector("[data-app-week]").value=v.weekStarts;
    m.querySelector(".back").onclick=()=>window.shiftfitSettings&&window.shiftfitSettings.open();
    m.querySelector("[data-app-save]").onclick=()=>{const n=Object.assign(v,{units:m.querySelector("[data-app-units]").value,weekStarts:m.querySelector("[data-app-week]").value});save(n);if(window.shiftfitSettings)window.shiftfitSettings.open();setTimeout(()=>{const t=document.createElement("div");t.className="toast";t.textContent="App settings saved";document.body.appendChild(t);setTimeout(()=>t.remove(),2200)},0);};
  }
  document.addEventListener("click",function(e){const b=e.target&&e.target.closest?e.target.closest('#shiftfit-settings-split-modal [data-page="app"]'):null;if(!b)return;e.preventDefault();e.stopImmediatePropagation();open();},true);
})();
