/* ShiftFit: compact Settings rows. Visual-only; does not move, remove, or rename tabs. */
(function(){
  "use strict";
  if(window.__shiftFitSettingsCompactLoaded)return;
  window.__shiftFitSettingsCompactLoaded=true;
  function install(){
    var root=document.querySelector("#settingsScreen, .settings-screen, [data-screen='settings']");
    if(!root){
      var headings=[...document.querySelectorAll("h1,h2")];
      var h=headings.find(function(x){return x.textContent.trim()==="Settings";});
      root=h&&h.closest("main,section,.screen,div");
    }
    if(!root)return;
    if(document.getElementById("shiftfit-settings-compact-style"))return;
    var style=document.createElement("style");
    style.id="shiftfit-settings-compact-style";
    style.textContent=`
      /* Settings only: compact row sizing */
      #settingsScreen .group button,
      #settingsScreen .settings-row,
      #settingsScreen .setting-row,
      #settingsScreen .menu-row,
      #settingsScreen .row-item,
      .settings-screen .group button,
      .settings-screen .settings-row,
      .settings-screen .setting-row,
      .settings-screen .menu-row,
      [data-screen="settings"] .group button,
      [data-screen="settings"] .settings-row,
      [data-screen="settings"] .setting-row,
      [data-screen="settings"] .menu-row { min-height:72px !important; padding-top:10px !important; padding-bottom:10px !important; }
      #settingsScreen .group button > div,
      .settings-screen .group button > div,
      [data-screen="settings"] .group button > div { gap:12px !important; }
      #settingsScreen .group button .icon,
      #settingsScreen .settings-row .icon,
      .settings-screen .group button .icon,
      .settings-screen .settings-row .icon,
      [data-screen="settings"] .group button .icon,
      [data-screen="settings"] .settings-row .icon { width:52px !important; height:52px !important; min-width:52px !important; }
      #settingsScreen .group button h3,
      #settingsScreen .group button strong,
      .settings-screen .group button h3,
      .settings-screen .group button strong,
      [data-screen="settings"] .group button h3,
      [data-screen="settings"] .group button strong { font-size:18px !important; line-height:1.15 !important; }
      #settingsScreen .group button p,
      #settingsScreen .group button small,
      .settings-screen .group button p,
      .settings-screen .group button small,
      [data-screen="settings"] .group button p,
      [data-screen="settings"] .group button small { font-size:14px !important; line-height:1.2 !important; margin-top:4px !important; }
    `;
    document.head.appendChild(style);
  }
  function boot(){install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
