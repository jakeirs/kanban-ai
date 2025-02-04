import { useDialogueBoxControl } from "./hooks/useDialogueBoxControl";
import { Loader } from "./components/Loader";
import { UserMessage } from "./components/User/UserMessage";
import { AssistantMessage } from "./components/Assistant/AssistantMessage";
import type { Message } from "ai";

export interface DialogueBoxProps {
  messages?: Message[];
  isLoading?: boolean;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
}

export const DialogueBox = ({ messages, isLoading }: DialogueBoxProps) => {
  const { messagesEndRef } = useDialogueBoxControl(messages);

  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[600px]">
      <div className="space-y-4">
        {messages?.map((message) => {
          if (!message) return null;

          if (message.role === "assistant") {
            return <AssistantMessage message={message} key={message.id} />;
          }

          if (message.role === "user") {
            return <UserMessage message={message} key={message.id} />;
          }
        })}
      </div>

      {isLoading && (
        <div className="mt-10 flex justify-center">
          <Loader />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
