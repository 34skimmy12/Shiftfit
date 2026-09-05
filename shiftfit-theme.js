/* ShiftFit Theme Engine v3 — polished, product-grade light/dark/system appearance. */
(function(){
  "use strict";
  const STORE="shiftfitSettings";
  function read(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
  function systemTheme(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
  function apply(){const saved=read();const mode=saved.appearance||"dark";const actual=mode==="system"?systemTheme():mode;document.documentElement.dataset.shiftfitAppearance=actual;}
  function styles(){
    if(document.getElementById("shiftfit-theme-style"))return;
    const s=document.createElement("style");
    s.id="shiftfit-theme-style";
    s.textContent=`
:root{
  --sf-purple:#7c4dff;
  --sf-orange:#ff9d22;
}

/* LIGHT MODE — intentionally clean and premium, not a dark UI placed on a pale page. */
html[data-shiftfit-appearance="light"]{
  color-scheme:light;
  --sf-bg:#f6f7fb;
  --sf-surface:#ffffff;
  --sf-surface2:#f1f3f8;
  --sf-border:#e2e5ed;
  --sf-text:#171925;
  --sf-muted:#687083;
  --sf-purple:#6741d9;
  --sf-purple2:#4f2bb8;
  --sf-green:#138a5a;
  --sf-orange:#c96b08;
}

html[data-shiftfit-appearance="light"] body{
  background:#f6f7fb!important;
  color:var(--sf-text)!important;
}

html[data-shiftfit-appearance="light"] body::before{
  display:none!important;
}

html[data-shiftfit-appearance="light"] .app{
  background:transparent!important;
}

/* Brand */
html[data-shiftfit-appearance="light"] .logo-shift,
html[data-shiftfit-appearance="light"] .logo .shift{
  color:#171925!important;
}
html[data-shiftfit-appearance="light"] .logo-fit,
html[data-shiftfit-appearance="light"] .logo .fit{
  color:#6741d9!important;
  text-shadow:none!important;
}
html[data-shiftfit-appearance="light"] .logo-bolt,
html[data-shiftfit-appearance="light"] .logo .bolt{
  color:#e58a10!important;
  text-shadow:none!important;
}
html[data-shiftfit-appearance="light"] .menu-btn,
html[data-shiftfit-appearance="light"] .profile-btn{
  color:#252938!important;
}

/* Core cards: crisp white surfaces, restrained borders and one consistent shadow. */
html[data-shiftfit-appearance="light"] .today-plan,
html[data-shiftfit-appearance="light"] .meal-summary,
html[data-shiftfit-appearance="light"] .meal-card,
html[data-shiftfit-appearance="light"] .meal-item,
html[data-shiftfit-appearance="light"] .workout-card,
html[data-shiftfit-appearance="light"] .progress-card,
html[data-shiftfit-appearance="light"] .water-card,
html[data-shiftfit-appearance="light"] .calendar-card,
html[data-shiftfit-appearance="light"] .coach-card,
html[data-shiftfit-appearance="light"] .ai-coach-card,
html[data-shiftfit-appearance="light"] .shopping-card,
html[data-shiftfit-appearance="light"] .summary-card{
  background:#fff!important;
  border-color:#e1e4ec!important;
  box-shadow:0 8px 24px rgba(22,27,45,.06)!important;
  color:#171925!important;
}

/* Catch the existing meal/workout components even where their exact class differs. */
html[data-shiftfit-appearance="light"] [class*="meal-card"],
html[data-shiftfit-appearance="light"] [class*="workout-card"],
html[data-shiftfit-appearance="light"] [class*="progress-card"],
html[data-shiftfit-appearance="light"] [class*="summary-card"]{
  background:#fff!important;
  border-color:#e1e4ec!important;
  box-shadow:0 8px 24px rgba(22,27,45,.06)!important;
  color:#171925!important;
}

/* Remove the purple blobs/strong gradients that made the light UI look unfinished. */
html[data-shiftfit-appearance="light"] .today-plan,
html[data-shiftfit-appearance="light"] .meal-summary,
html[data-shiftfit-appearance="light"] [class*="meal-card"],
html[data-shiftfit-appearance="light"] [class*="workout-card"]{
  background-image:none!important;
}

html[data-shiftfit-appearance="light"] .user-level,
html[data-shiftfit-appearance="light"] .subtitle,
html[data-shiftfit-appearance="light"] .muted,
html[data-shiftfit-appearance="light"] .copy,
html[data-shiftfit-appearance="light"] .description{
  color:#687083!important;
}

/* Buttons */
html[data-shiftfit-appearance="light"] button{
  -webkit-font-smoothing:antialiased;
}
html[data-shiftfit-appearance="light"] .save,
html[data-shiftfit-appearance="light"] .primary,
html[data-shiftfit-appearance="light"] .primary-btn,
html[data-shiftfit-appearance="light"] .add-food,
html[data-shiftfit-appearance="light"] .add-water{
  background:linear-gradient(180deg,#7047e5,#5d35cb)!important;
  border-color:#5d35cb!important;
  color:#fff!important;
  box-shadow:0 8px 18px rgba(103,65,217,.22)!important;
}
html[data-shiftfit-appearance="light"] .secondary{
  background:#fff!important;
  border-color:#d8dce6!important;
  color:#5533b5!important;
}

/* Form controls */
html[data-shiftfit-appearance="light"] input,
html[data-shiftfit-appearance="light"] select,
html[data-shiftfit-appearance="light"] textarea,
html[data-shiftfit-appearance="light"] .field{
  background:#fff!important;
  color:#171925!important;
  border-color:#d7dbe5!important;
  box-shadow:0 2px 7px rgba(22,27,45,.03)!important;
}

/* Progress bars */
html[data-shiftfit-appearance="light"] .progress-track,
html[data-shiftfit-appearance="light"] .bar-bg,
html[data-shiftfit-appearance="light"] [class*="progress-track"]{
  background:#e9ebf1!important;
}

/* Settings */
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal{
  background:rgba(15,20,35,.20)!important;
  backdrop-filter:blur(10px);
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet{
  background:#f7f8fb!important;
  color:#171925!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal h1{
  letter-spacing:-1.2px;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .back{
  background:#fff!important;
  border-color:#d7dbe5!important;
  color:#202534!important;
  box-shadow:0 5px 16px rgba(30,40,65,.07);
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .subtitle,
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .copy{
  color:#687083!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group{
  background:#fff!important;
  border-color:#e0e3eb!important;
  box-shadow:0 8px 24px rgba(25,30,48,.055)!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group h3{
  color:#6741d9!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item{
  color:#171925!important;
  border-top-color:#eceef3!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item:active{
  background:#f6f3ff!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .icon{
  background:#f0ebff!important;
  box-shadow:none!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .arrow{
  color:#6741d9!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .value,
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .note{
  color:#737b8d!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal{
  color:#4e586e!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .legal h2{
  color:#171925!important;
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .toast{
  background:#fff!important;
  border-color:#d9dde6!important;
  color:#171925!important;
  box-shadow:0 12px 30px rgba(20,30,55,.12);
}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .shift{color:#171925!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .fit{color:#6741d9!important;text-shadow:none!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .bolt{color:#e58a10!important;text-shadow:none!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet::-webkit-scrollbar{width:5px}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet::-webkit-scrollbar-thumb{background:#cfd4df;border-radius:10px}

/* Bottom navigation */
html[data-shiftfit-appearance="light"] .bottom-nav,
html[data-shiftfit-appearance="light"] nav.bottom-nav{
  background:rgba(255,255,255,.96)!important;
  border-top-color:#e2e5ec!important;
  box-shadow:0 -6px 22px rgba(20,25,40,.07)!important;
}

/* Make the light UI feel deliberate on iOS Safari too. */
html[data-shiftfit-appearance="light"] .avatar{
  box-shadow:0 4px 14px rgba(103,65,217,.16)!important;
}

@media (min-width:501px){
  html[data-shiftfit-appearance="light"] body{background:#f3f5f9!important}
}
`;
    document.head.appendChild(s);
  }
  function boot(){
    styles();
    apply();
    window.addEventListener("shiftfitSettingsChanged",apply);
    if(window.matchMedia){
      const q=window.matchMedia("(prefers-color-scheme: light)");
      q.addEventListener&&q.addEventListener("change",function(){if((read().appearance||"dark")==="system")apply();});
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
