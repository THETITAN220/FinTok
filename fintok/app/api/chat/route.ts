import { mistral } from "@ai-sdk/mistral"
// import { generateText } from "ai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

type Messages = {
  "role": string;
  "content": string;
}

export const runtime = "edge"; // Use Edge runtime for better performance

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = messages.map((msg: Messages) => `${msg.role}: ${msg.content}`).join("\n")

    const result = streamText({
      model: mistral("mistral-small-latest"),
      prompt,
    })

    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    }
  }
}
