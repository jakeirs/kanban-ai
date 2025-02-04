import { Message } from "ai/react";
import { useDialogueBoxControl } from "./hooks/useDialogueBoxControl";
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";
import { Loader } from "./components/Loader";

interface DialogueBoxProps {
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

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  messages,
  isLoading,
  addToolResult,
}) => {
  const { messagesEndRef } = useDialogueBoxControl(messages);

  console.log("messages", messages);

  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[600px]">
      <div className="space-y-4">
        {messages?.map((message: Message) => {
          return (
            <div key={message.id}>
              {message.role === "assistant" && addToolResult ? (
                <AssistantMessage
                  message={message}
                  addToolResult={addToolResult}
                />
              ) : message.role === "user" ? (
                <UserMessage content={message.content} id={message.id} />
              ) : null}
            </div>
          );
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
