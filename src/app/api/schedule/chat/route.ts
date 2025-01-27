import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateSchedule } from "./tools";
import { AI_MODEL_TO_USE } from "@/config/ai/model";

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    const result = streamText({
      model: anthropic(AI_MODEL_TO_USE),
      messages,
      experimental_toolCallStreaming: true,
      maxSteps: 10,
      tools: {
        updateSchedule,
      },
      system: `You are friendly assistant of Marcin. This is the name of the user, you are his assistant.
       You are responsible for calendar of the user. 
       When we talk about events it also could mean: tasks, reminders
       You will schedule new events
       You will edit old events.
       You will inform about conflicts in the calendar if those exists
       You will delete events only if user will ask for.
       Don't do more than it's expected from you. 
       Batch your tasks if user add more than one task for you.
       Don't mention any IDs of the events.
       Don't do more than it's expected from you. 
      `,
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
