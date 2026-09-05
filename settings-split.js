/* ShiftFit Profile / Settings split */
(function(){
  "use strict";
  const MODAL="shiftfit-settings-split-modal";
  function close(){const m=document.getElementById(MODAL);if(m)m.classList.remove("open");}
  function open(){const m=document.getElementById(MODAL);if(m)m.classList.add("open");}
  function styles(){
    if(document.getElementById("shiftfit-settings-split-style"))return;
    const s=document.createElement("style");s.id="shiftfit-settings-split-style";s.textContent=`
      #${MODAL}{position:fixed;inset:0;z-index:99995;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.72)}
      #${MODAL}.open{display:flex} #${MODAL} .sheet{width:min(500px,100%);max-height:88vh;overflow:auto;border:1px solid #303a60;border-bottom:0;border-radius:28px 28px 0 0;background:linear-gradient(145deg,#11172d,#090d1b);padding:22px 18px 34px}
      #${MODAL} .top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px} #${MODAL} h2{margin:0;font-size:24px} #${MODAL} .close{width:40px;height:40px;border-radius:12px;border:1px solid #303a60;background:#11162b;color:#fff;font-size:22px}
      #${MODAL} .group{margin-top:14px;padding:15px;border:1px solid #293253;border-radius:18px;background:rgba(255,255,255,.025)} #${MODAL} .group h3{margin:0 0 8px;font-size:12px;letter-spacing:1.5px;color:#c5b5ff}
      #${MODAL} .item{width:100%;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid rgba(255,255,255,.06);background:none;color:#fff;text-align:left;font-weight:850;font-size:14px} #${MODAL} .item:first-of-type{border-top:0}
      #${MODAL} .item span{margin-left:auto;color:#8f98ad;font-size:12px;font-weight:700} #${MODAL} .item .arrow{color:#9d7cff;font-size:22px}
      #${MODAL} .note{color:#8f98ad;font-size:11px;line-height:1.5;margin-top:8px}
    `;document.head.appendChild(s);
  }
  function modal(){
    if(document.getElementById(MODAL))return;
    const m=document.createElement("div");m.id=MODAL;m.innerHTML=`<div class="sheet" role="dialog" aria-label="Settings"><div class="top"><h2>Settings</h2><button class="close" aria-label="Close settings">×</button></div><div class="group"><h3>APP</h3><button class="item">🔔 Notifications<span>Coming soon</span></button><button class="item">🎨 Appearance<span>Default</span></button><button class="item">📱 App preferences<span class="arrow">›</span></button></div><div class="group"><h3>DATA & ACCOUNT</h3><button class="item" data-privacy>🔐 Data & Privacy<span class="arrow">›</span></button><button class="item">☁️ Account & Sync<span>Coming soon</span></button><div class="note">ShiftFit currently saves your data locally on this device. Cloud account sync will be added when accounts are introduced.</div></div><div class="group"><h3>ABOUT</h3><button class="item">ℹ️ About ShiftFit<span class="arrow">›</span></button></div></div>`;
    document.body.appendChild(m);m.querySelector(".close").onclick=close;m.onclick=e=>{if(e.target===m)close()};m.querySelector("[data-privacy]").onclick=()=>{if(window.shiftfitOpenDataPrivacy)window.shiftfitOpenDataPrivacy();};
  }
  function bind(){
    document.querySelectorAll(".profile-btn").forEach(function(btn){if(btn.dataset.shiftfitSettingsBound==="1")return;btn.dataset.shiftfitSettingsBound="1";btn.addEventListener("click",function(e){e.preventDefault();e.stopImmediatePropagation();open();},true);});
    const card=document.getElementById("shiftfit-profile-entry-modal");if(card){const data=[...card.querySelectorAll("[data-privacy]")];data.forEach(function(x){x.closest(".profile-section")?.setAttribute("data-shiftfit-settings-only","1");});}
    document.querySelectorAll('[data-shiftfit-settings-only="1"]').forEach(function(x){x.style.display="none";});
  }
  function boot(){styles();modal();bind();new MutationObserver(bind).observe(document.body,{subtree:true,childList:true});[300,800,1500,2500].forEach(t=>setTimeout(bind,t));}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
