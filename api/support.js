const OPENAI_URL = "https://api.openai.com/v1/responses";
const MODEL = process.env.SHIFTFIT_AI_MODEL || "gpt-5.6-luna";

const SYSTEM_PROMPT = `You are ShiftFit Support AI, the customer-support assistant inside the ShiftFit app.

Your job is to help users understand and troubleshoot ShiftFit itself. Answer questions about accounts, sign-in, cloud sync, profile settings, goals, calorie and macro targets, meal plans, meal swapping, shopping lists, workouts, progress, notifications and app navigation.

Use only the product information in the supplied context and general interface knowledge. Do not invent features, policies, prices, refunds, support promises or technical outcomes. If you cannot confidently answer a product question, say so and direct the user to Contact Support.

You are not the ShiftFit fitness Coach. Do not provide personalised medical advice, diagnose conditions, or advise changing prescription medicines. For health or emergency questions, recommend appropriate professional care.

Be concise, friendly and practical. Give numbered steps when troubleshooting. Never claim that you changed something, accessed an account, issued a refund, or contacted a human unless the app actually performed that action.

Return ONLY JSON in this shape:
{"reply":"short helpful answer","needsHuman":false}
Set needsHuman to true when the issue requires account access, billing, a bug investigation, a complaint, data deletion, or anything you cannot safely resolve in chat.`;

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function textFromResponse(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const parts = [];
  for (const item of Array.isArray(data?.output) ? data.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (typeof content?.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function parseJson(text) {
  const cleaned = String(text || "").trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
  try { return JSON.parse(cleaned); } catch (_) {}
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (_) {}
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Support AI is not configured yet." });

  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const message = clean(body.message, 2000);
    if (!message) return res.status(400).json({ error: "Please enter a support question." });

    const history = Array.isArray(body.history) ? body.history.slice(-8).map((item) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      content: clean(item?.content, 1200)
    })).filter((item) => item.content) : [];

    const context = [
      "SHIFTFIT SUPPORT CONTEXT:",
      "The app has email/password accounts, cloud backup/restore, Profile goal and nutrition controls, weekly meal plans, meal swapping, shopping lists, workout/progress tracking, notifications and Settings pages.",
      "",
      "RECENT CHAT:", JSON.stringify(history),
      "",
      "USER QUESTION:", message
    ].join("\n");

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        instructions: SYSTEM_PROMPT,
        input: context,
        max_output_tokens: 500
      })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("ShiftFit Support AI error:", response.status, data);
      return res.status(502).json({ error: "Support AI is temporarily unavailable. Please try again or contact support." });
    }

    const parsed = parseJson(textFromResponse(data));
    if (!parsed || typeof parsed.reply !== "string") return res.status(502).json({ error: "Support AI returned an invalid response." });

    return res.status(200).json({
      reply: clean(parsed.reply, 1800),
      needsHuman: Boolean(parsed.needsHuman),
      model: MODEL
    });
  } catch (error) {
    console.error("ShiftFit Support AI server error:", error);
    return res.status(500).json({ error: "Support AI hit a server error. Please try again." });
  }
}
