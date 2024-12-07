import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { Message } from "ai";
import {
  getKanbanState,
  createKanbanItem,
  moveKanbanItem,
  askForConfirmation,
  getCurrentView,
} from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define the request body schema using Message type
const RequestSchema = z.object({
  messages: z.array(z.custom<Message>()),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    const result = streamText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      messages,
      experimental_toolCallStreaming: true,
      maxSteps: 2,
      tools: {
        getKanbanState,
        createKanbanItem,
        moveKanbanItem,
        askForConfirmation,
        getCurrentView,
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        // Provide user-friendly error messages
        return "An error occurred while processing your request. Please try again.";
      },
    });
  } catch (error) {
    console.error("Error in kanban chat API route:", error);
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
