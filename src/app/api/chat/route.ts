import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  Annotation,
  END,
  START,
  StateGraph,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { NextResponse } from "next/server";

// Define a simple tool for demonstration
const simpleTool = tool(
  async () => {
    console.log("INVOKOED simple Tool");
    return {
      currentTime: new Date().toLocaleString(),
    };
  },
  {
    name: "get_current_time",
    description: "Get the current time",
    schema: z.object({
      currentTime: z.string().describe("The current time in ISO 8601 format"),
    }),
  }
);

// Create Graph Annotation
const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
});

// Initialize LLM
const llm = new ChatAnthropic({
  modelName: "claude-3-5-sonnet-20241022",
  temperature: 0,
});

// Create tool node
const toolNode = new ToolNode([simpleTool]);

// Define agent node
const callModel = async (state: typeof GraphAnnotation.State) => {
  const { messages } = state;
  console.log("INVOKOED simple Tool");

  const systemMessage = {
    role: "system",
    content:
      "You are a helpful AI assistant. You can use tools to help answer questions.",
  };

  const llmWithTools = llm.bindTools([simpleTool]);
  const result = await llmWithTools.invoke([systemMessage, ...messages]);
  return { messages: result };
};

// Define routing logic
const shouldContinue = (state: typeof GraphAnnotation.State) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];

  const messageCastAI = lastMessage as AIMessage;
  if (messageCastAI._getType() !== "ai" || !messageCastAI.tool_calls?.length) {
    return END;
  }

  return "tools";
};

// Create workflow
const workflow = new StateGraph(GraphAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addNode("tools", toolNode)
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue, ["tools", END]);

const graph = workflow.compile();

const isCompliled = workflow.compiled;

console.log("isCompliled", isCompliled);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const result = await graph.invoke({
      messages: [new HumanMessage(message)],
    });
    console.log("result", result);

    return NextResponse.json({
      content: result.messages.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
