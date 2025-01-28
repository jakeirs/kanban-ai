import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateSchedule } from "./tools";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { format } from "date-fns";

export async function POST(req: Request) {
  try {
    req.headers;
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    const CURRENT_TIME = format(new Date(), "PP pp");

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

      Additional notes:
       If user ask you to schedule relative dates (like today, tomorrow, in 1 hours, in one month, monday next week),
       calculate this, knowing that today is ${CURRENT_TIME}.
       If user doesn't add Month or year (assume current one)
       You should round all times to the nearest hour or 10-minute mark or quarters, unless the user specifically asks for an exact time
       If user didn't pass title then as default you should set "Meeting at X" where X is the date user told you

       When a user specifies a date that is in the past:

        Notify the user that they've selected a past date
        Ask for confirmation if they want to proceed with this past date
        Only continue with the scheduling if they explicitly confirm
        If they don't confirm, ask for a new date

        For example:
        If user says 'Schedule meeting for January 15, 2025' and today is (example January 16, 2025):

        Notify: 'I notice this date is in the past'
        Ask: 'Would you like to proceed with scheduling for this past date, or would you prefer to choose a future date?'
        Then either:

        Continue if they confirm
        Help them pick a new date if they decline
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
