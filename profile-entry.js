/* ShiftFit Profile Entry */
(function(){
  "use strict";
  const MODAL="shiftfit-profile-entry-modal";
  const PANEL="shiftfit-profile-modal-panel";

  function close(){
    const m=document.getElementById(MODAL);
    if(m)m.classList.remove("open");
  }

  function open(){
    const m=document.getElementById(MODAL);
    if(!m)return;
    m.classList.add("open");
    if(window.shiftfitOpenDataPrivacy){
      const dp=document.getElementById("shiftfit-data-privacy-card");
      if(dp)dp.style.display="block";
    }
  }

  function styles(){
    if(document.getElementById("shiftfit-profile-entry-style"))return;
    const s=document.createElement("style");
    s.id="shiftfit-profile-entry-style";
    s.textContent=`
      .shiftfit-profile-trigger{cursor:pointer;position:relative;}
      .shiftfit-profile-trigger:active{transform:scale(.99);}
      .shiftfit-profile-trigger::after{content:"›";margin-left:auto;color:#9d7cff;font-size:28px;font-weight:800;opacity:.75;}
      #${MODAL}{position:fixed;inset:0;z-index:99990;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.72);padding:0;}
      #${MODAL}.open{display:flex;}
      #${MODAL} .profile-sheet{width:min(500px,100%);max-height:88vh;overflow:auto;border:1px solid #303a60;border-bottom:none;border-radius:28px 28px 0 0;background:linear-gradient(145deg,#11172d,#090d1b);padding:22px 18px 34px;box-shadow:0 -20px 60px rgba(0,0,0,.5);}
      #${MODAL} .profile-top{display:flex;align-items:center;gap:14px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.08);}
      #${MODAL} .profile-avatar{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#6176a6 0 13%,transparent 14%),radial-gradient(circle at 50% 90%,#293653 0 34%,transparent 35%),linear-gradient(135deg,#2a3454,#11182c);border:2px solid #6d49d7;box-shadow:0 0 16px rgba(109,40,217,.5);font-size:0;}
      #${MODAL} .profile-name{font-size:22px;font-weight:900;}
      #${MODAL} .profile-sub{color:#aab1c5;font-size:13px;margin-top:4px;}
      #${MODAL} .profile-close{margin-left:auto;width:40px;height:40px;border-radius:12px;border:1px solid #303a60;background:#11162b;color:#fff;font-size:22px;}
      #${MODAL} .profile-section{margin-top:16px;padding:16px;border:1px solid #293253;border-radius:18px;background:rgba(255,255,255,.025);}
      #${MODAL} .profile-section h3{margin:0 0 11px;font-size:14px;}
      #${MODAL} .profile-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid rgba(255,255,255,.06);font-size:13px;}
      #${MODAL} .profile-row:first-of-type{border-top:0;}
      #${MODAL} .profile-row span{color:#aab1c5;}
      #${MODAL} .profile-action{width:100%;padding:13px;border-radius:13px;border:1px solid #303a60;background:#11162b;color:#fff;font-weight:900;text-align:left;}
      #${MODAL} .profile-action.primary{background:linear-gradient(135deg,#7c3aed,#5123c5);border-color:#7545d7;}
      #${MODAL} .profile-note{color:#8f98ad;font-size:11px;line-height:1.5;margin-top:10px;}
      #${PANEL} #shiftfit-data-privacy-card{display:block!important;margin-top:14px;}
    `;
    document.head.appendChild(s);
  }

  function modal(){
    if(document.getElementById(MODAL))return;
    const m=document.createElement("div");
    m.id=MODAL;
    m.innerHTML=`
      <div class="profile-sheet" id="${PANEL}" role="dialog" aria-label="Profile">
        <div class="profile-top">
          <div class="profile-avatar">👤</div>
          <div><div class="profile-name">Andrew</div><div class="profile-sub">Level 1 · ShiftFit Member</div></div>
          <button class="profile-close" aria-label="Close profile">×</button>
        </div>
        <div class="profile-section">
          <h3>MY SHIFT</h3>
          <div class="profile-row"><strong>Shift schedule</strong><span>Manage in Build Your Plan</span></div>
          <div class="profile-row"><strong>Goal & nutrition</strong><span>Personalised</span></div>
        </div>
        <div class="profile-section">
          <h3>ACCOUNT & DATA</h3>
          <button class="profile-action primary" data-privacy>🔐 Data & Privacy</button>
          <div class="profile-note">Your ShiftFit data is currently saved locally on this device. Cloud account sync will be added later.</div>
        </div>
      </div>`;
    document.body.appendChild(m);
    m.querySelector(".profile-close").onclick=close;
    m.addEventListener("click",function(e){if(e.target===m)close();});
    m.querySelector("[data-privacy]").onclick=function(){
      if(window.shiftfitOpenDataPrivacy)window.shiftfitOpenDataPrivacy();
      else alert("Data & Privacy is still loading. Please try again in a moment.");
    };
  }

  function bind(){
    const rows=[...document.querySelectorAll(".user-row")];
    rows.forEach(function(row){
      if(row.dataset.shiftfitProfileBound==="1")return;
      row.dataset.shiftfitProfileBound="1";
      row.classList.add("shiftfit-profile-trigger");
      row.setAttribute("role","button");
      row.setAttribute("tabindex","0");
      row.setAttribute("aria-label","Open Profile");
      row.addEventListener("click",open);
      row.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
    });
  }

  function boot(){
    styles();modal();bind();
    new MutationObserver(bind).observe(document.body,{subtree:true,childList:true});
    [300,800,1500,2500].forEach(function(t){setTimeout(bind,t);});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
