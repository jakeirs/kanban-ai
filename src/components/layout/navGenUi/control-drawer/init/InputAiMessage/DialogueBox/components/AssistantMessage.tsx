import { Message } from "ai/react"
import { ToolUI } from "./ToolUI"
import { useToolInvocation } from "../hooks/useToolInvocation"

interface AssistantMessageProps {
  message: Message
}

export const AssistantMessage = ({ message }: AssistantMessageProps) => {
  const { getUIArgs } = useToolInvocation(message.toolInvocations)

  return (
    <div>
      {getUIArgs.map((args, index) => (
        <ToolUI key={index} args={args} messageId={message.id} />
      ))}
    </div>
  )
}
