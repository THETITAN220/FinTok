// // import { mistral } from "@ai-sdk/mistral"
// import { streamText } from "ai";
// import { NextResponse } from "next/server";
// import { google } from "@ai-sdk/google"

// type Messages = {
//   "role": string;
//   "content": string;
// }

// export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const prompt = messages.map((msg: Messages) => `${msg.role}: ${msg.content}`).join("\n")

//     const result = streamText({
//       model: google("models/gemini-2.0-flash"),
//       prompt,
//     })

//     return result.toDataStreamResponse();
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: "Error processing request" }, { status: 500 });
//     }
//   }
// }


import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { Messages } from '@/types';

export async function POST(req: Request) {
  try {
    // Parse the incoming request to extract messages
    const { messages } = await req.json();

    // Construct the prompt by joining messages
    const prompt = messages.map((msg: Messages) => `${msg.role}: ${msg.content}`).join('\n');

    // Initialize the Google Gemini model
    const model = google('models/gemini-2.0-flash');

    // Stream text using the model and prompt
    const result = await streamText({
      model,
      prompt,
    });

    // Return the streamed response
    return result.toTextStreamResponse();
  } catch (error) {
    // Handle errors gracefully
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
