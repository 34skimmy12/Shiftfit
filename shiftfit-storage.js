/* ShiftFit Storage v1 — local-first, versioned, migration-ready.
 * Existing app keys are preserved for compatibility while new code can use
 * one central storage API. No cloud/auth dependency yet.
 */
(function(){
  "use strict";

  const VERSION = 1;
  const ROOT_KEY = "shiftfit:v1:store";
  const LEGACY = {
    profile: "shiftfitProfile",
    plan: "shiftfitPlan",
    meals: "weeklyMeals",
    preferences: "mealPreferences",
    goals: "shiftfitGoalTargetWeight",
    weightHistory: "shiftfitWeightHistory",
    progressHistory: "shiftfitProgressDailyHistory",
    aiChat: "shiftfitAIChatHistory",
    shopping: "shoppingItems",
    shift: "selectedShift",
    customShiftStart: "customShiftStart",
    customShiftEnd: "customShiftEnd",
    customShiftOvernight: "customShiftOvernight"
  };

  function readRaw(key){ try { return localStorage.getItem(key); } catch(_) { return null; } }
  function writeRaw(key,value){ try { localStorage.setItem(key,value); return true; } catch(_) { return false; } }
  function parse(raw,fallback){ try { return raw == null ? fallback : JSON.parse(raw); } catch(_) { return fallback; } }
  function clone(value){ try { return JSON.parse(JSON.stringify(value)); } catch(_) { return value; } }

  function defaultStore(){
    return { version: VERSION, updatedAt: new Date().toISOString(), data: {} };
  }

  function loadStore(){
    const stored = parse(readRaw(ROOT_KEY), null);
    if(stored && stored.version === VERSION && stored.data && typeof stored.data === "object") return stored;
    const next = migrate(stored || defaultStore());
    writeRaw(ROOT_KEY, JSON.stringify(next));
    return next;
  }

  function migrate(store){
    let next = store && typeof store === "object" ? store : defaultStore();
    if(!next.data || typeof next.data !== "object") next.data = {};
    const previousVersion = Number(next.version || 0);

    // v0 -> v1: copy existing ShiftFit localStorage keys into the versioned store.
    if(previousVersion < 1){
      Object.keys(LEGACY).forEach(name => {
        const key = LEGACY[name];
        const raw = readRaw(key);
        if(raw !== null && next.data[name] === undefined){
          next.data[name] = parse(raw, raw);
        }
      });
      next.version = 1;
    }

    next.updatedAt = new Date().toISOString();
    return next;
  }

  function save(name,value){
    const store = loadStore();
    store.data[name] = clone(value);
    store.updatedAt = new Date().toISOString();
    writeRaw(ROOT_KEY, JSON.stringify(store));
    return value;
  }

  function load(name,fallback){
    const store = loadStore();
    return store.data[name] === undefined ? fallback : clone(store.data[name]);
  }

  function remove(name){
    const store = loadStore();
    delete store.data[name];
    store.updatedAt = new Date().toISOString();
    writeRaw(ROOT_KEY, JSON.stringify(store));
  }

  function has(name){ return load(name, undefined) !== undefined; }

  function snapshot(){ return clone(loadStore()); }

  function exportData(){
    const payload = { app: "ShiftFit", schema: "shiftfit-local", version: VERSION, exportedAt: new Date().toISOString(), data: snapshot().data };
    return JSON.stringify(payload, null, 2);
  }

  function importData(input){
    const payload = typeof input === "string" ? parse(input, null) : input;
    if(!payload || payload.app !== "ShiftFit" || payload.schema !== "shiftfit-local" || !payload.data) throw new Error("Invalid ShiftFit backup");
    const store = { version: VERSION, updatedAt: new Date().toISOString(), data: clone(payload.data) };
    writeRaw(ROOT_KEY, JSON.stringify(store));
    return store;
  }

  function status(){
    const store = loadStore();
    return { version: store.version, updatedAt: store.updatedAt, fields: Object.keys(store.data) };
  }

  window.shiftfitStorage = { VERSION, save, load, remove, has, snapshot, exportData, importData, status };
  window.shiftfitStorageReady = true;

  // Migrate immediately without changing the legacy keys that the current app uses.
  loadStore();
})();
