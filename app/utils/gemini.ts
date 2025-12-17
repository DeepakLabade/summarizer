import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "./promps";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateSummaryFromGemini = async (
  pdfText: string,
  maxRetries: number = 3
) => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} - Calling AI model`);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SUMMARY_SYSTEM_PROMPT,
      });

      const result = await model.generateContent(
        `Transform this document into an engaging, easy-to-read summary with emojis and markdown:\n\n${pdfText.slice(
          0,
          60_000
        )}`
      );

      console.log("Summary generated successfully");
      return result.response.text();
    } catch (err: any) {
      lastError = err;
      console.error(`Attempt ${attempt} failed:`, err.message);

      const isRetryable =
        err.status === 503 ||
        err.status === 429 ||
        err.message?.includes("overloaded");

      if (isRetryable && attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000;
        console.log(`⏳ Retrying in ${delayMs / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else if (!isRetryable) {
        console.error("Non-retryable error encountered");
        throw err;
      }
    }
  }

  console.error("All retry attempts exhausted");
  throw lastError;
};
