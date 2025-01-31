import { Message } from "ai/react";
import { ToolUI } from "./ToolUI";
import { useToolInvocation } from "../hooks/useToolInvocation";
import { Loader as Loaders } from "lucide-react";

interface AssistantMessageProps {
  message: Message;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
}

export const AssistantMessage = ({
  message,
  addToolResult,
}: AssistantMessageProps) => {
  const {
    toolState,
    getUIArgs,
    calendarArgs,
    confirmationArgs,
    hasCalendarTools,
    hasGetUITools,
    hasConfirmationTools,
    toolCallId,
  } = useToolInvocation(message.toolInvocations);

  return (
    <div className="relative">
      {hasGetUITools && toolCallId &&
        getUIArgs.map((args, index) => (
          <ToolUI
            key={index}
            args={args}
            messageId={message.id}
            toolState={toolState}
            toolType="getUI"
            toolCallId={toolCallId}
            addToolResult={addToolResult}
          />
        ))}
      {hasCalendarTools && toolCallId &&
        calendarArgs.map((args, index) => (
          <ToolUI
            key={index}
            args={args}
            messageId={message.id}
            toolState={toolState}
            toolType="CALENDAR_EVENTS"
            toolCallId={toolCallId}
            addToolResult={addToolResult}
          />
        ))}
      {hasConfirmationTools && toolCallId &&
        confirmationArgs.map((args, index) => (
          <ToolUI
            key={index}
            args={args}
            messageId={message.id}
            toolState={toolState}
            toolType="confirmationTool"
            toolCallId={toolCallId}
            addToolResult={addToolResult}
          />
        ))}
    </div>
  );
};
