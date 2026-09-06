/* ShiftFit Account Settings — activates the Account & Sync screen without changing core navigation. */
(function(){
  "use strict";
  if(window.__shiftFitAccountSettingsLoaded)return;
  window.__shiftFitAccountSettingsLoaded=true;
  function msg(box,text,error){box.innerHTML='<div class="note" style="margin-top:12px;'+(error?'color:#ff8f8f;':'')+'">'+String(text).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];})+'</div>';}
  function render(box){
    var auth=window.shiftfitAuth;
    if(!auth||typeof auth.getSession!=="function"){msg(box,"Account services are still loading. Please try again in a moment.",true);return;}
    box.innerHTML='<div class="group"><h3>ACCOUNT</h3><div class="legal">Checking your ShiftFit account…</div></div>';
    auth.getSession().then(function(session){
      if(session&&session.user){
        var u=session.user, meta=u.user_metadata||{}, name=meta.full_name||meta.name||"ShiftFit member";
        box.innerHTML='<div class="group"><h3>SIGNED IN</h3><div class="legal"><strong>'+name.replace(/[&<>]/g,'')+'</strong><br><span class="note">'+String(u.email||'').replace(/[&<>]/g,'')+'</span><br><br><strong>Status:</strong> Active<br><strong>Authentication:</strong> Email & password</div><button class="save" id="shiftfit-sync-now" type="button">Sync my ShiftFit data</button><button class="secondary" id="shiftfit-signout" type="button">Sign out</button><div class="note">Your account keeps your ShiftFit data available for backup and restore across devices.</div></div>';
        var sync=document.getElementById("shiftfit-sync-now");
        sync.onclick=async function(){this.disabled=true;this.textContent="Syncing…";try{if(window.shiftfitCloudSync&&typeof window.shiftfitCloudSync.syncNow==='function')await window.shiftfitCloudSync.syncNow();else if(window.shiftfitCloudSync&&typeof window.shiftfitCloudSync.sync==='function')await window.shiftfitCloudSync.sync();else msg(box,"Cloud sync is still loading. Try again in a moment.",true);}catch(e){msg(box,e.message||"Sync failed.",true);}finally{this.disabled=false;this.textContent="Sync my ShiftFit data";}};
        document.getElementById("shiftfit-signout").onclick=async function(){this.disabled=true;try{await auth.signOut();render(box);}catch(e){this.disabled=false;msg(box,e.message||"Sign out failed.",true);}};
        return;
      }
      signedOut(box,auth);
    }).catch(function(e){msg(box,e.message||"Could not check account status.",true);});
  }
  function signedOut(box,auth){
    box.innerHTML='<div class="group"><h3>SIGN IN</h3><label class="label">Email</label><input class="field" id="sf-account-email" type="email" autocomplete="email" placeholder="you@example.com"><label class="label">Password</label><input class="field" id="sf-account-password" type="password" autocomplete="current-password" placeholder="Your password"><button class="save" id="sf-account-login" type="button">Sign in</button><button class="secondary" id="sf-account-create" type="button">Create account</button><button class="secondary" id="sf-account-forgot" type="button">Forgot password?</button><div id="sf-account-msg"></div></div>';
    var message=document.getElementById("sf-account-msg");
    document.getElementById("sf-account-login").onclick=async function(){var email=document.getElementById("sf-account-email").value.trim(),password=document.getElementById("sf-account-password").value;if(!email||!password){msg(message,"Enter your email and password.",true);return;}this.disabled=true;this.textContent="Signing in…";try{await auth.signInWithPassword(email,password);render(box);}catch(e){this.disabled=false;this.textContent="Sign in";msg(message,e.message||"Sign in failed.",true);}};
    document.getElementById("sf-account-create").onclick=function(){create(box,auth);};
    document.getElementById("sf-account-forgot").onclick=function(){forgot(box,auth);};
  }
  function create(box,auth){
    box.innerHTML='<div class="group"><h3>CREATE ACCOUNT</h3><label class="label">Name</label><input class="field" id="sf-account-name" autocomplete="name" placeholder="Your name"><label class="label">Email</label><input class="field" id="sf-account-email" type="email" autocomplete="email" placeholder="you@example.com"><label class="label">Password</label><input class="field" id="sf-account-password" type="password" autocomplete="new-password" placeholder="At least 8 characters"><button class="save" id="sf-account-create-submit" type="button">Create my ShiftFit account</button><button class="secondary" id="sf-account-back" type="button">Back to sign in</button><div id="sf-account-msg"></div></div>';
    var message=document.getElementById("sf-account-msg");
    document.getElementById("sf-account-create-submit").onclick=async function(){var name=document.getElementById("sf-account-name").value.trim(),email=document.getElementById("sf-account-email").value.trim(),password=document.getElementById("sf-account-password").value;if(!email||!password){msg(message,"Enter an email and password.",true);return;}if(password.length<8){msg(message,"Use a password with at least 8 characters.",true);return;}this.disabled=true;this.textContent="Creating account…";try{var data=await auth.signUp(email,password,name);if(data&&data.session){render(box);}else{this.disabled=false;this.textContent="Create my ShiftFit account";msg(message,"Account created. Check your email to confirm your account, then sign in.");}}catch(e){this.disabled=false;this.textContent="Create my ShiftFit account";msg(message,e.message||"Account creation failed.",true);}};
    document.getElementById("sf-account-back").onclick=function(){signedOut(box,auth);};
  }
  function forgot(box,auth){
    box.innerHTML='<div class="group"><h3>RESET PASSWORD</h3><div class="legal">Enter your account email and we will send a password reset link.</div><label class="label">Email</label><input class="field" id="sf-account-email" type="email" autocomplete="email" placeholder="you@example.com"><button class="save" id="sf-account-reset" type="button">Send reset link</button><button class="secondary" id="sf-account-back" type="button">Back to sign in</button><div id="sf-account-msg"></div></div>';
    var message=document.getElementById("sf-account-msg");
    document.getElementById("sf-account-reset").onclick=async function(){var email=document.getElementById("sf-account-email").value.trim();if(!email){msg(message,"Enter your email.",true);return;}this.disabled=true;this.textContent="Sending…";try{await auth.resetPassword(email);msg(message,"If that email has a ShiftFit account, a reset link has been sent.");}catch(e){msg(message,e.message||"Could not send reset link.",true);}finally{this.disabled=false;this.textContent="Send reset link";}};
    document.getElementById("sf-account-back").onclick=function(){signedOut(box,auth);};
  }
  function install(){
    var modal=document.getElementById("shiftfit-settings-split-modal");if(!modal||!modal.classList.contains("open"))return;
    var heading=modal.querySelector(".backrow h1");if(!heading||heading.textContent.trim()!=="Account & Sync")return;
    var box=modal.querySelector("#shiftfit-account-state");if(!box){box=document.createElement("div");box.id="shiftfit-account-state";var sheet=modal.querySelector(".sheet");if(sheet)sheet.appendChild(box);}
    if(box.dataset.active==="1")return;box.dataset.active="1";render(box);
  }
  function boot(){install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});window.addEventListener("shiftfitAuthChanged",install);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
