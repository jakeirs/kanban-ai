import { Message } from "ai/react";
import { ToolUI } from "./ToolUI";
import { useToolInvocation } from "../hooks/useToolInvocation";

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
  const { toolState, toolGroups } = useToolInvocation(message.toolInvocations);

  return (
    <div className="relative">
      {toolGroups.map((tool, toolIndex) =>
        tool.items.map((item, itemIndex) => (
          <ToolUI
            key={`${toolIndex}-${itemIndex}`}
            args={item.args}
            messageId={message.id}
            toolState={toolState}
            toolType={tool.type}
            toolCallId={item.toolCallId}
            addToolResult={addToolResult}
          />
        ))
      )}
    </div>
  );
};
