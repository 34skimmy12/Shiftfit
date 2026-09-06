/* ShiftFit Data & Privacy — safe local export and clear controls. */
(function(){
  "use strict";
  if(window.__shiftFitDataPrivacyLoaded)return;
  window.__shiftFitDataPrivacyLoaded=true;
  var KEY=/shiftfit|weeklyMeals|mealPreferences|shoppingItems|selectedShift|customShift/i;
  function esc(v){return String(v??"").replace(/[&<>\"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function snapshot(){var out={exportedAt:new Date().toISOString(),app:"ShiftFit",version:1,localStorage:{}};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(!k||!KEY.test(k))continue;var raw=localStorage.getItem(k);try{out.localStorage[k]=JSON.parse(raw);}catch(_){out.localStorage[k]=raw;}}return out;}
  function toast(t){var o=document.querySelector(".toast");if(o)o.remove();var x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(function(){x.remove();},2400);}
  function install(){var m=document.getElementById("shiftfit-settings-split-modal");if(!m||!m.classList.contains("open"))return;var h=m.querySelector(".backrow h1");if(!h||h.textContent.trim()!=="Data & Privacy")return;var group=m.querySelector(".group");if(!group||group.dataset.privacyEnhanced==="1")return;group.dataset.privacyEnhanced="1";group.innerHTML='<h3>YOUR DATA</h3><div class="legal">ShiftFit keeps your app data on this device unless you choose to sync it to your account. You can make a copy of your data at any time.</div><button class="save" id="shiftfit-data-export" type="button">Export my data</button><button class="secondary danger" id="shiftfit-data-clear" type="button">Clear local ShiftFit data</button><div class="note">Export creates a JSON backup of ShiftFit data stored in this browser. Clear permanently removes matching local ShiftFit data from this device. Your cloud account, if connected, is not deleted.</div>';
    document.getElementById("shiftfit-data-export").onclick=function(){var data=snapshot();var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="shiftfit-data-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);toast("ShiftFit data exported");};
    document.getElementById("shiftfit-data-clear").onclick=function(){if(!window.confirm("Clear all local ShiftFit data from this device? This cannot be undone."))return;var keys=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&KEY.test(k))keys.push(k);}keys.forEach(function(k){localStorage.removeItem(k);});toast("Local ShiftFit data cleared");setTimeout(function(){window.location.reload();},500);};
  }
  function boot(){install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
