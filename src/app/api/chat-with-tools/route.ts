import { streamText } from "ai";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;



const elo = createAnthropic({})




export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20240620",),
    messages,
    experimental_toolCallStreaming: true,
    maxSteps: 2, // is it for one tools // by default = 1
    tools: {
      // Server-side tool with execute function
      getWeatherInformation: {
        description: "show the weather in a given city to the user",
        parameters: z.object({ city: z.string() }),
        execute: async ({ city }: { city: string }) => {
          const weatherOptions = ["sunny", "cloudy", "rainy", "snowy", "windy"];
          return weatherOptions[
            Math.floor(Math.random() * weatherOptions.length)
          ];
        },
      },
      // Client-side tool that starts user interaction
      askForConfirmation: {
        description: "Ask the user for confirmation.",
        parameters: z.object({
          message: z.string().describe("The message to ask for confirmation."),
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
}
