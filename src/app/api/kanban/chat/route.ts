import { streamText, tool } from "ai";
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
        getKanbanState: tool({
          description: "Get the current state of the Kanban board including columns and items",
          parameters: z.object({
            boardId: z.string().optional().describe("Optional board ID to get specific board state"),
          }),
          execute: async ({ boardId }) => {
            // This is a placeholder - in a real implementation, 
            // we would fetch the actual state from the database
            return {
              columns: [
                { id: "todo", title: "To Do", items: [] },
                { id: "in-progress", title: "In Progress", items: [] },
                { id: "done", title: "Done", items: [] }
              ]
            };
          },
        }),

        createKanbanItem: tool({
          description: "Create a new item in the Kanban board",
          parameters: z.object({
            columnId: z.string().describe("The ID of the column to add the item to"),
            content: z.string().describe("The content of the item"),
            description: z.string().optional().describe("Optional description for the item"),
            priority: z.enum(["low", "medium", "high"]).optional().describe("Priority level of the item"),
          }),
          execute: async ({ columnId, content, description, priority }) => {
            // Placeholder for actual implementation
            return {
              success: true,
              item: {
                id: Date.now().toString(),
                columnId,
                content,
                description,
                priority,
              },
            };
          },
        }),

        moveKanbanItem: tool({
          description: "Move an item from one column to another in the Kanban board",
          parameters: z.object({
            itemId: z.string().describe("The ID of the item to move"),
            targetColumnId: z.string().describe("The ID of the column to move the item to"),
          }),
          execute: async ({ itemId, targetColumnId }) => {
            // Placeholder for actual implementation
            return {
              success: true,
              message: `Item ${itemId} moved to column ${targetColumnId}`,
            };
          },
        }),

        askForConfirmation: tool({
          description: "Ask the user for confirmation before making changes to the board",
          parameters: z.object({
            message: z.string().describe("The message to ask for confirmation"),
            action: z.string().describe("The action being confirmed"),
          }),
        }),

        getCurrentView: tool({
          description: "Get the current view of the Kanban board that the user is looking at",
          parameters: z.object({}),
        }),
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
