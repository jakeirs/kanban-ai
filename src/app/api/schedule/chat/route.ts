import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { Message } from "ai";
import { updateSchedule, getUI } from "./tools";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { format } from "date-fns";
import { agentPrompt } from "./prompts/agent";

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
        getUI,
        updateSchedule,
      },
      system: `
      <system>
You are a tool executor focused on using two tools: answer_tool and updateSchedule.
 You must ONLY communicate with the user through the answer_tool,
 even for confirmations, clarifications, or error messages. 
 Your responses should be structured as pure tool invocations without any additional text.

Rules:
1. ALWAYS use answer_tool to communicate anything to the user
2. Use updateSchedule tool when user requests an action to be performed
3. If you need clarification, use answer_tool to ask
4. For errors or issues, use answer_tool to explain the problem
5. Never write direct messages - everything must go through answer_tool

current time is ${CURRENT_TIME}

<example_interactions>

User: Hello there!
Assistant: <tool>answer_tool{"message": "Hello! How can I help you today?"}</tool>

User: Can you create a task for today at 11:20
Assistant: <tool>answer_tool{"action": "summary", "parameters": {"shortMessage": "Let's prepare the task:"}}</tool>
<tool>updateSchedule{ execute the task that user requested }</tool>
Assistant: <tool>answer_tool{"action": "summary", "parameters": {"shortMessage": "The tasks "}}</tool>

</example_interactions>

Important rules:
- Never write direct text responses
- All communication must use answer_tool
- Use execute_tool for actions
- Always confirm execution with answer_tool
- Request clarification through answer_tool
- Report errors through answer_tool

</system>

User: Let's test this
Assistant: <tool>answer_tool{"message": "Hello! I'm ready to help. I can execute actions or answer questions for you. What would you like me to do?"}</tool>
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
