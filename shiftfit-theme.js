/* ShiftFit Theme Engine v1 — light/dark/system appearance support. */
(function(){
  "use strict";
  const STORE="shiftfitSettings";
  function read(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
  function systemTheme(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
  function apply(){const saved=read();const mode=saved.appearance||"dark";const actual=mode==="system"?systemTheme():mode;document.documentElement.dataset.shiftfitAppearance=actual;}
  function styles(){if(document.getElementById("shiftfit-theme-style"))return;const s=document.createElement("style");s.id="shiftfit-theme-style";s.textContent=`
html[data-shiftfit-appearance="light"]{--sf-bg:#f4f6fb;--sf-surface:#ffffff;--sf-surface2:#eef1f7;--sf-border:#d8deea;--sf-text:#161a26;--sf-muted:#687187;--sf-purple:#7040df;--sf-purple2:#5427c7}
html[data-shiftfit-appearance="light"] body{background:var(--sf-bg)!important;color:var(--sf-text)!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal{background:rgba(15,20,35,.28)!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet{background:linear-gradient(180deg,#f8f9fc 0%,#f1f4f9 100%)!important;color:var(--sf-text)!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .back{background:#fff!important;border-color:#d5dbe7!important;color:#202534!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .subtitle,
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .copy{color:#687187!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group{background:#fff!important;border-color:#d8deea!important;box-shadow:0 8px 24px rgba(35,45,70,.06)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group h3{color:#6840c5!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item{color:#161a26!important;border-top-color:#e7eaf0!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .value,
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .note{color:#7a8397!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .field{background:#f8f9fc!important;border-color:#cfd6e3!important;color:#161a26!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .secondary{background:#f4f6fa!important;border-color:#cfd6e3!important;color:#5030a6!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal{color:#4e586e!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal h2{color:#161a26!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .toast{background:#fff!important;border-color:#d2d9e7!important;color:#161a26!important;box-shadow:0 8px 25px rgba(20,30,55,.12)}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .shift{color:#161a26!important}
`;
    document.head.appendChild(s);
  }
  function boot(){styles();apply();window.addEventListener("shiftfitSettingsChanged",apply);if(window.matchMedia){const q=window.matchMedia("(prefers-color-scheme: light)");q.addEventListener&&q.addEventListener("change",function(){if((read().appearance||"dark")==="system")apply();});}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
