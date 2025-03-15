import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sarvamapiKey = process.env.SARVAM_API_KEY;
  if (!sarvamapiKey) {
    return NextResponse.json({ error: "API key not found" }, { status: 500 });
  }

  try {
    const formData = await req.formData(); // Get form data from request
    const audioFile = formData.get("file"); // Extract the file


    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json({ error: "Invalid audio file" }, { status: 400 });
    }

    // Create a new formData object for Sarvam API
    const sarvamFormData = new FormData();
    sarvamFormData.append("model", "saaras:v2");
    sarvamFormData.append("language_code", "unknown");
    sarvamFormData.append("with_timestamps", "false");
    sarvamFormData.append("with_diarization", "false");
    sarvamFormData.append("num_speakers", "123");
    sarvamFormData.append("file", audioFile); // Append audio file

    const response = await fetch("https://api.sarvam.ai/speech-to-text-translate", {
      method: "POST",
      headers: { "api-subscription-key": sarvamapiKey },
      body: sarvamFormData,
    });

    const data = await response.json();
    const transcript = data.transcript || "No transcript available";
    const languageCode = data.language_code || "unknown";
    return NextResponse.json({ transcript, languageCode, rawResponse: data });
  } catch (error) {
    console.error("Transcription Error:", error);
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
  }
}
