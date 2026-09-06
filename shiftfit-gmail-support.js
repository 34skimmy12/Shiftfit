/* ShiftFit: offer Gmail compose for Support email actions, with mailto fallback. */
(function(){
  "use strict";
  if(window.__shiftFitGmailSupportLoaded)return;
  window.__shiftFitGmailSupportLoaded=true;

  var TO="support@shiftfit.app";

  function compose(subject,body){
    var s=encodeURIComponent(subject||"ShiftFit Support");
    var b=encodeURIComponent(body||"");
    var gmail="googlegmail://co?to="+encodeURIComponent(TO)+"&subject="+s+"&body="+b;
    var mailto="mailto:"+TO+"?subject="+s+"&body="+b;
    var opened=false;
    var fallback=function(){if(!opened){window.location.href=mailto;}};
    try{
      document.addEventListener("visibilitychange",function on(){
        if(document.visibilityState==="hidden")opened=true;
        document.removeEventListener("visibilitychange",on);
      },{once:true});
      window.location.href=gmail;
      setTimeout(fallback,900);
    }catch(_){window.location.href=mailto;}
  }

  function install(){
    var m=document.getElementById("shiftfit-settings-split-modal");
    if(!m||!m.classList.contains("open"))return;
    var h=m.querySelector(".backrow h1");
    if(!h||h.textContent.trim()!=="Help & Support")return;
    var groups=m.querySelectorAll(".group");
    var target=null;
    groups.forEach(function(g){
      var t=(g.textContent||"").toLowerCase();
      if(t.indexOf("need a human")>=0||t.indexOf("contact support")>=0)target=g;
    });
    if(!target||target.dataset.gmailSupportEnhanced==="1")return;
    target.dataset.gmailSupportEnhanced="1";

    var btn=document.createElement("button");
    btn.type="button";
    btn.className="secondary";
    btn.textContent="Open in Gmail";
    btn.style.marginTop="10px";
    btn.addEventListener("click",function(){
      compose("ShiftFit Support","Hi ShiftFit Support,\n\nI need help with:\n\n\nThanks.");
    });
    target.appendChild(btn);
  }

  function boot(){
    install();
    new MutationObserver(install).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
