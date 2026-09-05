/* ShiftFit Theme Engine v6 — dark-only product palette. */
(function(){
  "use strict";
  const STORE="shiftfitSettings";
  function read(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
  function lockDark(){try{const v=read();if(v.appearance!=="dark"){v.appearance="dark";localStorage.setItem(STORE,JSON.stringify(v));}}catch(_){} document.documentElement.dataset.shiftfitAppearance="dark";}
  function hideAppearance(){
    document.querySelectorAll('[data-page="appearance"]').forEach(function(el){el.style.display="none";});
    const modal=document.getElementById("shiftfit-settings-split-modal");
    if(modal){modal.querySelectorAll('[data-k="appearance"]').forEach(function(el){el.closest(".group")?.remove();});}
  }
  function styles(){
    if(document.getElementById("shiftfit-theme-style"))return;
    const s=document.createElement("style");s.id="shiftfit-theme-style";
    s.textContent=`
:root{color-scheme:dark;--sf-purple:#7657d9;--sf-purple2:#5e43b5;--sf-accent:#7657d9;--bg:#0b0d12;--card:#15181f;--border:#292e38;--text:#f5f6f8;--muted:#9da4b2;--purple:#7657d9;--purple2:#5e43b5;--purple-light:#a996ed;}
html,html[data-shiftfit-appearance="light"],html[data-shiftfit-appearance="system"]{color-scheme:dark!important;background:#0b0d12!important;}
body{background:#0b0d12!important;color:#f5f6f8!important;background-image:none!important;}
body::before{display:none!important;}
.app{background:transparent!important;}
.logo-shift,.logo .shift{color:#f5f6f8!important;}
.logo-fit,.logo .fit{color:#7657d9!important;text-shadow:none!important;}
.logo-bolt,.logo .bolt{color:#c8750b!important;text-shadow:none!important;}
.today-plan,.meal-summary,.progress-card,.exercise-card,.workout-stat,.action-card,.ai-card,[class*="meal-card"],[class*="workout-card"],[class*="progress-card"],[class*="summary-card"],[class*="coach-card"],[class*="shopping"],[class*="progression"]{background:#15181f!important;background-image:none!important;border-color:#292e38!important;box-shadow:0 8px 24px rgba(0,0,0,.20)!important;color:#f5f6f8!important;}
.meal-card,[class*="meal-card"]{background:#171a21!important;}
.workout-card,[class*="workout-card"]{background:#151b20!important;}
.shopping-page,.shopping-screen,.shopping-container,.progression-page,.progression-screen,.progression-container,#shopping,#progression{background:#0b0d12!important;background-image:none!important;}
.shopping-header,.shopping-card,.shopping-list,.shopping-item,.progression-header,.progression-card,.progression-list,.progression-item{background:#15181f!important;background-image:none!important;border-color:#292e38!important;color:#f5f6f8!important;}
.shopping-kicker,.progression-kicker,.shopping-title,.progression-title,h1,h2,h3,h4,strong,.title{color:#f5f6f8!important;}
.subtitle,.muted,.copy,.description,.user-level{color:#9da4b2!important;}
.action-button,.save,.primary,.primary-btn,.add-food,.add-water{background:#7657d9!important;border-color:#7657d9!important;color:#fff!important;box-shadow:0 7px 16px rgba(118,87,217,.18)!important;}
.secondary{background:#15181f!important;border-color:#303641!important;color:#c5b9f3!important;}
input,select,textarea,.field{background:#11141a!important;color:#f5f6f8!important;border-color:#303641!important;}
.progress-track,.bar-bg,[class*="progress-track"]{background:#242832!important;}
.bottom-nav,nav.bottom-nav{background:rgba(11,13,18,.96)!important;border-top-color:#292e38!important;box-shadow:0 -6px 20px rgba(0,0,0,.22)!important;}
#shiftfit-settings-split-modal .sheet{background:linear-gradient(180deg,#08091a,#050711)!important;color:#fff!important;}
#shiftfit-settings-split-modal .group{background:linear-gradient(145deg,#11182d,#0b1020)!important;border-color:#293253!important;}
`;
    document.head.appendChild(s);
  }
  function boot(){styles();lockDark();hideAppearance();const obs=new MutationObserver(hideAppearance);obs.observe(document.documentElement,{childList:true,subtree:true});window.addEventListener("shiftfitSettingsChanged",lockDark);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
