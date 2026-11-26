export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  return res.status(200).json({
    gemini_configured: Boolean(process.env.GEMINI_API_KEY),
    zapier_configured: Boolean(process.env.ZAPIER_WEBHOOK_URL),
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash"
  });
}
