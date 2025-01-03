import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateKanbanColumns, updateContentForTask } from "./tools";
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
        updateKanbanColumns,
        updateContentForTask,
      },
      system: `You are friendly assistant of Kanban board for the user.
       Don't do more than it's expected from you. 
       If the user told you to create only the task, just create the task. But don't do
       any additional actions if you are not explicitly asked for it
       Don't mention any IDs of the tasks, columns and kanban boards and any other stuff to the user.
        If you have to do many operations like move couple of tasks from one column to another,
        you can use tools many time if needed. If you see that you can batch some tasks then do it.
        Don't do more than it's expected from you. 
      `,
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
