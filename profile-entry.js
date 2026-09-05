/* ShiftFit Profile Entry */
(function(){
  "use strict";
  const MODAL="shiftfit-profile-entry-modal";
  const PANEL="shiftfit-profile-modal-panel";
  const PHOTO_KEY="shiftfit:v1:profilePicture";

  function close(){
    const m=document.getElementById(MODAL);
    if(m)m.classList.remove("open");
  }

  function getPhoto(){
    try{return localStorage.getItem(PHOTO_KEY)||"";}catch(e){return "";}
  }

  function setPhoto(dataUrl){
    try{
      localStorage.setItem(PHOTO_KEY,dataUrl);
      applyPhoto(dataUrl);
    }catch(e){
      alert("That photo is too large to save on this device. Please choose another photo.");
    }
  }

  function applyPhoto(dataUrl){
    const src=dataUrl||getPhoto();
    document.querySelectorAll(".shiftfit-profile-photo").forEach(function(el){
      if(src){
        el.style.backgroundImage="url(\\\""+src+"\\\")";
        el.classList.add("has-photo");
        el.textContent="";
      }else{
        el.style.backgroundImage="";
        el.classList.remove("has-photo");
        el.textContent="👤";
      }
    });
  }

  function compressImage(file){
    return new Promise(function(resolve,reject){
      const reader=new FileReader();
      reader.onerror=reject;
      reader.onload=function(){
        const img=new Image();
        img.onerror=reject;
        img.onload=function(){
          const max=512;
          const scale=Math.min(1,max/Math.max(img.width,img.height));
          const canvas=document.createElement("canvas");
          canvas.width=Math.max(1,Math.round(img.width*scale));
          canvas.height=Math.max(1,Math.round(img.height*scale));
          const ctx=canvas.getContext("2d");
          ctx.drawImage(img,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL("image/jpeg",0.82));
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function choosePhoto(){
    const input=document.getElementById("shiftfit-profile-photo-input");
    if(input)input.click();
  }

  function open(){
    const m=document.getElementById(MODAL);
    if(!m)return;
    m.classList.add("open");
    applyPhoto();
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
      #${MODAL} .profile-avatar-wrap{position:relative;flex:0 0 auto;}
      #${MODAL} .profile-avatar{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#6176a6 0 13%,transparent 14%),radial-gradient(circle at 50% 90%,#293653 0 34%,transparent 35%),linear-gradient(135deg,#2a3454,#11182c);border:2px solid #6d49d7;box-shadow:0 0 16px rgba(109,40,217,.5);font-size:28px;background-size:cover;background-position:center;overflow:hidden;}
      #${MODAL} .profile-avatar.has-photo{background-color:#11182c;background-image:none;}
      #${MODAL} .profile-camera{position:absolute;right:-3px;bottom:-3px;width:31px;height:31px;border-radius:50%;border:2px solid #11172d;background:linear-gradient(135deg,#8b5cf6,#5b21b6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 4px 12px rgba(0,0,0,.35);cursor:pointer;}
      #${MODAL} .profile-name{font-size:22px;font-weight:900;}
      #${MODAL} .profile-sub{color:#aab1c5;font-size:13px;margin-top:4px;}
      #${MODAL} .profile-photo-action{margin-top:8px;padding:8px 11px;border-radius:10px;border:1px solid #39466f;background:#11182d;color:#cfc7ff;font-size:12px;font-weight:800;cursor:pointer;}
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
          <div class="profile-avatar-wrap">
            <div class="profile-avatar shiftfit-profile-photo">👤</div>
            <button class="profile-camera" type="button" aria-label="Add profile picture" title="Add profile picture">📷</button>
          </div>
          <div style="min-width:0;">
            <div class="profile-name">Andrew</div>
            <div class="profile-sub">Level 1 · ShiftFit Member</div>
            <button class="profile-photo-action" type="button" data-photo>📸 Add profile picture</button>
          </div>
          <button class="profile-close" aria-label="Close profile">×</button>
        </div>
        <input id="shiftfit-profile-photo-input" type="file" accept="image/*" hidden>
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
    m.querySelector(".profile-camera").onclick=choosePhoto;
    m.querySelector("[data-photo]").onclick=choosePhoto;
    m.querySelector("#shiftfit-profile-photo-input").addEventListener("change",async function(e){
      const file=e.target.files&&e.target.files[0];
      if(!file)return;
      try{
        const data=await compressImage(file);
        setPhoto(data);
      }catch(err){alert("We couldn't load that photo. Please try another image.");}
      e.target.value="";
    });
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
    applyPhoto();
  }

  function boot(){
    styles();modal();bind();
    new MutationObserver(bind).observe(document.body,{subtree:true,childList:true});
    [300,800,1500,2500].forEach(function(t){setTimeout(bind,t);});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
