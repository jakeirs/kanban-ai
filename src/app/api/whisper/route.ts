import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Create a File object from the blob
    const audioBytes = await file.arrayBuffer();
    const audioFile = new File([audioBytes], "audio.webm", { type: file.type });

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Whisper API Error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
