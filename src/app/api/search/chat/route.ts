import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { agentManangeCalendar } from "./prompts/agent";
import { ConvexHttpClient } from "convex/browser";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import { calendarSearchTool } from "./tools/calendarSearch";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages } = body as {
      messages: Message[];
    };

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,
      experimental_toolCallStreaming: true,
      toolChoice: "auto",
      maxSteps: 2,
      tools: {
        calendarSearchTool,
      },
      // system: agentSearchTool,
      // system: agentSearchToolNoTool,
      system: agentManangeCalendar,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        return `An error occurred while processing your request. Please try again. ${error}`;
      },
    });
  } catch (error) {
    console.error("Error in a Schedule chat API route:", error);
    return new Response(
      JSON.stringify({
        error: "In CATCH POST An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
