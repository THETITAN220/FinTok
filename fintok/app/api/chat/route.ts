import { mistral } from "@ai-sdk/mistral"
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google"

type Messages = {
  "role": string;
  "content": string;
}

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = messages.map((msg: Messages) => `${msg.role}: ${msg.content}`).join("\n")

    const result = streamText({
      model: google("models/gemini-2.0-flash"),
      prompt,
    })

    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    }
  }
}
