const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4.1-mini";

function setCors(req, res) {
  const allowedOrigins = String(process.env.RECEIPT_OCR_ALLOWED_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const requestOrigin = req.headers.origin || "";
  const allowOrigin =
    allowedOrigins.length === 0
      ? "*"
      : allowedOrigins.includes(requestOrigin)
        ? requestOrigin
        : allowedOrigins[0];

  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4_400_000) {
        reject(new Error("画像が大きすぎます。"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function extractOutputText(response) {
  if (typeof response.output_text === "string") return response.output_text;
  return (response.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("\n")
    .trim();
}

function parseJsonObject(text) {
  const trimmed = String(text || "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch {
      return {};
    }
  }
}

function normalizeDate(value) {
  const text = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const [year, month, day] = text.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return text;
}

function normalizeAmount(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0 || amount >= 1_000_000) return null;
  return Math.round(amount);
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "POSTだけ対応しています。" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENAI_API_KEYが設定されていません。" });
    return;
  }

  try {
    const { image, today } = await readBody(req);
    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      res.status(400).json({ error: "レシート画像がありません。" });
      return;
    }

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_RECEIPT_MODEL || DEFAULT_MODEL,
        max_output_tokens: 300,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: [
                  "You are reading a Japanese receipt image for a personal household ledger.",
                  "Extract only the final amount the customer paid and the receipt purchase date.",
                  "Ignore subtotal, points, change, deposit, balance, tax-only rows, and payment method IDs.",
                  `Today's date is ${today || "unknown"}. If the receipt omits the year, infer the year from today's date.`,
                  'Return only valid JSON like {"amount":1234,"date":"2026-06-06","confidence":0.82}.',
                  "Use null for unknown amount or date. amount must be an integer JPY value. date must be YYYY-MM-DD.",
                ].join("\n"),
              },
              {
                type: "input_image",
                image_url: image,
                detail: "high",
              },
            ],
          },
        ],
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ error: payload?.error?.message || "OpenAI APIで判定できませんでした。" });
      return;
    }

    const parsed = parseJsonObject(extractOutputText(payload));
    res.status(200).json({
      amount: normalizeAmount(parsed.amount),
      date: normalizeDate(parsed.date),
      confidence: Number.isFinite(Number(parsed.confidence)) ? Number(parsed.confidence) : null,
    });
  } catch (error) {
    res.status(500).json({ error: error?.message || "レシートAI判定に失敗しました。" });
  }
};
