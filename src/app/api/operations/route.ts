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
        toggleShoppingItem: {
          description:
            "Toggle the checked state of a shopping list item in a specific category",
          parameters: z.object({
            categoryIndex: z
              .number()
              .describe("The index of the category containing the item"),
            itemIndex: z
              .number()
              .describe("The index of the item within the category to toggle"),
          }),
        },
        readAllShoppingItems: {
          description:
            "Read All Shopping Items in order to know to toggle the checked state of the shopping list",
          parameters: z.object({
            name: z.string().describe("name of the shopping items"),
          }),
        },
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API route:", error);
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
