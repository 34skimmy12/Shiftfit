/* ShiftFit Account & Sync — Supabase email/password authentication. */
(function(){
  "use strict";
  if(window.__shiftFitAuthLoaded)return;
  window.__shiftFitAuthLoaded=true;

  var CLIENT=null;
  var CONFIG=null;
  var ready=null;
  var SUPABASE_CDN="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  function esc(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;");}
  function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement("script");s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
  async function init(){
    var response=await fetch("/api/config",{cache:"no-store"});
    CONFIG=await response.json();
    if(!CONFIG.supabaseUrl||!CONFIG.supabasePublishableKey)return null;
    if(!window.supabase||!window.supabase.createClient)await loadScript(SUPABASE_CDN);
    CLIENT=window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    CLIENT.auth.onAuthStateChange(function(event,session){
      window.dispatchEvent(new CustomEvent("shiftfitAuthChanged",{detail:{event:event,session:session,user:session&&session.user||null}}));
    });
    return CLIENT;
  }
  ready=init().catch(function(error){console.warn("ShiftFit auth is not configured yet.",error);return null;});

  async function getClient(){return ready;}
  async function session(){var c=await getClient();if(!c)return null;var r=await c.auth.getSession();return r.data&&r.data.session||null;}
  async function signInWithPassword(email,password){var c=await getClient();if(!c)throw new Error("ShiftFit account services are not configured yet.");var r=await c.auth.signInWithPassword({email:email,password:password});if(r.error)throw r.error;return r.data;}
  async function signUp(email,password,name){var c=await getClient();if(!c)throw new Error("ShiftFit account services are not configured yet.");var options={data:{full_name:name||""},emailRedirectTo:window.location.origin};var r=await c.auth.signUp({email:email,password:password,options:options});if(r.error)throw r.error;return r.data;}
  async function resetPassword(email){var c=await getClient();if(!c)throw new Error("ShiftFit account services are not configured yet.");var r=await c.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});if(r.error)throw r.error;}
  async function signOut(){var c=await getClient();if(!c)return;var r=await c.auth.signOut();if(r.error)throw r.error;}
  async function deleteAccount(){throw new Error("Account deletion requires the secure server-side deletion endpoint and is not enabled yet.");}

  function localSnapshot(){
    var data={};
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k&&(/shiftfit|weeklyMeals|mealPreferences|shoppingItems|selectedShift|customShift/i.test(k))){
        try{data[k]=JSON.parse(localStorage.getItem(k));}catch(_){data[k]=localStorage.getItem(k);}
      }
    }
    return data;
  }

  function closeAccountToSettings(){
    var m=document.getElementById("shiftfit-settings-split-modal");
    if(m)m.classList.remove("open");
  }

  function accountShell(){
    var m=document.getElementById("shiftfit-settings-split-modal");if(!m)return null;
    var sheet=m.querySelector(".sheet");if(!sheet)return null;
    sheet.innerHTML='<div class="top"><button class="back" type="button" data-shiftfit-account-back aria-label="Back">‹</button><div class="logo"><span class="bolt">⚡</span><span>SHIFT</span><span class="fit">FIT</span></div><div></div></div><div class="backrow"><h1>Account & Sync</h1></div><div class="subtitle">Create your permanent ShiftFit account and keep your data secure.</div><div id="shiftfit-account-state"></div>';
    sheet.querySelector(".back").onclick=function(event){event.preventDefault();event.stopPropagation();closeAccountToSettings();};
    return sheet;
  }

  function renderMessage(box,text,type){box.innerHTML='<div class="legal" style="margin-top:12px;'+(type==="error"?'color:#ff8f8f;':'')+'">'+esc(text)+'</div>';}

  async function paintAccount(){
    var box=document.getElementById("shiftfit-account-state");if(!box)return;
    box.innerHTML='<div class="group"><h3>ACCOUNT</h3><div class="legal">Checking your ShiftFit account…</div></div>';
    var c=await getClient();
    if(!c){
      box.innerHTML='<div class="group"><h3>ACCOUNT SERVICES</h3><div class="legal"><strong>Almost ready.</strong><br>ShiftFit is prepared for secure email/password accounts, but the Supabase connection still needs its runtime URL and publishable key.</div><div class="note">No temporary or fake account is being created.</div></div>';
      return;
    }
    var s=await session();
    if(!s){renderSignedOut(box);return;}
    var u=s.user||{};var meta=u.user_metadata||{};var name=meta.full_name||meta.name||u.email||"ShiftFit member";
    box.innerHTML='<div class="group"><h3>SIGNED IN</h3><div style="display:flex;align-items:center;gap:12px"><div style="width:52px;height:52px;border-radius:50%;overflow:hidden;border:1px solid #39466f;background:#11182d;display:grid;place-items:center;font-size:22px">👤</div><div><strong>'+esc(name)+'</strong><div class="note" style="margin-top:3px">'+esc(u.email||"")+'</div></div></div><div class="legal" style="margin-top:16px"><strong>Account status:</strong> Active<br><strong>Authentication:</strong> Email & password<br><strong>Data:</strong> Account connected</div><button class="save" id="shiftfit-sync-now" type="button">Sync my ShiftFit data</button><button class="secondary" id="shiftfit-signout" type="button">Sign out</button><div class="note">Your account is permanent. Cloud data sync is the next layer after authentication.</div></div>';
    document.getElementById("shiftfit-sync-now").onclick=function(){toast("Account connected. Cloud data sync is next.");};
    document.getElementById("shiftfit-signout").onclick=async function(){try{await signOut();paintAccount();}catch(e){alert(e.message||"Sign out failed.");}};
  }

  function renderSignedOut(box){
    box.innerHTML='<div class="group"><h3>SIGN IN</h3><label class="note" for="shiftfit-login-email">Email</label><input id="shiftfit-login-email" type="email" autocomplete="email" placeholder="you@example.com" style="width:100%;margin-top:6px"><label class="note" for="shiftfit-login-password" style="display:block;margin-top:14px">Password</label><input id="shiftfit-login-password" type="password" autocomplete="current-password" placeholder="Your password" style="width:100%;margin-top:6px"><button class="save" id="shiftfit-login" type="button">Sign in</button><button class="secondary" id="shiftfit-show-signup" type="button">Create account</button><button class="secondary" id="shiftfit-forgot" type="button">Forgot password?</button><div id="shiftfit-auth-message"></div></div>';
    document.getElementById("shiftfit-login").onclick=async function(){
      var email=document.getElementById("shiftfit-login-email").value.trim();var password=document.getElementById("shiftfit-login-password").value;
      if(!email||!password){renderMessage(document.getElementById("shiftfit-auth-message"),"Enter your email and password.","error");return;}
      this.disabled=true;this.textContent="Signing in…";
      try{await signInWithPassword(email,password);paintAccount();}catch(e){this.disabled=false;this.textContent="Sign in";renderMessage(document.getElementById("shiftfit-auth-message"),e.message||"Sign in failed.","error");}
    };
    document.getElementById("shiftfit-show-signup").onclick=function(){renderSignup(box);};
    document.getElementById("shiftfit-forgot").onclick=function(){renderForgot(box);};
  }

  function renderSignup(box){
    box.innerHTML='<div class="group"><h3>CREATE ACCOUNT</h3><label class="note" for="shiftfit-signup-name">Name</label><input id="shiftfit-signup-name" type="text" autocomplete="name" placeholder="Your name" style="width:100%;margin-top:6px"><label class="note" for="shiftfit-signup-email">Email</label><input id="shiftfit-signup-email" type="email" autocomplete="email" placeholder="you@example.com" style="width:100%;margin-top:6px"><label class="note" for="shiftfit-signup-password" style="display:block;margin-top:14px">Password</label><input id="shiftfit-signup-password" type="password" autocomplete="new-password" placeholder="At least 8 characters" style="width:100%;margin-top:6px"><button class="save" id="shiftfit-signup" type="button">Create my ShiftFit account</button><button class="secondary" id="shiftfit-back-login" type="button">Back to sign in</button><div id="shiftfit-auth-message"></div></div>';
    document.getElementById("shiftfit-signup").onclick=async function(){
      var name=document.getElementById("shiftfit-signup-name").value.trim();var email=document.getElementById("shiftfit-signup-email").value.trim();var password=document.getElementById("shiftfit-signup-password").value;
      if(!email||!password){renderMessage(document.getElementById("shiftfit-auth-message"),"Enter an email and password.","error");return;}
      if(password.length<8){renderMessage(document.getElementById("shiftfit-auth-message"),"Use a password with at least 8 characters.","error");return;}
      this.disabled=true;this.textContent="Creating account…";
      try{var data=await signUp(email,password,name);if(data.session){paintAccount();}else{renderMessage(document.getElementById("shiftfit-auth-message"),"Account created. Check your email to confirm your account, then sign in.");this.disabled=false;this.textContent="Create my ShiftFit account";}}catch(e){this.disabled=false;this.textContent="Create my ShiftFit account";renderMessage(document.getElementById("shiftfit-auth-message"),e.message||"Account creation failed.","error");}
    };
    document.getElementById("shiftfit-back-login").onclick=function(){renderSignedOut(box);};
  }

  function renderForgot(box){
    box.innerHTML='<div class="group"><h3>RESET PASSWORD</h3><div class="legal">Enter your account email and ShiftFit will send a password reset link.</div><label class="note" for="shiftfit-reset-email">Email</label><input id="shiftfit-reset-email" type="email" autocomplete="email" placeholder="you@example.com" style="width:100%;margin-top:6px"><button class="save" id="shiftfit-reset" type="button">Send reset link</button><button class="secondary" id="shiftfit-back-login" type="button">Back to sign in</button><div id="shiftfit-auth-message"></div></div>';
    document.getElementById("shiftfit-reset").onclick=async function(){
      var email=document.getElementById("shiftfit-reset-email").value.trim();if(!email){renderMessage(document.getElementById("shiftfit-auth-message"),"Enter your email.","error");return;}
      this.disabled=true;this.textContent="Sending…";
      try{await resetPassword(email);renderMessage(document.getElementById("shiftfit-auth-message"),"If that email has a ShiftFit account, a password reset link has been sent.");}catch(e){this.disabled=false;this.textContent="Send reset link";renderMessage(document.getElementById("shiftfit-auth-message"),e.message||"Could not send reset link.","error");}
    };
    document.getElementById("shiftfit-back-login").onclick=function(){renderSignedOut(box);};
  }

  function renderAccount(){accountShell();paintAccount();}

  function openSignup(){
    var profile=document.querySelector(".profile-btn");
    if(profile){profile.click();}
    var tries=0;
    function enterAccount(){
      tries++;
      var modal=document.getElementById("shiftfit-settings-split-modal");
      if(!modal){if(tries<20)setTimeout(enterAccount,100);return;}
      modal.classList.add("open");
      var account=modal.querySelector('[data-page="account"]');
      if(account){account.click();}
      setTimeout(function(){
        var signup=document.getElementById("shiftfit-show-signup");
        if(signup)signup.click();
      },250);
    }
    enterAccount();
  }

  function toast(text){var old=document.querySelector(".toast");if(old)old.remove();var t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);setTimeout(function(){t.remove();},2400);}

  window.shiftfitAuth={ready:ready,getClient:getClient,getSession:session,signInWithPassword:signInWithPassword,signUp:signUp,resetPassword:resetPassword,signOut:signOut,deleteAccount:deleteAccount,localSnapshot:localSnapshot,renderAccount:renderAccount,openSignup:openSignup};

  document.addEventListener("click",function(e){
    var button=e.target&&e.target.closest?e.target.closest('[data-page="account"]'):null;
    if(!button)return;
    e.preventDefault();e.stopImmediatePropagation();
    var m=document.getElementById("shiftfit-settings-split-modal");if(m)m.classList.add("open");
    renderAccount();
  },true);

  window.addEventListener("shiftfitAuthChanged",function(){if(document.getElementById("shiftfit-account-state"))paintAccount();});
})();
