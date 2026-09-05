/* ShiftFit Data & Privacy */
(function(){
  "use strict";
  const CARD="shiftfit-data-privacy-card";
  const MODAL="shiftfit-data-privacy-modal";

  function store(){ return window.shiftfitStorage || null; }
  function statusText(){
    const s=store(); if(!s) return "Storage is loading…";
    const st=s.status();
    return "Saved locally · Storage v"+st.version+" · "+st.fields.length+" data areas";
  }
  function exportData(){
    const s=store(); if(!s){alert("Storage is not ready yet.");return;}
    const blob=new Blob([s.exportData()],{type:"application/json"});
    const url=URL.createObjectURL(blob), a=document.createElement("a");
    a.href=url; a.download="shiftfit-data-backup.json"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  function importData(){
    const s=store(); if(!s){alert("Storage is not ready yet.");return;}
    const input=document.createElement("input"); input.type="file"; input.accept=".json,application/json";
    input.onchange=function(){
      const file=input.files&&input.files[0]; if(!file)return;
      const reader=new FileReader();
      reader.onload=function(){try{s.importData(String(reader.result||""));alert("Data imported. ShiftFit will reload.");location.reload();}catch(e){alert("That file is not a valid ShiftFit backup.");}};
      reader.readAsText(file);
    }; input.click();
  }
  function resetData(){
    const s=store(); if(!s)return;
    if(!confirm("Reset your saved ShiftFit data on this device? Export a backup first if you may need it."))return;
    const snap=s.snapshot(); Object.keys(snap.data||{}).forEach(function(k){s.remove(k);});
    alert("ShiftFit data reset. The app will reload."); location.reload();
  }
  function open(){
    const m=document.getElementById(MODAL); if(!m)return;
    const st=m.querySelector("[data-status]"); if(st)st.textContent=statusText(); m.classList.add("open");
  }
  function close(){const m=document.getElementById(MODAL);if(m)m.classList.remove("open");}
  function styles(){
    if(document.getElementById("shiftfit-dp-style"))return;
    const s=document.createElement("style");s.id="shiftfit-dp-style";s.textContent=`
      #${CARD}{margin:18px 0 24px;padding:18px;border:1px solid #303a60;border-radius:20px;background:linear-gradient(145deg,#151b31,#0c1122)}
      #${CARD} .dphead{display:flex;gap:12px;align-items:center} #${CARD} .dpicon{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:rgba(139,92,246,.13);font-size:22px}
      #${CARD} h3{margin:0;font-size:17px} #${CARD} p{margin:4px 0 0;color:#aab1c5;font-size:11px} #${CARD} .dpstatus{margin-top:14px;padding:10px;border-radius:11px;background:rgba(53,223,141,.07);color:#b9f5d8;font-size:11px;font-weight:800}
      #${CARD} .dpactions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:12px} #${CARD} button{padding:12px;border-radius:12px;border:1px solid #303a60;background:#0d1326;color:#fff;font-weight:900} #${CARD} .danger{grid-column:1/-1;color:#ff9baa}
      #${MODAL}{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.72);padding:16px} #${MODAL}.open{display:flex}
      #${MODAL} .box{width:min(560px,100%);border:1px solid #303a60;border-radius:22px;background:#0b1020;padding:20px} #${MODAL} .top{display:flex;justify-content:space-between;align-items:center} #${MODAL} h2{margin:0;font-size:20px} #${MODAL} .close{width:38px;padding:8px;border-radius:12px;border:1px solid #303a60;background:#11162b;color:#fff;font-size:18px}
      #${MODAL} .detail{margin-top:14px;padding:13px;border-radius:13px;background:rgba(255,255,255,.035)} #${MODAL} .detail strong{display:block;font-size:12px;margin-bottom:5px} #${MODAL} .detail span{color:#aab1c5;font-size:11px;line-height:1.5} #${MODAL} .actions{display:grid;gap:9px;margin-top:15px} #${MODAL} .actions button{padding:13px;border-radius:12px;border:1px solid #303a60;background:#11162b;color:#fff;font-weight:900} #${MODAL} .actions .primary{background:linear-gradient(135deg,#7c3aed,#5123c5)} #${MODAL} .actions .danger{color:#ff9baa}
    `;document.head.appendChild(s);
  }
  function modal(){
    if(document.getElementById(MODAL))return;
    const m=document.createElement("div");m.id=MODAL;m.innerHTML=`<div class="box"><div class="top"><h2>Data & Privacy</h2><button class="close">×</button></div><div class="detail"><strong>Your ShiftFit data</strong><span>Your profile, goals, meal plans, preferences, progress, shopping data and AI Coach history are stored locally on this device. Cloud sync/auth is not enabled yet.</span></div><div class="detail"><strong>Storage status</strong><span data-status>${statusText()}</span></div><div class="actions"><button class="primary" data-export>📦 Export My Data</button><button data-import>📥 Import Data</button><button class="danger" data-reset>🔄 Reset ShiftFit Data</button></div></div>`;
    document.body.appendChild(m);m.querySelector(".close").onclick=close;m.onclick=function(e){if(e.target===m)close();};m.querySelector("[data-export]").onclick=exportData;m.querySelector("[data-import]").onclick=importData;m.querySelector("[data-reset]").onclick=resetData;
  }
  function findProfile(){
    const els=[...document.querySelectorAll("section,main,div")];
    return els.find(function(el){return el.id&&/profile|account|settings/i.test(el.id)&&getComputedStyle(el).display!=="none"&&el.children.length>1;})||null;
  }
  function inject(){
    const p=findProfile();if(!p||document.getElementById(CARD))return;
    const el=document.createElement("section");el.id=CARD;el.innerHTML=`<div class="dphead"><div class="dpicon">🔐</div><div><h3>Data & Privacy</h3><p>Manage your saved ShiftFit data on this device.</p></div></div><div class="dpstatus">${statusText()}</div><div class="dpactions"><button class="primary" data-open>Manage Data</button><button data-export>Export Backup</button><button class="danger" data-reset>Reset ShiftFit Data</button></div>`;
    el.querySelector("[data-open]").onclick=open;el.querySelector("[data-export]").onclick=exportData;el.querySelector("[data-reset]").onclick=resetData;p.appendChild(el);
  }
  function boot(){styles();modal();window.shiftfitOpenDataPrivacy=open;inject();new MutationObserver(inject).observe(document.body,{subtree:true,childList:true});[500,1200,2500].forEach(function(t){setTimeout(inject,t);});}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
