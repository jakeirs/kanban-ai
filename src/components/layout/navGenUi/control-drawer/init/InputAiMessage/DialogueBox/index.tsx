import { Message } from "ai/react";
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";

interface DialogueBoxProps {
  messages?: Message[];
  isLoading?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  messages,
  isLoading,
}) => {
  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
      {messages?.map((message: Message) => {
        return (
          <div key={message.id}>
            {message.role === "assistant" ? (
              <AssistantMessage message={message} isLoading={isLoading} />
            ) : (
              <UserMessage content={message.content} id={message.id} />
            )}
          </div>
        );
      })}
    </div>
  );
};
