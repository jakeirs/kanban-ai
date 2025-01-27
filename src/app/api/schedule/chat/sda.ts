import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,

    });

    return result.toDataStreamResponse({
   
    });