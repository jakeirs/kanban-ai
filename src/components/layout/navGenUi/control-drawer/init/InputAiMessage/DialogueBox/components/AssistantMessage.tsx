import { Message } from "ai/react";
import { ToolUI } from "./ToolUI";
import { useToolInvocation } from "../hooks/useToolInvocation";
import { Loader } from "./Loader";
import { Loader as Loaders } from "lucide-react";

interface AssistantMessageProps {
  message: Message;
  isLoading?: boolean;
}

export const AssistantMessage = ({
  message,
  isLoading,
}: AssistantMessageProps) => {
  const { getUIArgs } = useToolInvocation(message.toolInvocations);

  return (
    <div className="relative">
      {isLoading && <Loader />}
      {getUIArgs.map((args, index) => (
        <ToolUI key={index} args={args} messageId={message.id} />
      ))}
    </div>
  );
};
