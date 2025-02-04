import type { Message } from "ai/react";
import type { ToolInvocation } from "@ai-sdk/ui-utils";
import type { CalendarSearchToolArgs, ToolName, ToolState } from "./types";

interface UseToolArgsResult {
  toolArgs: CalendarSearchToolArgs | null;
  toolState: ToolState;
  toolName: ToolName | null;
  toolCallId: string | null;
  toolResult: any;
}

export const useToolArgs = (message: Message): UseToolArgsResult => {
  const toolInvocations = message.toolInvocations as
    | (ToolInvocation & { toolName: ToolName })[]
    | undefined;

  const defaultToolArgs: UseToolArgsResult = {
    toolArgs: null,
    toolState: "result",
    toolName: null,
    toolCallId: null,
    toolResult: null,
  };

  if (!toolInvocations?.length) {
    return defaultToolArgs;
  }

  const tool = toolInvocations[0];

  // Handle different tool states
  switch (tool.state) {
    case "result":
      return {
        toolArgs: tool.args as CalendarSearchToolArgs,
        toolState: "result",
        toolName: tool.toolName,
        toolCallId: tool.toolCallId,
        toolResult: tool.result,
      };
    case "partial-call":
    case "call":
      return {
        toolArgs: tool.args as CalendarSearchToolArgs,
        toolState: tool.state,
        toolName: tool.toolName,
        toolCallId: tool.toolCallId,
        toolResult: null,
      };
    default:
      return defaultToolArgs;
  }
};
