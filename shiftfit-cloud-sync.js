/* ShiftFit Cloud Sync v1 — authenticated per-user JSON backup/restore. */
(function(){
  "use strict";
  if(window.__shiftFitCloudSyncLoaded)return;
  window.__shiftFitCloudSyncLoaded=true;

  var APP_KEY_RE=/shiftfit|weeklyMeals|mealPreferences|shoppingItems|selectedShift|customShift/i;
  var timer=null;
  var syncing=false;

  function toast(text){
    var old=document.querySelector(".toast");if(old)old.remove();
    var t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);
    setTimeout(function(){t.remove();},2600);
  }

  function snapshot(){
    var data={};
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k&&APP_KEY_RE.test(k)){
        try{data[k]=JSON.parse(localStorage.getItem(k));}catch(_){data[k]=localStorage.getItem(k);}
      }
    }
    return data;
  }

  function restore(data){
    if(!data||typeof data!=="object")return 0;
    var count=0;
    Object.keys(data).forEach(function(k){
      if(!APP_KEY_RE.test(k))return;
      try{localStorage.setItem(k,typeof data[k]==="string"?data[k]:JSON.stringify(data[k]));count++;}catch(_){}
    });
    return count;
  }

  function hasLocalData(data){return data&&Object.keys(data).length>0;}

  async function client(){
    if(window.shiftfitAuth&&typeof window.shiftfitAuth.getClient==="function")return window.shiftfitAuth.getClient();
    return null;
  }

  async function currentUser(){
    if(window.shiftfitAuth&&typeof window.shiftfitAuth.getSession==="function"){
      var s=await window.shiftfitAuth.getSession();return s&&s.user||null;
    }
    return null;
  }

  async function syncNow(options){
    options=options||{};
    if(syncing)return;
    syncing=true;
    try{
      var c=await client();
      var user=await currentUser();
      if(!c||!user){toast("Sign in to sync your ShiftFit data.");return;}

      var local=snapshot();
      var result=await c.from("user_data").select("payload,updated_at").eq("user_id",user.id).maybeSingle();
      if(result.error)throw result.error;
      var cloud=result.data&&result.data.payload;

      if(cloud&&typeof cloud==="object"&&!hasLocalData(local)){
        var restored=restore(cloud);
        toast(restored?"Your ShiftFit data was restored from the cloud.":"Your cloud account is ready.");
        window.dispatchEvent(new CustomEvent("shiftfitCloudRestored",{detail:{count:restored}}));
        return;
      }

      var payload=hasLocalData(local)?local:(cloud&&typeof cloud==="object"?cloud:{});
      var upsert=await c.from("user_data").upsert({user_id:user.id,payload:payload,updated_at:new Date().toISOString()},{onConflict:"user_id"});
      if(upsert.error)throw upsert.error;
      toast(options.auto?"ShiftFit data backed up.":"ShiftFit data synced securely.");
      window.dispatchEvent(new CustomEvent("shiftfitCloudSynced",{detail:{count:Object.keys(payload).length}}));
    }catch(error){
      console.warn("ShiftFit cloud sync failed.",error);
      toast(error&&error.message?"Sync failed: "+error.message:"Sync failed. Please try again.");
    }finally{syncing=false;}
  }

  function schedule(){
    clearTimeout(timer);
    timer=setTimeout(function(){
      currentUser().then(function(user){if(user)syncNow({auto:true});});
    },1800);
  }

  function watchStorage(){
    var originalSet=Storage.prototype.setItem;
    var originalRemove=Storage.prototype.removeItem;
    if(Storage.prototype.__shiftFitCloudPatched)return;
    Storage.prototype.__shiftFitCloudPatched=true;
    Storage.prototype.setItem=function(key,value){
      var result=originalSet.apply(this,arguments);
      if(this===localStorage&&APP_KEY_RE.test(String(key)))schedule();
      return result;
    };
    Storage.prototype.removeItem=function(key){
      var result=originalRemove.apply(this,arguments);
      if(this===localStorage&&APP_KEY_RE.test(String(key)))schedule();
      return result;
    };
  }

  function interceptSyncButton(){
    document.addEventListener("click",function(e){
      var button=e.target&&e.target.closest?e.target.closest("#shiftfit-sync-now"):null;
      if(!button)return;
      e.preventDefault();e.stopImmediatePropagation();
      syncNow();
    },true);
  }

  async function boot(){
    interceptSyncButton();
    watchStorage();
    if(window.shiftfitAuth&&window.shiftfitAuth.ready)await window.shiftfitAuth.ready;
    var user=await currentUser();
    if(user){
      var local=snapshot();
      if(!hasLocalData(local))syncNow();
    }
  }

  window.shiftfitCloudSync={sync:syncNow,snapshot:snapshot,restore:restore};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
