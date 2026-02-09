const axios = require("axios");

async function generateCareerAI({ skills, interests, education, goal }) {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a career guidance expert. Respond ONLY in valid JSON.",
        },
        {
          role: "user",
          content: `
Skills: ${skills.join(", ")}
Interests: ${interests.join(", ")}
Education: ${education}
Goal: ${goal}

Return JSON:
{
  "career": "",
  "reason": "",
  "roadmap": []
}
`,
        },
      ],
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = response.data.choices[0].message.content;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return JSON.parse(text.slice(start, end + 1));
}

module.exports = generateCareerAI;
