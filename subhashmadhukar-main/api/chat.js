import { Groq } from "groq-sdk";

export async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set");
      return res.status(500).json({ error: "API key not configured" });
    }

    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      // Use a currently supported Groq model
      // See: https://console.groq.com/docs/models
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    res.status(200).json({
      message: response.choices[0]?.message?.content || "No response generated",
    });
  } catch (error) {
    console.error("API Error:", error?.stack || error);
    res.status(500).json({
      error: error?.message || "Internal server error",
    });
  }
}

export default handler;
