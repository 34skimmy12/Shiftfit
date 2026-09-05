/* ShiftFit Theme Engine v2 — premium light/dark/system appearance support. */
(function(){
  "use strict";
  const STORE="shiftfitSettings";
  function read(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
  function systemTheme(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
  function apply(){const saved=read();const mode=saved.appearance||"dark";const actual=mode==="system"?systemTheme():mode;document.documentElement.dataset.shiftfitAppearance=actual;}
  function styles(){if(document.getElementById("shiftfit-theme-style"))return;const s=document.createElement("style");s.id="shiftfit-theme-style";s.textContent=`
:root{--sf-purple:#7c4dff;--sf-orange:#ff9d22}
html[data-shiftfit-appearance="light"]{--sf-bg:#f3f5fa;--sf-surface:#fff;--sf-surface2:#eef1f7;--sf-border:#dce1eb;--sf-text:#151a29;--sf-muted:#687187;--sf-purple:#7040df;--sf-purple2:#5427c7}
html[data-shiftfit-appearance="light"] body{background:radial-gradient(circle at 85% -10%,rgba(124,77,255,.09),transparent 34%),linear-gradient(180deg,#fafbfe 0%,#f0f3f8 100%)!important;color:var(--sf-text)!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal{background:rgba(15,20,35,.22)!important;backdrop-filter:blur(8px)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet{background:radial-gradient(circle at 100% 0%,rgba(124,77,255,.08),transparent 28%),linear-gradient(180deg,#fbfcff 0%,#f1f4f9 100%)!important;color:var(--sf-text)!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal h1{letter-spacing:-1.2px}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .back{background:rgba(255,255,255,.86)!important;border-color:#d7ddea!important;color:#202534!important;box-shadow:0 5px 18px rgba(30,40,65,.08)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .subtitle,html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .copy{color:#687187!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group{background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(247,249,253,.98))!important;border-color:#dce1eb!important;box-shadow:0 12px 32px rgba(35,45,70,.07),inset 0 1px 0 rgba(255,255,255,.9)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group h3{color:#6840c5!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item{color:#161a26!important;border-top-color:#e7eaf0!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item:active{background:rgba(124,77,255,.06)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .icon{background:linear-gradient(145deg,rgba(124,77,255,.15),rgba(124,77,255,.07));box-shadow:inset 0 1px 0 rgba(255,255,255,.8)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .arrow{color:#7650d7}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .value,html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .note{color:#7a8397!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .field{background:#fff!important;border-color:#cfd6e3!important;color:#161a26!important;box-shadow:0 4px 14px rgba(30,40,65,.05)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .save{box-shadow:0 10px 24px rgba(112,64,223,.22)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .secondary{background:#fff!important;border-color:#cfd6e3!important;color:#5030a6!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal{color:#4e586e!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal h2{color:#161a26!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .toast{background:rgba(255,255,255,.95)!important;border-color:#d2d9e7!important;color:#161a26!important;box-shadow:0 12px 30px rgba(20,30,55,.14)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .shift{color:#161a26!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .fit{color:#7040df!important;text-shadow:0 0 12px rgba(112,64,223,.2)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .bolt{color:#f28c18!important;text-shadow:0 0 9px rgba(242,140,24,.18)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet::-webkit-scrollbar{width:5px}html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet::-webkit-scrollbar-thumb{background:#cfd5e1;border-radius:10px}
`;
    document.head.appendChild(s);
  }
  function boot(){styles();apply();window.addEventListener("shiftfitSettingsChanged",apply);if(window.matchMedia){const q=window.matchMedia("(prefers-color-scheme: light)");q.addEventListener&&q.addEventListener("change",function(){if((read().appearance||"dark")==="system")apply();});}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
