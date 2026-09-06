/* ShiftFit Help & Support — Support AI, FAQ, contact and bug reporting. */
(function(){
  "use strict";
  if(window.__shiftFitSupportLoaded)return;
  window.__shiftFitSupportLoaded=true;
  var SUPPORT_EMAIL="support@shiftfit.app";
  var FAQ=[
    ["How do I change my goal?","Open Profile → Goal & Nutrition, choose Lose weight, Maintain weight or Build muscle, then tap Save & Generate My Plan."],
    ["My meals did not update","Open Profile → Goal & Nutrition and tap Save & Generate My Plan again. That rebuilds the Monday–Sunday plan using your current targets."],
    ["How does cloud sync work?","Open Settings → Account & Sync. Sign in with your ShiftFit account, then use Sync my ShiftFit data. You can restore your cloud backup on another device."],
    ["I cannot sign in","Check your email and password first. If you have forgotten your password, use Forgot password? on Account & Sync and follow the reset email."],
    ["How do I export my data?","Open Settings → Data & Privacy → Export my data. ShiftFit creates a JSON backup of the data stored locally in your browser."],
    ["How do I swap a meal?","Open your weekly meal plan and use the meal swap controls available on the meal you want to change. Your other plan settings remain in place."],
    ["Is Support AI the fitness Coach?","No. Support AI helps you use and troubleshoot ShiftFit. The AI Coach is for fitness, nutrition, motivation and progress coaching."]
  ];
  function esc(v){return String(v??"").replace(/[&<>\"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function shell(){return document.getElementById("shiftfit-settings-split-modal");}
  function style(){if(document.getElementById("shiftfit-support-style"))return;var s=document.createElement("style");s.id="shiftfit-support-style";s.textContent='.sf-support-chat{height:280px;overflow:auto;padding:10px;border:1px solid #293253;border-radius:16px;background:#080d1a;margin-top:10px}.sf-msg{max-width:88%;padding:10px 12px;border-radius:14px;margin:7px 0;font-size:13px;line-height:1.45;white-space:pre-wrap}.sf-user{margin-left:auto;background:#5930c9}.sf-ai{background:#151d32;color:#e7eaf3}.sf-support-row{display:flex;gap:8px;margin-top:9px}.sf-support-row .field{margin:0}.sf-chip{display:inline-block;margin:5px 5px 0 0;padding:8px 10px;border:1px solid #39466f;border-radius:999px;background:#11182d;color:#dcd5ff;font-size:11px;font-weight:800}.sf-support-status{font-size:11px;color:#8f98ad;margin-top:7px}.sf-human{border-color:#39466f;background:#10182b;color:#dfe4f1}.sf-contact{display:grid;gap:8px}.sf-contact a{text-decoration:none;text-align:center;display:block}.sf-report{margin-top:12px}';document.head.appendChild(s);}
  function toast(t){var o=document.querySelector(".toast");if(o)o.remove();var x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(function(){x.remove();},2200);}
  function openSupport(){
    style();
    var m=shell();if(!m)return;
    var h=m.querySelector(".backrow h1");if(!h||h.textContent.trim()!=="Help & Support")return;
    if(m.querySelector("#shiftfit-support-enhanced"))return;
    var group=m.querySelector(".group");if(!group)return;
    group.id="shiftfit-support-enhanced";group.innerHTML='<h3>SHIFT FIT SUPPORT AI</h3><div class="legal">Ask questions about using ShiftFit, fixing common problems, accounts, sync, meal plans and settings.</div><div id="sf-support-chat" class="sf-support-chat"><div class="sf-msg sf-ai">Hi 👋 I’m ShiftFit Support AI. What can I help you with?</div></div><div><button class="sf-chip" type="button" data-q="My meal plan did not update">Meal plan issue</button><button class="sf-chip" type="button" data-q="I cannot sign in">Sign-in help</button><button class="sf-chip" type="button" data-q="How does cloud sync work?">Sync help</button><button class="sf-chip" type="button" data-q="How do I export my data?">Data & privacy</button></div><div class="sf-support-row"><input class="field" id="sf-support-input" type="text" maxlength="2000" placeholder="Ask Support AI…"><button class="save" id="sf-support-send" type="button" style="width:auto;margin-top:0;padding:13px 16px">Send</button></div><div id="sf-support-status" class="sf-support-status"></div><div class="note">Support AI is for app help, not medical advice. If it cannot resolve the issue, contact the ShiftFit support team.</div>';
    var second=document.createElement("div");second.className="group sf-human";second.innerHTML='<h3>NEED A HUMAN?</h3><div class="legal">For account problems, billing, complaints or bugs that Support AI cannot resolve, contact the ShiftFit support team.</div><div class="sf-contact"><a class="save" href="mailto:'+SUPPORT_EMAIL+'?subject=ShiftFit%20Support%20Request">📧 Email '+SUPPORT_EMAIL+'</a><button class="secondary sf-report" id="sf-report-problem" type="button">🐛 Report a problem</button></div><div class="note">When reporting a problem, include what you were trying to do, what happened and your device/browser if possible.</div>';
    var sheet=m.querySelector(".sheet");if(sheet)sheet.appendChild(second);
    var chat=document.getElementById("sf-support-chat"),input=document.getElementById("sf-support-input"),send=document.getElementById("sf-support-send"),status=document.getElementById("sf-support-status"),history=[];
    function add(role,text){var d=document.createElement("div");d.className="sf-msg "+(role==="user"?"sf-user":"sf-ai");d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;history.push({role:role,content:text});}
    async function ask(text){text=String(text||"").trim();if(!text)return;add("user",text);input.value="";send.disabled=true;status.textContent="Support AI is thinking…";try{var r=await fetch("/api/support",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history:history.slice(-8)})});var data=await r.json().catch(function(){return{};});if(!r.ok)throw new Error(data.error||"Support AI is unavailable.");add("assistant",data.reply||"I could not find an answer. Please contact support.");status.textContent=data.needsHuman?"This may need a human support review.":"";}catch(e){add("assistant","I’m having trouble connecting right now. Please try again, or email "+SUPPORT_EMAIL+" if the problem continues.");status.textContent="Support connection unavailable.";}finally{send.disabled=false;input.focus();}}
    send.onclick=function(){ask(input.value);};input.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();ask(input.value);}});m.querySelectorAll("[data-q]").forEach(function(b){b.onclick=function(){ask(b.dataset.q);};});
    var report=document.getElementById("sf-report-problem");report.onclick=function(){var subject=encodeURIComponent("ShiftFit bug report"),body=encodeURIComponent("What I was trying to do:\n\nWhat happened:\n\nDevice/browser:\n\nSteps to reproduce:\n");window.location.href="mailto:"+SUPPORT_EMAIL+"?subject="+subject+"&body="+body;};
  }
  function install(){var m=shell();if(!m||!m.classList.contains("open"))return;var h=m.querySelector(".backrow h1");if(h&&h.textContent.trim()==="Help & Support")openSupport();}
  function boot(){install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
