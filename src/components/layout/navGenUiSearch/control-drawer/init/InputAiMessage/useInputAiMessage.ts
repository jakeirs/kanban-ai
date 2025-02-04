import { Message, useChat } from "ai/react";
import { generateId } from "ai";
import { useCallback, useState } from "react";
import { format } from "date-fns";

interface UseInputAiMessageProps {
  initialMode?: "voice" | "keyboard";
}

export const useInputAiMessage = ({
  initialMode = "keyboard",
}: UseInputAiMessageProps = {}) => {
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">(initialMode);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    setMessages,
    reload,
    isLoading,
    addToolResult,
    append,
  } = useChat({
    api: "/api/search/chat",
    body: {
      CURRENT_TIME: format(new Date(), "PP pp"),
    },
  });

  const onRecordingComplete = useCallback(async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    try {
      const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      });

      const transcript = await response.json();
      const currentTime = format(new Date(), "PP pp")
      const userMessage = `${transcript.text}\nCURRENT_TIME: ${currentTime}`

      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: generateId(),
          content: userMessage,
          role: "user",
        },
      ]);
      await reload();
    } catch (error) {
      console.error("Failed to send recording to API:", error);
    }
  }, []);

  const customHandleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentTime = format(new Date(), "PP pp")
    const userMessage = `${input}\nCURRENT_TIME: ${currentTime}`
    await append({
      id: generateId(),
      content: userMessage,
      role: "user"
    })
  }, [input, append])

  const toggleInputMode = (mode: "voice" | "keyboard") => {
    setInputMode(mode);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: customHandleSubmit,
    inputMode,
    toggleInputMode,
    onRecordingComplete,
    isLoading,
    addToolResult,
    append,
    setMessages,
  };
};
