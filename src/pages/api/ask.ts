// import { OpenAI } from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPEN_API_KEY,
// });

// // Static prompt method (simple approach)
// const systemPrompt = `
// You are an AI assistant about Vidarshan Rathnayake.
// Information:
// - Full Name: Vidarshan Rathnayake
// - Profession: Full-stack developer
// - Skills: React, Next.js, Node.js, Cloud, AI
// - Projects:
//    1. Portfolio Website
//    2. E-commerce App
// - Education: XYZ University
// - Hobbies: Reading, Gaming, Travel
// - Personality: Friendly, Creative, Problem-solver
// Answer questions only using this information.
// `;

// export default async function handler(req, res) {
//   if (req.method !== "POST")
//     return res.status(405).json({ error: "Method not allowed" });

//   const { question } = req.body;
//   if (!question) return res.status(400).json({ error: "No question provided" });

//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: question },
//       ],
//       temperature: 0.7,
//       max_tokens: 200,
//     });

//     const answer = response.choices[0].message.content;
//     res.status(200).json({ answer });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
