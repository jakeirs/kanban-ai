import { Message } from "ai/react"
import { useEffect, useRef } from "react"
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";
import { Loader } from "./components/Loader";

interface DialogueBoxProps {
  messages?: Message[];
  isLoading?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  messages,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
      <div className="space-y-4">
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
      {isLoading && (
        <div className="mt-10 flex justify-center">
          <Loader />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
