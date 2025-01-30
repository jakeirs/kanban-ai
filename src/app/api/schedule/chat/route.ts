import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateSchedule, getUI } from "./tools";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { format } from "date-fns";
import { agent3Tools, agentPrompt } from "./prompts/agent";
import { calendarEventTool } from "./tools/calendarEvents";

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    const CURRENT_TIME = format(new Date(), "PP pp");

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,
      experimental_toolCallStreaming: true,
      maxSteps: 10,
      tools: {
        getUI,
        calendarEventTool,
        // updateSchedule,
      },
      system: agent3Tools(CURRENT_TIME),
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        return "An error occurred while processing your request. Please try again.";
      },
    });
  } catch (error) {
    console.error("Error in a Schedule chat API route:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
