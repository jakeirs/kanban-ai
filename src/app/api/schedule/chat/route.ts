import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { february3Tools } from "./prompts/agent";
import { calendarTool } from "./tools/calendarTool";
import { confirmationTool } from "./tools/confirmationTool";
import { afterConfirmationTool } from "./tools/afterConfirmationTool";
import { generalTool } from "./tools/generalTool";
import { ConvexHttpClient } from "convex/browser";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import { convertToLocalTime } from "./tools/afterConfirmationTool/utils/convertTimeToLocalTime";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages, CURRENT_TIME } = body as {
      messages: Message[];
      CURRENT_TIME: string;
    };

    const tokenNextJs = await convexAuthNextjsToken();
    const isAuthenticated = await isAuthenticatedNextjs();

    if (!isAuthenticated) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }
    convex.setAuth(tokenNextJs!);

    const currentUserEvents = await convex.query(
      api.tables.events.queries.getCurrentUserEvents.default
    );

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,
      experimental_toolCallStreaming: true,
      toolChoice: "auto",
      maxSteps: 2,
      tools: {
        calendarTool,
        confirmationTool,
        afterConfirmationTool,
        generalTool,
      },
      system: february3Tools(
        CURRENT_TIME,
        convertToLocalTime(currentUserEvents.currectEvents)
      ),
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
