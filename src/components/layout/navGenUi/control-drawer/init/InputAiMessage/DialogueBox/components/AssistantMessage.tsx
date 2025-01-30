import { Message } from "ai/react"
import { ToolUI } from "./ToolUI"
import { useToolInvocation } from "../hooks/useToolInvocation"
import { Loader as Loaders } from "lucide-react"

interface AssistantMessageProps {
  message: Message
  isLoading?: boolean
}

export const AssistantMessage = ({
  message,
  isLoading,
}: AssistantMessageProps) => {
  const {
    getUIArgs,
    calendarArgs,
    toolState,
    hasCalendarTools,
    hasGetUITools
  } = useToolInvocation(message.toolInvocations)

  return (
    <div className="relative">
      {hasGetUITools &&
        getUIArgs.map((args, index) => (
          <ToolUI
            key={index}
            args={args}
            messageId={message.id}
            toolState={toolState}
            toolType="getUI"
          />
        ))}
      {hasCalendarTools &&
        calendarArgs.map((args, index) => (
          <ToolUI
            key={index}
            args={args}
            messageId={message.id}
            toolState={toolState}
            toolType="CALENDAR_EVENTS"
          />
        ))}
    </div>
  )
}
