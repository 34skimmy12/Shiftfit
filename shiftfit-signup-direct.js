/* ShiftFit Direct Sign Up — standalone signup modal, independent of Settings navigation. */
(function(){
  "use strict";
  if(window.__shiftFitDirectSignupLoaded)return;
  window.__shiftFitDirectSignupLoaded=true;

  var STYLE_ID="shiftfit-direct-signup-style";
  var MODAL_ID="shiftfit-direct-signup-modal";

  function esc(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");}

  function styles(){
    if(document.getElementById(STYLE_ID))return;
    var s=document.createElement("style");s.id=STYLE_ID;
    s.textContent="#"+MODAL_ID+"{position:fixed;inset:0;z-index:100020;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.86)}#"+MODAL_ID+".open{display:flex}#"+MODAL_ID+" .signup-sheet{width:min(500px,100%);height:100dvh;overflow:auto;background:linear-gradient(180deg,#08091a,#050711);padding:24px 18px calc(110px + env(safe-area-inset-bottom));box-sizing:border-box;color:#fff}#"+MODAL_ID+" .signup-top{display:grid;grid-template-columns:48px 1fr 48px;align-items:center;margin-bottom:22px}#"+MODAL_ID+" .signup-back{width:48px;height:48px;border-radius:50%;border:1px solid #303a60;background:#14182b;color:#fff;font-size:30px}#"+MODAL_ID+" .signup-logo{text-align:center;font-size:26px;font-weight:1000;font-style:italic;letter-spacing:-2px}#"+MODAL_ID+" .signup-logo .bolt{color:#ff9d22}#"+MODAL_ID+" .signup-logo .fit{color:#8656ff}#"+MODAL_ID+" h1{margin:0 4px;font-size:32px}#"+MODAL_ID+" .sub{margin:6px 4px 22px;color:#aab1c5;font-size:14px;line-height:1.45}#"+MODAL_ID+" .group{padding:16px;margin:12px 0;border:1px solid #293253;border-radius:21px;background:linear-gradient(145deg,#11182d,#0b1020)}#"+MODAL_ID+" label{display:block;margin:0 0 7px;color:#bfc6da;font-size:12px;font-weight:800}#"+MODAL_ID+" input{width:100%;padding:14px;border:1px solid #354267;border-radius:13px;background:#0b1021;color:#fff;font-size:15px;box-sizing:border-box;outline:none}#"+MODAL_ID+" input:focus{border-color:#8b5cf6;box-shadow:0 0 0 2px rgba(139,92,246,.15)}#"+MODAL_ID+" .save{width:100%;margin-top:16px;padding:16px;border:0;border-radius:15px;background:linear-gradient(135deg,#8b3cff,#5123c5);color:#fff;font-size:14px;font-weight:950}#"+MODAL_ID+" .secondary{width:100%;margin-top:9px;padding:13px;border:1px solid #39466f;border-radius:14px;background:#11182d;color:#d7d1ff;font-weight:850}#"+MODAL_ID+" .message{margin-top:12px;color:#c9cfe0;font-size:13px;line-height:1.5}#"+MODAL_ID+" .error{color:#ff9a9a}#"+MODAL_ID+" .note{margin-top:12px;color:#7f879c;font-size:11px;line-height:1.5}";
    document.head.appendChild(s);
  }

  function close(){var m=document.getElementById(MODAL_ID);if(m)m.classList.remove("open");}

  function render(){
    var m=document.getElementById(MODAL_ID);
    if(!m){m=document.createElement("div");m.id=MODAL_ID;document.body.appendChild(m);}
    m.innerHTML='<div class="signup-sheet" role="dialog" aria-label="Create ShiftFit account"><div class="signup-top"><button class="signup-back" type="button" aria-label="Back">‹</button><div class="signup-logo"><span class="bolt">⚡</span>SHIFT<span class="fit">FIT</span></div><div></div></div><h1>Create your ShiftFit account</h1><div class="sub">Keep your profile, goals, meals and progress backed up to your ShiftFit account.</div><div class="group"><label for="shiftfit-direct-name">Name</label><input id="shiftfit-direct-name" type="text" autocomplete="name" placeholder="Your name"><label for="shiftfit-direct-email" style="margin-top:14px">Email</label><input id="shiftfit-direct-email" type="email" autocomplete="email" placeholder="you@example.com"><label for="shiftfit-direct-password" style="margin-top:14px">Password</label><input id="shiftfit-direct-password" type="password" autocomplete="new-password" placeholder="At least 8 characters"><button class="save" id="shiftfit-direct-create" type="button">Create my ShiftFit account</button><button class="secondary" id="shiftfit-direct-cancel" type="button">Back</button><div id="shiftfit-direct-message" class="message"></div><div class="note">Your password is handled by ShiftFit's secure email/password authentication service.</div></div></div>';
    m.classList.add("open");
    m.querySelector(".signup-back").onclick=close;
    m.querySelector("#shiftfit-direct-cancel").onclick=close;
    m.onclick=function(e){if(e.target===m)close();};
    m.querySelector("#shiftfit-direct-create").onclick=async function(){
      var name=document.getElementById("shiftfit-direct-name").value.trim();
      var email=document.getElementById("shiftfit-direct-email").value.trim();
      var password=document.getElementById("shiftfit-direct-password").value;
      var msg=document.getElementById("shiftfit-direct-message");
      if(!email||!password){msg.className="message error";msg.textContent="Enter your email and password.";return;}
      if(password.length<8){msg.className="message error";msg.textContent="Use a password with at least 8 characters.";return;}
      var auth=window.shiftfitAuth;
      if(!auth||typeof auth.signUp!=="function"){msg.className="message";msg.textContent="Account services are still loading. Please try again in a moment.";return;}
      var b=this;b.disabled=true;b.textContent="Creating account…";msg.textContent="";
      try{var data=await auth.signUp(email,password,name);if(data&&data.session){close();if(typeof auth.renderAccount==="function")auth.renderAccount();}else{msg.className="message";msg.textContent="Account created. Check your email to confirm your account, then sign in.";b.disabled=false;b.textContent="Create my ShiftFit account";}}
      catch(e){msg.className="message error";msg.textContent=e&&e.message?e.message:"Account creation failed.";b.disabled=false;b.textContent="Create my ShiftFit account";}
    };
  }

  function open(){
    var settings=document.getElementById("shiftfit-settings-split-modal");
    if(settings)settings.classList.remove("open");
    styles();render();
  }

  function bind(){
    document.addEventListener("click",function(e){
      var button=e.target&&e.target.closest?e.target.closest(".home-header .menu-btn, .home-header .signup-entry"):null;
      if(!button)return;
      e.preventDefault();e.stopImmediatePropagation();
      open();
    },true);
  }

  function boot(){styles();bind();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitDirectSignup={open:open,close:close};
})();
