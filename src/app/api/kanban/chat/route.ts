import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { Message } from "ai";

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
        // Server-side tool with execute function
        getKanbanState: {
          description: "Get the current state of the Kanban board including columns and items",
          parameters: z.object({}),
          execute: async () => {
            // This is a placeholder - in a real implementation, 
            // we would fetch the actual state from the database
            return JSON.stringify({
              columns: [
                { id: "todo", title: "To Do", items: [] },
                { id: "in-progress", title: "In Progress", items: [] },
                { id: "done", title: "Done", items: [] }
              ]
            });
          },
        },
        // Client-side tool that starts user interaction
        askForConfirmation: {
          description: "Ask the user for confirmation before making changes to the board.",
          parameters: z.object({
            message: z.string().describe("The message to ask for confirmation."),
          }),
        },
        // Client-side tool that is automatically executed on the client
        getCurrentView: {
          description: "Get the current view of the Kanban board that the user is looking at",
          parameters: z.object({}),
        },
      },
    });

    return result.toDataStreamResponse();
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
