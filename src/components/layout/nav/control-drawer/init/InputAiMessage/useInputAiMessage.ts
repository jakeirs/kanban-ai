import { useState } from "react"

interface UseInputAiMessageProps {
  initialMode?: "voice" | "keyboard"
}

export const useInputAiMessage = ({ initialMode = "keyboard" }: UseInputAiMessageProps = {}) => {
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">(initialMode)
  const [message, setMessage] = useState("")

  const toggleInputMode = (mode: "voice" | "keyboard") => {
    setInputMode(mode)
    // Reset message when switching modes
    setMessage("")
  }

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage)
  }

  return {
    inputMode,
    message,
    toggleInputMode,
    handleMessageChange
  }
}
