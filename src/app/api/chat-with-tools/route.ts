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
      model: anthropic("claude-3-5-sonnet-20240620"),
      messages,
      experimental_toolCallStreaming: true,
      maxSteps: 2,
      tools: {
        // Server-side tool with execute function
        getWeatherInformation: {
          description: "show the weather in a given city to the user",
          parameters: z.object({ city: z.string() }),
          execute: async ({ city }: { city: string }) => {
            const weatherOptions = [
              "sunny",
              "cloudy",
              "rainy",
              "snowy",
              "windy",
            ];
            return weatherOptions[
              Math.floor(Math.random() * weatherOptions.length)
            ];
          },
        },
        // Client-side tool that starts user interaction
        askForConfirmation: {
          description: "Ask the user for confirmation.",
          parameters: z.object({
            message: z
              .string()
              .describe("The message to ask for confirmation."),
          }),
        },
        // Client-side tool that is automatically executed on the client
        getLocation: {
          description:
            "Get the user location. Always ask for confirmation before using this tool.",
          parameters: z.object({}),
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
