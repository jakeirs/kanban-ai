import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateSchedule } from "./tools";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { format } from "date-fns";
import { agent3Tools } from "./prompts/agent";
import { calendarTool } from "./tools/calendarTool";
import { confirmationTool } from "./tools/confirmationTool";
import { afterConfirmationTool } from "./tools/afterConfirmationTool";
import { generalTool } from "./tools/generalTool";

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages, CURRENT_TIME } = body as {
      messages: Message[];
      CURRENT_TIME: string;
    };

    console.log(
      "CURRENT_TIMECURRENT_TIME",
      JSON.stringify(CURRENT_TIME, null, 2)
    );

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,
      experimental_toolCallStreaming: true,
      maxSteps: 10,
      tools: {
        calendarTool,
        confirmationTool,
        afterConfirmationTool,
        generalTool,
      },
      system: agent3Tools(CURRENT_TIME),
      // system: agent2Tools(CURRENT_TIME),
      // system: agentNotAnsweringPrompt_V01(CURRENT_TIME),
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
