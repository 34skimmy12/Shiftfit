/* ShiftFit Account & Sync — Google/Supabase authentication foundation. */
(function(){
  "use strict";
  if(window.__shiftFitAuthLoaded)return;
  window.__shiftFitAuthLoaded=true;

  var CLIENT=null;
  var CONFIG=null;
  var ready=null;
  var SUPABASE_CDN="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  function esc(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");}
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
  async function signIn(){var c=await getClient();if(!c)throw new Error("Google sign-in is not configured yet. Connect ShiftFit to Supabase first.");var r=await c.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}});if(r.error)throw r.error;}
  async function signOut(){var c=await getClient();if(!c)return;var r=await c.auth.signOut();if(r.error)throw r.error;}
  async function deleteAccount(){
    throw new Error("Account deletion requires the secure server-side deletion endpoint and is not enabled yet.");
  }

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
  function renderAccount(){
    var m=document.getElementById("shiftfit-settings-split-modal");if(!m)return;
    var sheet=m.querySelector(".sheet");if(!sheet)return;
    sheet.innerHTML='<div class="top"><button class="back" type="button" aria-label="Back">‹</button><div class="logo"><span class="bolt">⚡</span><span>SHIFT</span><span class="fit">FIT</span></div><div></div></div><div class="backrow"><h1>Account & Sync</h1></div><div class="subtitle">Your permanent ShiftFit account, sign-in and cloud backup.</div><div id="shiftfit-account-state"></div>';
    sheet.querySelector(".back").onclick=function(){if(window.__shiftFitSettingsHome)window.__shiftFitSettingsHome();};
    paintAccount();
  }
  async function paintAccount(){
    var box=document.getElementById("shiftfit-account-state");if(!box)return;
    box.innerHTML='<div class="group"><h3>ACCOUNT</h3><div class="legal">Checking your ShiftFit account…</div></div>';
    var c=await getClient();
    if(!c){
      box.innerHTML='<div class="group"><h3>GOOGLE SIGN-IN</h3><div class="legal"><strong>Ready to connect</strong><br>ShiftFit is prepared for Google Sign-In, but the Supabase project connection has not been configured yet.</div><button class="save" type="button" disabled>Continue with Google</button><div class="note">The next setup step is connecting the Supabase URL and publishable key to ShiftFit. No fake or temporary account is being created.</div></div>';
      return;
    }
    var s=await session();
    if(!s){
      box.innerHTML='<div class="group"><h3>YOUR PERMANENT ACCOUNT</h3><div class="legal">Sign in with Google to create or access your real ShiftFit account. Your account will remain yours as ShiftFit grows.</div><button class="save" id="shiftfit-google-signin" type="button">Continue with Google</button><div class="note">Google handles authentication. ShiftFit receives the authenticated account identity through Supabase Auth.</div></div>';
      document.getElementById("shiftfit-google-signin").onclick=async function(){this.disabled=true;this.textContent="Opening Google…";try{await signIn();}catch(e){this.disabled=false;this.textContent="Continue with Google";alert(e.message||"Google sign-in failed.");}};
      return;
    }
    var u=s.user||{};var meta=u.user_metadata||{};var name=meta.full_name||meta.name||u.email||"ShiftFit member";var avatar=meta.avatar_url||meta.picture||"";
    box.innerHTML='<div class="group"><h3>SIGNED IN</h3><div style="display:flex;align-items:center;gap:12px"><div style="width:52px;height:52px;border-radius:50%;overflow:hidden;border:1px solid #39466f;background:#11182d;display:grid;place-items:center;font-size:22px">'+(avatar?'<img src="'+esc(avatar)+'" alt="" style="width:100%;height:100%;object-fit:cover">':'👤')+'</div><div><strong>'+esc(name)+'</strong><div class="note" style="margin-top:3px">'+esc(u.email||"")+'</div></div></div><div class="legal" style="margin-top:16px"><strong>Account status:</strong> Active<br><strong>Authentication:</strong> Google<br><strong>Data:</strong> Ready for cloud sync</div><button class="save" id="shiftfit-sync-now" type="button">Sync my ShiftFit data</button><button class="secondary" id="shiftfit-signout" type="button">Sign out</button><div class="note">Your local ShiftFit data remains on this device until cloud sync is enabled for the account.</div></div>';
    document.getElementById("shiftfit-sync-now").onclick=function(){toast("Cloud sync layer is next — your account is connected.");};
    document.getElementById("shiftfit-signout").onclick=async function(){try{await signOut();paintAccount();}catch(e){alert(e.message||"Sign out failed.");}};
  }
  function toast(text){var old=document.querySelector(".toast");if(old)old.remove();var t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);setTimeout(function(){t.remove();},2400);}

  window.shiftfitAuth={ready:ready,getClient:getClient,getSession:session,signInWithGoogle:signIn,signOut:signOut,deleteAccount:deleteAccount,localSnapshot:localSnapshot,renderAccount:renderAccount};

  document.addEventListener("click",function(e){
    var button=e.target&&e.target.closest?e.target.closest('[data-page="account"]'):null;
    if(!button)return;
    e.preventDefault();e.stopImmediatePropagation();
    var m=document.getElementById("shiftfit-settings-split-modal");if(m)m.classList.add("open");
    renderAccount();
  },true);

  window.addEventListener("shiftfitAuthChanged",function(){if(document.getElementById("shiftfit-account-state"))paintAccount();});
})();
