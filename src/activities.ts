import { HttpsProxyAgent } from "https-proxy-agent";
import { OpenAI } from "openai";

export async function gptQuery(prompt: string): Promise<string>{
  console.log("queryGPT");

  const apiKey = `${process.env.OPENAI_API_KEY}`;
   
  const openai = new OpenAI({
    apiKey: apiKey, // Idéalement, vous aurez mis votre clé api dans l'env
    httpAgent: new HttpsProxyAgent(process.env.HTTPS_PROXY ?? ""),
    maxRetries: 2,
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content ?? "No response";
  
 }