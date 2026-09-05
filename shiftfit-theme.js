/* ShiftFit Theme Engine v5 — neutral product palette, darker text, restrained purple accent. */
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

/* GLOBAL: purple is branding/action only — never a page, card or section background. */
html[data-shiftfit-appearance="dark"]{color-scheme:dark;--bg:#0b0d12!important;--card:#15181f!important;--border:#292e38!important;--text:#f5f6f8!important;--muted:#9da4b2!important;--purple:#7657d9!important;--purple2:#5e43b5!important;--purple-light:#a996ed!important;}
html[data-shiftfit-appearance="dark"] body{background:#0b0d12!important;color:#f5f6f8!important;background-image:none!important;}
html[data-shiftfit-appearance="dark"] body::before{display:none!important;}

html[data-shiftfit-appearance="dark"] .today-plan,html[data-shiftfit-appearance="dark"] .meal-summary,html[data-shiftfit-appearance="dark"] .progress-card,html[data-shiftfit-appearance="dark"] .exercise-card,html[data-shiftfit-appearance="dark"] .workout-stat,html[data-shiftfit-appearance="dark"] .action-card,html[data-shiftfit-appearance="dark"] .ai-card,html[data-shiftfit-appearance="dark"] [class*="meal-card"],html[data-shiftfit-appearance="dark"] [class*="workout-card"],html[data-shiftfit-appearance="dark"] [class*="progress-card"],html[data-shiftfit-appearance="dark"] [class*="summary-card"],html[data-shiftfit-appearance="dark"] [class*="coach-card"],html[data-shiftfit-appearance="dark"] [class*="shopping"],html[data-shiftfit-appearance="dark"] [class*="progression"]{background:#15181f!important;background-image:none!important;border-color:#292e38!important;box-shadow:0 8px 24px rgba(0,0,0,.20)!important;}
html[data-shiftfit-appearance="dark"] .meal-card,html[data-shiftfit-appearance="dark"] [class*="meal-card"]{background:#171a21!important;}
html[data-shiftfit-appearance="dark"] .workout-card,html[data-shiftfit-appearance="dark"] [class*="workout-card"]{background:#151b20!important;}

/* Explicitly flatten Shopping + Progression pages/components. */
html[data-shiftfit-appearance="dark"] .shopping-page,html[data-shiftfit-appearance="dark"] .shopping-screen,html[data-shiftfit-appearance="dark"] .shopping-container,html[data-shiftfit-appearance="dark"] .progression-page,html[data-shiftfit-appearance="dark"] .progression-screen,html[data-shiftfit-appearance="dark"] .progression-container,html[data-shiftfit-appearance="dark"] #shopping,html[data-shiftfit-appearance="dark"] #progression{background:#0b0d12!important;background-image:none!important;}
html[data-shiftfit-appearance="dark"] .shopping-header,html[data-shiftfit-appearance="dark"] .shopping-card,html[data-shiftfit-appearance="dark"] .shopping-list,html[data-shiftfit-appearance="dark"] .shopping-item,html[data-shiftfit-appearance="dark"] .progression-header,html[data-shiftfit-appearance="dark"] .progression-card,html[data-shiftfit-appearance="dark"] .progression-list,html[data-shiftfit-appearance="dark"] .progression-item{background:#15181f!important;background-image:none!important;border-color:#292e38!important;color:#f5f6f8!important;}
html[data-shiftfit-appearance="dark"] .shopping-kicker,html[data-shiftfit-appearance="dark"] .progression-kicker,html[data-shiftfit-appearance="dark"] .shopping-title,html[data-shiftfit-appearance="dark"] .progression-title{color:#f5f6f8!important;}

/* Light mode — darker text throughout. */
html[data-shiftfit-appearance="light"]{color-scheme:light;--sf-bg:#f5f6f8;--sf-surface:#fff;--sf-border:#d9dde5;--sf-text:#11141a;--sf-muted:#3f4857;--sf-purple:#7657d9;--sf-purple2:#5e43b5;}
html[data-shiftfit-appearance="light"] body{background:#f5f6f8!important;color:#11141a!important;background-image:none!important;}
html[data-shiftfit-appearance="light"] body::before{display:none!important;}
html[data-shiftfit-appearance="light"] .app{background:transparent!important;}
html[data-shiftfit-appearance="light"] .logo-shift,html[data-shiftfit-appearance="light"] .logo .shift{color:#11141a!important;}
html[data-shiftfit-appearance="light"] .logo-fit,html[data-shiftfit-appearance="light"] .logo .fit{color:#7657d9!important;text-shadow:none!important;}
html[data-shiftfit-appearance="light"] .logo-bolt,html[data-shiftfit-appearance="light"] .logo .bolt{color:#c8750b!important;text-shadow:none!important;}
html[data-shiftfit-appearance="light"] .menu-btn,html[data-shiftfit-appearance="light"] .profile-btn{color:#1b2028!important;}
html[data-shiftfit-appearance="light"] .today-plan,html[data-shiftfit-appearance="light"] .meal-summary,html[data-shiftfit-appearance="light"] .progress-card,html[data-shiftfit-appearance="light"] .exercise-card,html[data-shiftfit-appearance="light"] .workout-stat,html[data-shiftfit-appearance="light"] .action-card,html[data-shiftfit-appearance="light"] .ai-card,html[data-shiftfit-appearance="light"] [class*="meal-card"],html[data-shiftfit-appearance="light"] [class*="workout-card"],html[data-shiftfit-appearance="light"] [class*="progress-card"],html[data-shiftfit-appearance="light"] [class*="summary-card"],html[data-shiftfit-appearance="light"] [class*="coach-card"],html[data-shiftfit-appearance="light"] [class*="shopping"],html[data-shiftfit-appearance="light"] [class*="progression"]{background:#fff!important;background-image:none!important;border-color:#d9dde5!important;box-shadow:0 8px 24px rgba(20,25,40,.055)!important;color:#11141a!important;}
html[data-shiftfit-appearance="light"] .user-level,html[data-shiftfit-appearance="light"] .subtitle,html[data-shiftfit-appearance="light"] .muted,html[data-shiftfit-appearance="light"] .copy,html[data-shiftfit-appearance="light"] .description{color:#3f4857!important;}
html[data-shiftfit-appearance="light"] body,html[data-shiftfit-appearance="light"] button,html[data-shiftfit-appearance="light"] input,html[data-shiftfit-appearance="light"] select,html[data-shiftfit-appearance="light"] textarea{font-weight:inherit;}
html[data-shiftfit-appearance="light"] h1,html[data-shiftfit-appearance="light"] h2,html[data-shiftfit-appearance="light"] h3,html[data-shiftfit-appearance="light"] h4,html[data-shiftfit-appearance="light"] strong,html[data-shiftfit-appearance="light"] .title{color:#11141a!important;}

/* Explicitly flatten Shopping + Progression in light mode too. */
html[data-shiftfit-appearance="light"] .shopping-page,html[data-shiftfit-appearance="light"] .shopping-screen,html[data-shiftfit-appearance="light"] .shopping-container,html[data-shiftfit-appearance="light"] .progression-page,html[data-shiftfit-appearance="light"] .progression-screen,html[data-shiftfit-appearance="light"] .progression-container,html[data-shiftfit-appearance="light"] #shopping,html[data-shiftfit-appearance="light"] #progression{background:#f5f6f8!important;background-image:none!important;}
html[data-shiftfit-appearance="light"] .shopping-header,html[data-shiftfit-appearance="light"] .shopping-card,html[data-shiftfit-appearance="light"] .shopping-list,html[data-shiftfit-appearance="light"] .shopping-item,html[data-shiftfit-appearance="light"] .progression-header,html[data-shiftfit-appearance="light"] .progression-card,html[data-shiftfit-appearance="light"] .progression-list,html[data-shiftfit-appearance="light"] .progression-item{background:#fff!important;background-image:none!important;border-color:#d9dde5!important;color:#11141a!important;}
html[data-shiftfit-appearance="light"] .shopping-kicker,html[data-shiftfit-appearance="light"] .progression-kicker,html[data-shiftfit-appearance="light"] .shopping-title,html[data-shiftfit-appearance="light"] .progression-title{color:#11141a!important;}

/* Purple remains for primary actions and brand only. */
html[data-shiftfit-appearance="dark"] .action-button,html[data-shiftfit-appearance="dark"] .save,html[data-shiftfit-appearance="dark"] .primary,html[data-shiftfit-appearance="dark"] .primary-btn,html[data-shiftfit-appearance="dark"] .add-food,html[data-shiftfit-appearance="dark"] .add-water,html[data-shiftfit-appearance="light"] .action-button,html[data-shiftfit-appearance="light"] .save,html[data-shiftfit-appearance="light"] .primary,html[data-shiftfit-appearance="light"] .primary-btn,html[data-shiftfit-appearance="light"] .add-food,html[data-shiftfit-appearance="light"] .add-water{background:#7657d9!important;border-color:#7657d9!important;color:#fff!important;box-shadow:0 7px 16px rgba(118,87,217,.18)!important;}
html[data-shiftfit-appearance="dark"] .secondary{background:#15181f!important;border-color:#303641!important;color:#c5b9f3!important;}
html[data-shiftfit-appearance="light"] .secondary{background:#fff!important;border-color:#d7dbe3!important;color:#5e43b5!important;}
html[data-shiftfit-appearance="dark"] input,html[data-shiftfit-appearance="dark"] select,html[data-shiftfit-appearance="dark"] textarea,html[data-shiftfit-appearance="dark"] .field{background:#11141a!important;color:#f5f6f8!important;border-color:#303641!important;}
html[data-shiftfit-appearance="light"] input,html[data-shiftfit-appearance="light"] select,html[data-shiftfit-appearance="light"] textarea,html[data-shiftfit-appearance="light"] .field{background:#fff!important;color:#11141a!important;border-color:#d7dbe3!important;box-shadow:none!important;}
html[data-shiftfit-appearance="light"] .progress-track,html[data-shiftfit-appearance="light"] .bar-bg,html[data-shiftfit-appearance="light"] [class*="progress-track"]{background:#e6e8ed!important;}

/* Navigation */
html[data-shiftfit-appearance="dark"] .bottom-nav,html[data-shiftfit-appearance="dark"] nav.bottom-nav{background:rgba(11,13,18,.96)!important;border-top-color:#292e38!important;box-shadow:0 -6px 20px rgba(0,0,0,.22)!important;}
html[data-shiftfit-appearance="light"] .bottom-nav,html[data-shiftfit-appearance="light"] nav.bottom-nav{background:rgba(255,255,255,.97)!important;border-top-color:#d9dde5!important;box-shadow:0 -6px 20px rgba(20,25,40,.06)!important;}
`;
    document.head.appendChild(s);
  }
  function boot(){styles();apply();window.addEventListener("shiftfitSettingsChanged",apply);if(window.matchMedia){const q=window.matchMedia("(prefers-color-scheme: light)");q.addEventListener&&q.addEventListener("change",function(){if((read().appearance||"dark")==="system")apply();});}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
