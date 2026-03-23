import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function sendMessageToAI(user, message) {
  const response = await client.chat.completions.create({
    model: "gpt-4-mini",
    messages: [{ role: "user", content: message }]
  });
  return response.choices[0].message.content;
}
