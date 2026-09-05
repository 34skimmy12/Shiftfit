const CACHE='shiftfit-v15';
const ASSETS=['./','./index.html','./manifest.json'];
const FOOD_OPTIONS=["Chicken breast","Lean beef mince","Lean turkey mince","Salmon","Tuna","Eggs","Greek yoghurt","Cottage cheese","Protein powder","Protein bar","Oats","Rice","Wholewheat pasta","Wholemeal wraps","Wholegrain bread","Rice cakes","Sweet potatoes","Potatoes","Beans","Kidney beans","Mixed vegetables","Spinach","Broccoli","Peppers","Onions","Tomatoes","Cucumber","Lettuce","Carrots","Mixed berries","Bananas","Apples","Blueberries","Strawberries","Avocado","Peanut butter","Almonds","Mixed nuts","Chia seeds","Honey","Olive oil","Light mayonnaise","Tomato sauce","Salsa"];
const FOOD_DROPDOWN_SCRIPT='<script>(function(){function convertShoppingFoodInput(){const input=document.getElementById("newShoppingItem");if(!input||input.tagName==="SELECT")return;const select=document.createElement("select");select.id="newShoppingItem";select.className="add-item-input";select.setAttribute("aria-label","Choose food to add to shopping list");const placeholder=document.createElement("option");placeholder.value="";placeholder.textContent="Select food...";placeholder.disabled=true;placeholder.selected=true;select.appendChild(placeholder);'+JSON.stringify(FOOD_OPTIONS)+'.forEach(function(food){const option=document.createElement("option");option.value=food;option.textContent=food;select.appendChild(option)});input.replaceWith(select)}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",convertShoppingFoodInput,{once:true})}else{convertShoppingFoodInput()}})();</script>';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'||e.request.url.endsWith('/index.html')){
    e.respondWith((async()=>{
      try{
        const response=await fetch(e.request,{cache:'no-store'});
        const contentType=response.headers.get('content-type')||'';
        if(contentType.includes('text/html')){
          const html=await response.text();
          const transformed=html.includes('Choose food to add to shopping list')?html:html.replace('</body>',FOOD_DROPDOWN_SCRIPT+'</body>');
          const result=new Response(transformed,{status:response.status,statusText:response.statusText,headers:response.headers});
          caches.open(CACHE).then(c=>c.put('./index.html',result.clone()));
          return result;
        }
        return response;
      }catch(_){
        return caches.match(e.request)||caches.match('./index.html');
      }
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
