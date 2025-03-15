import { generateObject } from "ai";
// import { z } from "zod";
import { mistral } from "@ai-sdk/mistral";

// const intentSchema = z.object({
//   intent: z.enum(["greeting", "farewell", "question", "unknown"]),
//   entities: z.array(z.string()).optional(),
// });

export const classifyIntent = async (userMessage: string) => {
    
    
  try {
    const result = await generateObject({
      model: mistral("mistral-large-latest"),
      prompt: userMessage,
      enum:["greeting", "farewell", "question", "unknown"],
      system: "Classify the following message into an intent and extract any entities",
      output: "enum",
    });
    console.log("result of intent classification", result);
    return result;
  } catch (error) {
    console.error("Error classifying intent:", error);
    return { intent: "unknown", entities: [] };
  }
}
