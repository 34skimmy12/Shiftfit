const OPENAI_URL = "https://api.openai.com/v1/responses";
const MODEL = process.env.SHIFTFIT_AI_MODEL || "gpt-5.6-luna";

const ALLOWED_ACTIONS = new Set([
  "generate_meal_plan",
  "set_goal",
  "sync_shopping",
  "add_water",
  "log_weight",
  "open_screen"
]);

const SYSTEM_PROMPT = `You are ShiftFit Coach, the practical AI fitness and nutrition coach inside the ShiftFit app.

Your job is to help a user make realistic progress while working shifts. Use the supplied ShiftFit state rather than inventing facts. Be concise, encouraging and action-oriented. Prioritise adherence, sleep/recovery around shifts, protein, hydration, sensible calorie targets and simple meals.

You are not a doctor. Do not diagnose conditions or tell the user to change prescription medication. For urgent or potentially serious symptoms, recommend appropriate medical care.

You can suggest ShiftFit actions, but only when they clearly match what the user asked for. Never claim an action happened unless the app action is actually requested in your response.

Return ONLY valid JSON with this shape:
{
  "reply": "short natural-language answer",
  "actions": [
    {"type":"generate_meal_plan","goal":"lose|maintain|build"},
    {"type":"set_goal","goal":"lose|maintain|build"},
    {"type":"sync_shopping"},
    {"type":"add_water","amount":500},
    {"type":"log_weight","weight":84},
    {"type":"open_screen","screen":"home|meals|workouts|calendar|shopping|progress|profile"}
  ]
}

Use an empty actions array when no app action is needed. Keep replies short enough for a mobile chat. Do not include markdown fences.`;

function jsonResponse(res, status, payload) {
  res.status(status).json(payload);
}

function cleanText(value, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-12).map((item) => ({
    role: item?.role === "assistant" ? "assistant" : "user",
    content: cleanText(item?.content, 1200)
  })).filter((item) => item.content);
}

function cleanState(state) {
  if (!state || typeof state !== "object") return {};

  const safe = {
    plan: state.plan ?? null,
    weeklyMeals: Array.isArray(state.weeklyMeals) ? state.weeklyMeals.slice(0, 7) : [],
    mealPreferences: state.mealPreferences ?? null,
    weightHistory: Array.isArray(state.weightHistory) ? state.weightHistory.slice(-12) : [],
    shoppingItems: Array.isArray(state.shoppingItems) ? state.shoppingItems.slice(0, 60) : [],
    selectedShift: state.selectedShift ?? null,
    customShiftStart: state.customShiftStart ?? null,
    customShiftEnd: state.customShiftEnd ?? null,
    customShiftOvernight: Boolean(state.customShiftOvernight),
    today: state.today ?? null
  };

  const serialised = JSON.stringify(safe);
  if (serialised.length <= 24000) return safe;

  return {
    plan: safe.plan,
    weeklyMeals: safe.weeklyMeals.slice(0, 7),
    mealPreferences: safe.mealPreferences,
    weightHistory: safe.weightHistory.slice(-6),
    shoppingItems: safe.shoppingItems.slice(0, 30),
    selectedShift: safe.selectedShift,
    customShiftStart: safe.customShiftStart,
    customShiftEnd: safe.customShiftEnd,
    customShiftOvernight: safe.customShiftOvernight,
    today: safe.today
  };
}

function normaliseActions(actions) {
  if (!Array.isArray(actions)) return [];

  return actions.slice(0, 4).map((action) => {
    if (!action || typeof action !== "object") return null;
    const type = String(action.type || "").trim();
    if (!ALLOWED_ACTIONS.has(type)) return null;

    if (type === "generate_meal_plan" || type === "set_goal") {
      const goal = String(action.goal || "").toLowerCase();
      if (!["lose", "maintain", "build"].includes(goal)) return null;
      return { type, goal };
    }

    if (type === "add_water") {
      const amount = Number(action.amount);
      if (!Number.isFinite(amount) || amount <= 0 || amount > 3000) return null;
      return { type, amount: Math.round(amount) };
    }

    if (type === "log_weight") {
      const weight = Number(action.weight);
      if (!Number.isFinite(weight) || weight < 30 || weight > 300) return null;
      return { type, weight: Math.round(weight * 10) / 10 };
    }

    if (type === "open_screen") {
      const screen = String(action.screen || "").toLowerCase();
      if (!["home", "meals", "workouts", "calendar", "shopping", "progress", "profile"].includes(screen)) return null;
      return { type, screen };
    }

    return { type };
  }).filter(Boolean);
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];
  for (const item of Array.isArray(data?.output) ? data.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (typeof content?.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseCoachJson(text) {
  const cleaned = String(text || "").trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (_) {}
    }
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return jsonResponse(res, 405, { error: "Method not allowed." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(res, 503, {
      error: "The AI Coach is not configured yet. Add OPENAI_API_KEY to the server environment."
    });
  }

  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const message = cleanText(body.message, 2000);

    if (!message) {
      return jsonResponse(res, 400, { error: "Please enter a message for the Coach." });
    }

    const history = cleanHistory(body.history);
    const state = cleanState(body.state);

    const context = [
      "CURRENT SHIFTFIT STATE:",
      JSON.stringify(state),
      "",
      "RECENT CHAT:",
      JSON.stringify(history),
      "",
      "USER'S NEW MESSAGE:",
      message
    ].join("\n");

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: SYSTEM_PROMPT,
        input: context,
        max_output_tokens: 700
      })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("ShiftFit Coach OpenAI error:", response.status, data);
      const upstreamCode = cleanText(data?.error?.code, 80);
      return jsonResponse(res, 502, {
        error: `OpenAI request failed (${response.status}${upstreamCode ? `/${upstreamCode}` : ""}).`
      });
    }

    const rawText = extractResponseText(data);
    const parsed = parseCoachJson(rawText);
    if (!parsed || typeof parsed.reply !== "string") {
      console.error("ShiftFit Coach invalid model response:", rawText);
      return jsonResponse(res, 502, {
        error: "The Coach returned an invalid response. Please try again."
      });
    }

    const reply = cleanText(parsed.reply, 1800);
    const actions = normaliseActions(parsed.actions);

    return jsonResponse(res, 200, {
      reply,
      actions,
      model: MODEL
    });
  } catch (error) {
    console.error("ShiftFit Coach server error:", error);
    return jsonResponse(res, 500, {
      error: "The AI Coach hit a server error. Please try again."
    });
  }
}
