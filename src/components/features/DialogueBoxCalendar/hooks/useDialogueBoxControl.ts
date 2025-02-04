import { Message } from "ai/react"
import { useEffect, useRef } from "react"

export const useDialogueBoxControl = (messages?: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return {
    messagesEndRef
  }
}
