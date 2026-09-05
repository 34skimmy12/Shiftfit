/* ShiftFit Theme Engine v4 — neutral product palette with restrained purple accent. */
(function(){
  "use strict";
  const STORE="shiftfitSettings";
  function read(){try{return JSON.parse(localStorage.getItem(STORE)||"{}");}catch(_){return {};}}
  function systemTheme(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
  function apply(){const saved=read();const mode=saved.appearance||"dark";const actual=mode==="system"?systemTheme():mode;document.documentElement.dataset.shiftfitAppearance=actual;}
  function styles(){
    if(document.getElementById("shiftfit-theme-style"))return;
    const s=document.createElement("style");s.id="shiftfit-theme-style";
    s.textContent=`
:root{--sf-purple:#7657d9;--sf-purple2:#5e43b5;--sf-accent:#7657d9;}

/* GLOBAL DESIGN RESET: purple is an accent, never a surface/background. */
html[data-shiftfit-appearance="dark"]{
  color-scheme:dark;
  --bg:#0b0d12!important;--card:#15181f!important;--border:#292e38!important;
  --text:#f5f6f8!important;--muted:#9da4b2!important;
  --purple:#7657d9!important;--purple2:#5e43b5!important;--purple-light:#a996ed!important;
}
html[data-shiftfit-appearance="dark"] body{
  background:#0b0d12!important;color:#f5f6f8!important;
  background-image:none!important;
}
html[data-shiftfit-appearance="dark"] body::before{display:none!important;}

/* Neutralise the old purple-heavy cards, panels and gradients across every screen. */
html[data-shiftfit-appearance="dark"] .today-plan,
html[data-shiftfit-appearance="dark"] .meal-summary,
html[data-shiftfit-appearance="dark"] .progress-card,
html[data-shiftfit-appearance="dark"] .exercise-card,
html[data-shiftfit-appearance="dark"] .workout-stat,
html[data-shiftfit-appearance="dark"] .action-card,
html[data-shiftfit-appearance="dark"] .ai-card,
html[data-shiftfit-appearance="dark"] [class*="meal-card"],
html[data-shiftfit-appearance="dark"] [class*="workout-card"],
html[data-shiftfit-appearance="dark"] [class*="progress-card"],
html[data-shiftfit-appearance="dark"] [class*="summary-card"],
html[data-shiftfit-appearance="dark"] [class*="coach-card"]{
  background:#15181f!important;background-image:none!important;
  border-color:#292e38!important;box-shadow:0 8px 24px rgba(0,0,0,.20)!important;
}
html[data-shiftfit-appearance="dark"] .meal-card,
html[data-shiftfit-appearance="dark"] [class*="meal-card"]{background:#171a21!important;}
html[data-shiftfit-appearance="dark"] .workout-card,
html[data-shiftfit-appearance="dark"] [class*="workout-card"]{background:#151b20!important;}

/* Purple remains for actions and brand only. */
html[data-shiftfit-appearance="dark"] .action-button,
html[data-shiftfit-appearance="dark"] .save,
html[data-shiftfit-appearance="dark"] .primary,
html[data-shiftfit-appearance="dark"] .primary-btn,
html[data-shiftfit-appearance="dark"] .add-food,
html[data-shiftfit-appearance="dark"] .add-water{
  background:#7657d9!important;border-color:#7657d9!important;color:#fff!important;
  box-shadow:0 7px 16px rgba(118,87,217,.18)!important;
}
html[data-shiftfit-appearance="dark"] .secondary{background:#15181f!important;border-color:#303641!important;color:#c5b9f3!important;}
html[data-shiftfit-appearance="dark"] .ai-bot{background:#292432!important;box-shadow:none!important;}
html[data-shiftfit-appearance="dark"] .ai-card{border-color:#30323a!important;background:#15181f!important;}
html[data-shiftfit-appearance="dark"] .ai-arrow{color:#a996ed!important;}
html[data-shiftfit-appearance="dark"] .workout-day,
html[data-shiftfit-appearance="dark"] .meal-kicker,
html[data-shiftfit-appearance="dark"] .setup-kicker,
html[data-shiftfit-appearance="dark"] .shopping-kicker{color:#a996ed!important;}

/* Light mode. */
html[data-shiftfit-appearance="light"]{
  color-scheme:light;
  --sf-bg:#f5f6f8;--sf-surface:#fff;--sf-border:#e1e4ea;--sf-text:#171a21;--sf-muted:#697181;
  --sf-purple:#7657d9;--sf-purple2:#5e43b5;
}
html[data-shiftfit-appearance="light"] body{background:#f5f6f8!important;color:#171a21!important;background-image:none!important;}
html[data-shiftfit-appearance="light"] body::before{display:none!important;}
html[data-shiftfit-appearance="light"] .app{background:transparent!important;}
html[data-shiftfit-appearance="light"] .logo-shift,html[data-shiftfit-appearance="light"] .logo .shift{color:#171a21!important;}
html[data-shiftfit-appearance="light"] .logo-fit,html[data-shiftfit-appearance="light"] .logo .fit{color:#7657d9!important;text-shadow:none!important;}
html[data-shiftfit-appearance="light"] .logo-bolt,html[data-shiftfit-appearance="light"] .logo .bolt{color:#d88412!important;text-shadow:none!important;}
html[data-shiftfit-appearance="light"] .menu-btn,html[data-shiftfit-appearance="light"] .profile-btn{color:#252932!important;}
html[data-shiftfit-appearance="light"] .today-plan,html[data-shiftfit-appearance="light"] .meal-summary,html[data-shiftfit-appearance="light"] .progress-card,html[data-shiftfit-appearance="light"] .exercise-card,html[data-shiftfit-appearance="light"] .workout-stat,html[data-shiftfit-appearance="light"] .action-card,html[data-shiftfit-appearance="light"] .ai-card,html[data-shiftfit-appearance="light"] [class*="meal-card"],html[data-shiftfit-appearance="light"] [class*="workout-card"],html[data-shiftfit-appearance="light"] [class*="progress-card"],html[data-shiftfit-appearance="light"] [class*="summary-card"],html[data-shiftfit-appearance="light"] [class*="coach-card"]{background:#fff!important;background-image:none!important;border-color:#e1e4ea!important;box-shadow:0 8px 24px rgba(20,25,40,.055)!important;color:#171a21!important;}
html[data-shiftfit-appearance="light"] .user-level,html[data-shiftfit-appearance="light"] .subtitle,html[data-shiftfit-appearance="light"] .muted,html[data-shiftfit-appearance="light"] .copy,html[data-shiftfit-appearance="light"] .description{color:#697181!important;}
html[data-shiftfit-appearance="light"] .action-button,html[data-shiftfit-appearance="light"] .save,html[data-shiftfit-appearance="light"] .primary,html[data-shiftfit-appearance="light"] .primary-btn,html[data-shiftfit-appearance="light"] .add-food,html[data-shiftfit-appearance="light"] .add-water{background:#7657d9!important;border-color:#7657d9!important;color:#fff!important;box-shadow:0 7px 16px rgba(118,87,217,.18)!important;}
html[data-shiftfit-appearance="light"] .secondary{background:#fff!important;border-color:#d7dbe3!important;color:#5e43b5!important;}
html[data-shiftfit-appearance="light"] input,html[data-shiftfit-appearance="light"] select,html[data-shiftfit-appearance="light"] textarea,html[data-shiftfit-appearance="light"] .field{background:#fff!important;color:#171a21!important;border-color:#d7dbe3!important;box-shadow:none!important;}
html[data-shiftfit-appearance="light"] .progress-track,html[data-shiftfit-appearance="light"] .bar-bg,html[data-shiftfit-appearance="light"] [class*="progress-track"]{background:#e9ebef!important;}

/* Settings */
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal{background:rgba(15,20,35,.18)!important;backdrop-filter:blur(10px);}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .sheet{background:#f5f6f8!important;color:#171a21!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group{background:#fff!important;border-color:#e1e4ea!important;box-shadow:0 8px 24px rgba(20,25,40,.055)!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .group h3{color:#7657d9!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .item{color:#171a21!important;border-top-color:#eceef2!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .icon{background:#f0edf9!important;box-shadow:none!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .arrow{color:#7657d9!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .back{background:#fff!important;border-color:#d7dbe3!important;color:#20242d!important;box-shadow:0 4px 14px rgba(30,40,65,.06);}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .subtitle,html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .copy{color:#697181!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .value,html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .note{color:#747d8e!important;}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .toast{background:#fff!important;border-color:#d9dde5!important;color:#171a21!important;box-shadow:0 10px 26px rgba(20,30,50,.10);}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .shift{color:#171a21!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .fit{color:#7657d9!important;text-shadow:none!important}
html[data-shiftfit-appearance="light"] #shiftfit-settings-split-modal .logo .bolt{color:#d88412!important;text-shadow:none!important}

/* Navigation and shared chrome */
html[data-shiftfit-appearance="dark"] .bottom-nav,html[data-shiftfit-appearance="dark"] nav.bottom-nav{background:rgba(11,13,18,.96)!important;border-top-color:#292e38!important;box-shadow:0 -6px 20px rgba(0,0,0,.22)!important;}
html[data-shiftfit-appearance="light"] .bottom-nav,html[data-shiftfit-appearance="light"] nav.bottom-nav{background:rgba(255,255,255,.97)!important;border-top-color:#e1e4ea!important;box-shadow:0 -6px 20px rgba(20,25,40,.06)!important;}
`;
    document.head.appendChild(s);
  }
  function boot(){styles();apply();window.addEventListener("shiftfitSettingsChanged",apply);if(window.matchMedia){const q=window.matchMedia("(prefers-color-scheme: light)");q.addEventListener&&q.addEventListener("change",function(){if((read().appearance||"dark")==="system")apply();});}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
