/* ShiftFit Profile Entry — polished profile screen */
(function(){
  "use strict";
  const MODAL="shiftfit-profile-entry-modal";
  const PHOTO_KEY="shiftfit:v1:profilePicture";

  function close(){const m=document.getElementById(MODAL);if(m)m.classList.remove("open");}
  function getPhoto(){try{return localStorage.getItem(PHOTO_KEY)||"";}catch(e){return "";}}
  function setPhoto(dataUrl){try{localStorage.setItem(PHOTO_KEY,dataUrl);applyPhoto(dataUrl);}catch(e){alert("That photo is too large to save on this device. Please choose another photo.");}}
  function removePhoto(){try{localStorage.removeItem(PHOTO_KEY);}catch(e){}applyPhoto("");}
  function applyPhoto(dataUrl){const src=dataUrl||getPhoto();document.querySelectorAll(".shiftfit-profile-photo, .avatar").forEach(function(el){if(src){el.style.backgroundImage='url("'+src+'")';el.classList.add("has-photo");if(el.classList.contains("shiftfit-profile-photo"))el.textContent="";}else{el.style.backgroundImage="";el.classList.remove("has-photo");if(el.classList.contains("shiftfit-profile-photo"))el.textContent="👤";}});}
  function compressImage(file){return new Promise(function(resolve,reject){const reader=new FileReader();reader.onerror=reject;reader.onload=function(){const img=new Image();img.onerror=reject;img.onload=function(){const max=512;const scale=Math.min(1,max/Math.max(img.width,img.height));const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/jpeg",0.82));};img.src=reader.result;};reader.readAsDataURL(file);});}
  function choosePhoto(){const input=document.getElementById("shiftfit-profile-photo-input");if(input)input.click();}
  function open(){const m=document.getElementById(MODAL);if(!m)return;m.classList.add("open");applyPhoto();try{if(typeof window.shiftfitRenderProfileData==="function")window.shiftfitRenderProfileData();}catch(_){}setTimeout(function(){try{if(typeof window.shiftfitRenderProfileData==="function")window.shiftfitRenderProfileData();}catch(_){}},50);}

  function route(label){
    const key=String(label||"").toLowerCase();
    close();
    if(key==="history"){
      if(typeof window.hideAllScreens==="function")window.hideAllScreens();
      const setup=document.getElementById("setupScreen");
      if(setup)setup.classList.add("active");
      if(typeof window.setNav==="function")window.setNav("");
      if(typeof window.showMyHistory==="function")window.showMyHistory();
      return;
    }
    if(key==="progression"){
      if(typeof window.showProgressInsights==="function")window.showProgressInsights();
      return;
    }
    if(key==="shift schedule"||key==="goal & nutrition"||key==="personal details"){
      if(typeof window.showPlanBuilder==="function")window.showPlanBuilder();
    }
  }

  function styles(){if(document.getElementById("shiftfit-profile-entry-style"))return;const s=document.createElement("style");s.id="shiftfit-profile-entry-style";s.textContent=`
    .shiftfit-profile-trigger{cursor:pointer;position:relative;}
    .shiftfit-profile-trigger:active{transform:scale(.99);}
    #${MODAL}{position:fixed;inset:0;z-index:99990;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.74);padding:0;}
    #${MODAL}.open{display:flex;}
    #${MODAL} .profile-sheet{width:min(500px,100%);height:100dvh;max-height:100dvh;overflow:auto;border:0;border-radius:0;background:linear-gradient(180deg,#08091a 0%,#070b18 48%,#050711 100%);padding:24px 18px calc(110px + env(safe-area-inset-bottom));box-shadow:none;}
    #${MODAL} .profile-header{display:grid;grid-template-columns:48px 1fr 48px;align-items:center;gap:8px;margin-bottom:12px;}
    #${MODAL} .profile-back{width:48px;height:48px;border-radius:50%;border:1px solid #303a60;background:#14182b;color:#fff;font-size:30px;line-height:1;}
    #${MODAL} .profile-logo{text-align:center;font-size:26px;font-weight:1000;font-style:italic;letter-spacing:-2px;transform:skew(-5deg);}
    #${MODAL} .profile-logo .bolt{color:#ff9d22;text-shadow:0 0 10px rgba(255,157,34,.55);margin-right:3px}.profile-logo .shift{color:#f5f5f7}.profile-logo .fit{color:#8656ff;text-shadow:0 0 12px rgba(132,76,255,.8)}
    #${MODAL} .profile-spacer{width:48px;height:48px;}
    #${MODAL} .profile-heading{padding:0 4px 18px}.profile-heading h1{margin:0;font-size:34px;letter-spacing:-1px}.profile-heading p{margin:4px 0 0;color:#aab1c5;font-size:15px;}
    #${MODAL} .profile-card{padding:18px 14px 14px;border:1px solid #303a60;border-radius:24px;background:linear-gradient(145deg,#12192f,#0b1021);box-shadow:0 15px 40px rgba(0,0,0,.28);}
    #${MODAL} .profile-identity{display:flex;align-items:center;gap:14px;}.profile-avatar-wrap{position:relative;flex:0 0 auto}.profile-avatar{width:104px;height:104px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#6176a6 0 13%,transparent 14%),radial-gradient(circle at 50% 90%,#293653 0 34%,transparent 35%),linear-gradient(135deg,#2a3454,#11182c);border:3px solid #7540ff;box-shadow:0 0 22px rgba(109,40,217,.65);font-size:34px;background-size:cover;background-position:center;overflow:hidden;}.profile-avatar.has-photo{background-color:#11182c}
    #${MODAL} .profile-camera{position:absolute;right:-4px;bottom:-2px;width:43px;height:43px;border-radius:50%;border:3px solid #12192f;background:linear-gradient(135deg,#8b5cf6,#5123c5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 14px rgba(0,0,0,.4);cursor:pointer;}
    #${MODAL} .profile-name{font-size:25px;font-weight:950}.profile-sub{color:#aab1c5;font-size:14px;margin-top:4px}.profile-edit{margin-top:10px;padding:9px 15px;border-radius:999px;border:1px solid #46527b;background:#10162b;color:#e9e5ff;font-size:12px;font-weight:900;cursor:pointer}
    #${MODAL} .profile-stats{display:grid;grid-template-columns:repeat(4,1fr);margin-top:17px;border-top:1px solid rgba(255,255,255,.08);padding-top:14px}.profile-stat{text-align:center;border-right:1px solid rgba(255,255,255,.1);padding:0 4px}.profile-stat:last-child{border-right:0}.profile-stat strong{display:block;font-size:18px}.profile-stat span{display:block;color:#aab1c5;font-size:9px;margin-top:4px}.profile-stat .fire{color:#ff7d2b}.profile-stat .purple{color:#a56dff}.profile-stat .green{color:#5be6a5}.profile-stat .blue{color:#5fb8ff}
    #${MODAL} .profile-section{margin-top:16px;padding:16px;border:1px solid #293253;border-radius:21px;background:linear-gradient(145deg,#11182d,#0b1020)}.profile-section h3{margin:0 0 9px;font-size:14px;letter-spacing:1.5px;color:#c5b5ff}.profile-list{display:flex;flex-direction:column}.profile-list-btn{width:100%;display:grid;grid-template-columns:50px minmax(0,1fr) 24px;align-items:center;gap:12px;padding:12px 0;border:0;border-top:1px solid rgba(255,255,255,.07);background:transparent;color:#fff;text-align:left}.profile-list-btn:first-child{border-top:0}.profile-icon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:23px;background:rgba(139,92,246,.18)}.profile-list-btn:nth-child(2) .profile-icon{background:rgba(255,76,105,.16)}.profile-list-btn:nth-child(3) .profile-icon{background:rgba(20,220,194,.15)}.profile-progress .profile-list-btn:first-child .profile-icon{background:rgba(72,170,255,.16)}.profile-progress .profile-list-btn:last-child .profile-icon{background:rgba(255,174,36,.18)}.profile-list-title{font-size:16px;font-weight:900}.profile-list-copy{display:block;margin-top:3px;color:#aab1c5;font-size:11px;line-height:1.35}.profile-arrow{color:#b39cff;font-size:28px;text-align:right}.profile-photo-actions{display:flex;gap:7px;margin-top:8px}.profile-photo-action{padding:7px 10px;border-radius:9px;border:1px solid #39466f;background:#11182d;color:#cfc7ff;font-size:10px;font-weight:800}.profile-photo-action.remove{color:#ffb5bf;border-color:#5a303b}
    #${MODAL} .profile-logout{width:100%;margin-top:18px;min-height:48px;border:2px solid #e85b6b;border-radius:999px;background:rgba(255,76,105,.08);color:#ff6c7d;font-size:14px;font-weight:950}.profile-note{margin-top:10px;color:#707991;font-size:10px;text-align:center}
    @media(max-width:390px){#${MODAL} .profile-sheet{padding-left:14px;padding-right:14px}#${MODAL} .profile-avatar{width:90px;height:90px}#${MODAL} .profile-camera{width:38px;height:38px;font-size:17px}#${MODAL} .profile-name{font-size:22px}#${MODAL} .profile-heading h1{font-size:31px}.profile-list-title{font-size:15px}}
  `;document.head.appendChild(s);}

  function modal(){if(document.getElementById(MODAL))return;const m=document.createElement("div");m.id=MODAL;m.innerHTML=`
    <div class="profile-sheet" role="dialog" aria-label="Profile">
      <div class="profile-header"><button class="profile-back" type="button" aria-label="Close profile">‹</button><div class="profile-logo"><span class="bolt">⚡</span><span class="shift">SHIFT</span><span class="fit">FIT</span></div><div class="profile-spacer"></div></div>
      <div class="profile-heading"><h1>Profile</h1><p>Your personal fitness journey</p></div>
      <section class="profile-card">
        <div class="profile-identity"><div class="profile-avatar-wrap"><div class="profile-avatar shiftfit-profile-photo">👤</div><button class="profile-camera" type="button" aria-label="Change profile picture">📷</button></div><div style="min-width:0"><div class="profile-name">Andrew</div><div class="profile-sub">Level 1 · ShiftFit Member</div><button class="profile-edit" type="button" data-profile-nav="Personal details">✎ Edit Profile</button><div class="profile-photo-actions"><button class="profile-photo-action" type="button" data-photo>📸 Change photo</button><button class="profile-photo-action remove" type="button" data-remove-photo>Remove</button></div></div></div>
        <div class="profile-stats"><div class="profile-stat"><strong class="fire">0</strong><span>🔥 Day Streak</span></div><div class="profile-stat"><strong class="purple">0</strong><span>🏋️ Workouts</span></div><div class="profile-stat"><strong class="green">0</strong><span>🍴 Meals Logged</span></div><div class="profile-stat"><strong class="blue">0 kg</strong><span>⚖️ Weight Change</span></div></div>
      </section>
      <input id="shiftfit-profile-photo-input" type="file" accept="image/*" hidden>
      <section class="profile-section"><h3>MY SETUP</h3><div class="profile-list">
        <button class="profile-list-btn" type="button" data-profile-nav="Shift schedule"><span class="profile-icon">📅</span><span><span class="profile-list-title">Shift schedule</span><span class="profile-list-copy">Manage your shifts and work pattern</span></span><span class="profile-arrow">›</span></button>
        <button class="profile-list-btn" type="button" data-profile-nav="Goal & nutrition"><span class="profile-icon">🎯</span><span><span class="profile-list-title">Goal & nutrition</span><span class="profile-list-copy">Your goals, targets and food preferences</span></span><span class="profile-arrow">›</span></button>
        <button class="profile-list-btn" type="button" data-profile-nav="Personal details"><span class="profile-icon">👤</span><span><span class="profile-list-title">Personal details</span><span class="profile-list-copy">Update your information</span></span><span class="profile-arrow">›</span></button>
      </div></section>
      <section class="profile-section profile-progress"><h3>YOUR PROGRESS</h3><div class="profile-list">
        <button class="profile-list-btn" type="button" data-profile-nav="Progression"><span class="profile-icon">📊</span><span><span class="profile-list-title">Progression</span><span class="profile-list-copy">Track your journey and see your improvements</span></span><span class="profile-arrow">›</span></button>
        <button class="profile-list-btn" type="button" data-profile-nav="History"><span class="profile-icon">📄</span><span><span class="profile-list-title">History</span><span class="profile-list-copy">View your logs, check-ins and past data</span></span><span class="profile-arrow">›</span></button>
      </div></section>
      <button class="profile-logout" type="button" onclick="close()" aria-label="Log out">⇥ &nbsp; Log out</button>
      <div class="profile-note">App preferences, notifications, data & privacy, help & support and legal information live in Settings.</div>
    </div>`;
    document.body.appendChild(m);
    m.querySelector(".profile-back").onclick=close;
    m.addEventListener("click",function(e){if(e.target===m)close();});
    m.querySelector(".profile-camera").onclick=choosePhoto;
    m.querySelector("[data-photo]").onclick=choosePhoto;
    m.querySelector("[data-remove-photo]").onclick=removePhoto;
    m.querySelectorAll("[data-profile-nav]").forEach(function(btn){btn.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();route(btn.dataset.profileNav);});});
    m.querySelector("#shiftfit-profile-photo-input").addEventListener("change",async function(e){const file=e.target.files&&e.target.files[0];if(!file)return;try{const data=await compressImage(file);setPhoto(data);}catch(err){alert("We couldn't load that photo. Please try another image.");}e.target.value="";});
  }

  function relocateOptions(){["History","Progression"].forEach(function(label){const target=document.querySelector("button,a,[role='button'],.nav-item,.option-card,.menu-item,.settings-item");});}
  function bind(){document.querySelectorAll(".user-row").forEach(function(row){if(row.dataset.shiftfitProfileBound==="1")return;row.dataset.shiftfitProfileBound="1";row.classList.add("shiftfit-profile-trigger");row.setAttribute("role","button");row.setAttribute("tabindex","0");row.setAttribute("aria-label","Open Profile");row.addEventListener("click",open);row.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});});applyPhoto();}
  function boot(){styles();modal();bind();[800,1800].forEach(function(t){setTimeout(bind,t);});}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();