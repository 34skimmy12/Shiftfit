/* ShiftFit Avatar Sync — keep the Home avatar and Profile photo on the same stored image. */
(function(){
  "use strict";
  if(window.__shiftFitAvatarSyncLoaded)return;
  window.__shiftFitAvatarSyncLoaded=true;
  var KEY="shiftfit:v1:profilePicture";
  function photo(){try{return localStorage.getItem(KEY)||"";}catch(_){return "";}}
  function apply(){
    var src=photo();
    document.querySelectorAll(".avatar, .shiftfit-profile-photo, .profile-avatar").forEach(function(el){
      if(src){el.style.backgroundImage='url("'+src.replace(/"/g,'\\"')+'")';el.style.backgroundSize="cover";el.style.backgroundPosition="center";el.classList.add("has-photo");if(el.classList.contains("shiftfit-profile-photo"))el.textContent="";}
      else{el.style.backgroundImage="";el.classList.remove("has-photo");}
    });
  }
  function boot(){
    apply();
    setTimeout(apply,100);
    setTimeout(apply,500);
    setTimeout(apply,1500);
    if(window.__shiftFitAvatarObserver)return;
    window.__shiftFitAvatarObserver=new MutationObserver(function(){apply();});
    if(document.body)window.__shiftFitAvatarObserver.observe(document.body,{childList:true,subtree:true});
    window.addEventListener("storage",function(e){if(e.key===KEY)apply();});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
  window.shiftfitApplyAvatar=apply;
})();
