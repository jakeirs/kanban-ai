import { Message, useChat } from "ai/react"
import { generateId } from "ai"
import { useCallback, useState } from "react"

type InputMode = "write" | "microphone"

export const useKanbanAiChat = () => {
  const [inputMode, setInputMode] = useState<InputMode>("write")

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useChat({
    api: "/api/kanban/chat",
  })

  const onRecordingComplete = useCallback(async (blob: Blob) => {
    const formData = new FormData()
    formData.append("file", blob)
    try {
      const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      })

      const transcript = await response.json()

      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: generateId(),
          content: transcript.text,
          role: "user",
        },
      ])
      await reload()
    } catch (error) {
      console.error("Failed to send recording to API:", error)
    }
  }, [])

  const toggleInputMode = () => {
    setInputMode((current) => (current === "write" ? "microphone" : "write"))
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    inputMode,
    toggleInputMode,
    onRecordingComplete,
  }
}
