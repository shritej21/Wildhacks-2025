const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

import { Expense, Insight } from "./types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

if (!process.env.NEXT_PUBLIC_API_KEY) {
  throw new Error("Missing API_KEY in environment variables");
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`;

export async function callGeminiAPI(prompt: string, maxRetries = 2) {
  let retries = 0;
  while (retries <= maxRetries) {
    try {
      console.log(
        `Attempting to call Gemini API (attempt ${retries + 1} of ${
          maxRetries + 1
        })`
      );
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `API request failed with status: ${response.status}. Response:`,
          errorText
        );

        if (response.status === 429 || response.status >= 500) {
          retries++;
          if (retries <= maxRetries) {
            const waitTime = 1000 * Math.pow(2, retries - 1);
            console.log(`Retrying in ${waitTime}ms...`);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
            continue;
          }
        }

        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      if (retries >= maxRetries) {
        throw error;
      }

      retries++;
      const waitTime = 1000 * Math.pow(2, retries - 1);
      console.log(`Retrying in ${waitTime}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

export async function analyzeExpensesWithGemini(
  expenses: Expense[]
): Promise<Insight[]> {
  const expenseData = expenses.map((e) => ({
    amount: parseFloat(e.amount),
    category: e.category,
    date: new Date(e.date).toLocaleDateString(),
    description: e.description,
  }));

  const prompt = `
  Analyze these expenses and provide financial insights and recommendations:
  ${JSON.stringify(expenseData, null, 2)}
  
  Please provide:
  1. Spending patterns and trends
  2. Areas of potential overspending
  3. Specific recommendations for saving money
  4. Any unusual spending patterns

  Format your response as JSON with the following structure:
  [
    {
      "title": "Short insight title",
      "description": "Longer explanation with specific details",
      "type": "insight|warning|improvement|trend"
    },
    ...more insights
  ]
`;

  try {
    const response = await callGeminiAPI(prompt);

    const responseText = response.candidates[0]?.content?.parts[0]?.text;
    if (!responseText) {
      throw new Error("Invalid response from Gemini API");
    }

    let parsedInsights: any[] = [];
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        parsedInsights = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Couldn't find valid JSON in the response");
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.log("Response text was:", responseText);

      return [
        {
          id: `insight-${Date.now()}-error`,
          title: "Analysis Error",
          description:
            "There was an issue processing the analysis. Please try again later.",
          type: "warning",
        },
      ];
    }

    return parsedInsights.map((insight, index) => ({
      id: `insight-${Date.now()}-${index}`,
      title: insight.title,
      description: insight.description,
      type: insight.type as "insight" | "warning" | "improvement" | "trend",
    }));
  } catch (error) {
    console.error("Error in analyzeExpensesWithGemini:", error);

    return [
      {
        id: `insight-${Date.now()}-error`,
        title: "Analysis Failed",
        description:
          "Unable to connect to the AI service. Please check your internet connection and try again.",
        type: "warning",
      },
    ];
  }
}
