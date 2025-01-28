import { Message } from "ai/react"
import { MessageCloud } from "./MessageCloud"

interface DialogueBoxProps {
  messages?: Message[]
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ messages }) => {
  return (
    <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
      {messages?.map((m: Message) => (
        <MessageCloud
          key={m.id}
          message={m.content}
          isAi={m.role === "assistant"}
          userName={m.role === "user" ? "Marcin" : undefined}
        />
      ))}
    </div>
  )
}
