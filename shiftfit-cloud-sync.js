/* ShiftFit Cloud Sync v2 — authenticated per-user JSON backup/restore. */
(function(){
  "use strict";
  if(window.__shiftFitCloudSyncLoaded)return;
  window.__shiftFitCloudSyncLoaded=true;

  var APP_KEY_RE=/shiftfit|weeklyMeals|mealPreferences|shoppingItems|selectedShift|customShift/i;
  var LINK_KEY="shiftfitCloudLinkedAt";
  var LAST_SYNC_KEY="shiftfitCloudLastSync";
  var timer=null;
  var syncing=false;

  function toast(text){
    var old=document.querySelector(".toast");if(old)old.remove();
    var t=document.createElement("div");t.className="toast";t.textContent=text;document.body.appendChild(t);
    setTimeout(function(){t.remove();},3000);
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
  function markLinked(){try{localStorage.setItem(LINK_KEY,new Date().toISOString());localStorage.setItem(LAST_SYNC_KEY,new Date().toISOString());}catch(_){}
  }
  function getLastSync(){try{return localStorage.getItem(LAST_SYNC_KEY)||"";}catch(_){return "";}}
  function isLinked(){try{return !!localStorage.getItem(LINK_KEY);}catch(_){return false;}}
  function formatLastSync(){var raw=getLastSync();if(!raw)return "Not synced on this device yet";var d=new Date(raw);if(isNaN(d.getTime()))return "Last sync recorded";return "Last synced: "+d.toLocaleString([], {dateStyle:"medium",timeStyle:"short"});}

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

  async function fetchCloud(){
    var c=await client();
    var user=await currentUser();
    if(!c||!user)throw new Error("Sign in to use cloud sync.");
    var result=await c.from("user_data").select("payload,updated_at").eq("user_id",user.id).maybeSingle();
    if(result.error)throw result.error;
    return result.data||null;
  }

  async function syncNow(options){
    options=options||{};
    if(syncing)return false;
    syncing=true;
    try{
      var cloud=await fetchCloud();
      var local=snapshot();
      var payload=hasLocalData(local)?local:(cloud&&cloud.payload&&typeof cloud.payload==="object"?cloud.payload:{});
      var c=await client();
      var user=await currentUser();
      var upsert=await c.from("user_data").upsert({user_id:user.id,payload:payload,updated_at:new Date().toISOString()},{onConflict:"user_id"});
      if(upsert.error)throw upsert.error;
      markLinked();
      toast(options.auto?"ShiftFit data backed up.":"ShiftFit data synced securely.");
      window.dispatchEvent(new CustomEvent("shiftfitCloudSynced",{detail:{count:Object.keys(payload).length,lastSync:getLastSync()}}));
      return true;
    }catch(error){
      console.warn("ShiftFit cloud sync failed.",error);
      toast(error&&error.message?"Sync failed: "+error.message:"Sync failed. Please try again.");
      return false;
    }finally{syncing=false;}
  }

  async function restoreCloud(options){
    options=options||{};
    if(syncing)return false;
    syncing=true;
    try{
      var cloud=await fetchCloud();
      var payload=cloud&&cloud.payload;
      if(!payload||typeof payload!=="object"||!Object.keys(payload).length){toast("No cloud backup was found for this account.");return false;}
      var restored=restore(payload);
      markLinked();
      toast(restored?"Cloud data restored. Reloading ShiftFit…":"Cloud backup is empty.");
      window.dispatchEvent(new CustomEvent("shiftfitCloudRestored",{detail:{count:restored,lastSync:getLastSync()}}));
      if(restored&&options.reload!==false)setTimeout(function(){window.location.reload();},650);
      return restored>0;
    }catch(error){
      console.warn("ShiftFit cloud restore failed.",error);
      toast(error&&error.message?"Restore failed: "+error.message:"Restore failed. Please try again.");
      return false;
    }finally{syncing=false;}
  }

  function schedule(){
    clearTimeout(timer);
    if(!isLinked())return;
    timer=setTimeout(function(){currentUser().then(function(user){if(user)syncNow({auto:true});});},1800);
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
      e.preventDefault();e.stopImmediatePropagation();syncNow();
    },true);
  }

  async function boot(){
    interceptSyncButton();
    watchStorage();
    if(window.shiftfitAuth&&window.shiftfitAuth.ready)await window.shiftfitAuth.ready;
    var user=await currentUser();
    if(user&&!isLinked()){
      var local=snapshot();
      if(!hasLocalData(local)){
        var cloud=await fetchCloud().catch(function(){return null;});
        if(cloud&&cloud.payload&&typeof cloud.payload==="object"&&Object.keys(cloud.payload).length){
          restore(cloud.payload);markLinked();window.dispatchEvent(new CustomEvent("shiftfitCloudRestored",{detail:{count:Object.keys(cloud.payload).length,lastSync:getLastSync()}}));
        }
      }
    }
  }

  window.shiftfitCloudSync={sync:syncNow,restoreCloud:restoreCloud,snapshot:snapshot,restore:restore,getLastSync:getLastSync,isLinked:isLinked,formatLastSync:formatLastSync};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
