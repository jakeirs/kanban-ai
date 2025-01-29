import { Message, useChat } from "ai/react";
import { generateId } from "ai";
import { useCallback, useState } from "react";

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
    handleSubmit,
    setMessages,
    reload,
    isLoading,
    addToolResult
  } = useChat({
    api: "/api/schedule/chat",
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

      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: generateId(),
          content: transcript.text,
          role: "user",
        },
      ]);
      await reload();
    } catch (error) {
      console.error("Failed to send recording to API:", error);
    }
  }, []);

  const toggleInputMode = (mode: "voice" | "keyboard") => {
    setInputMode(mode);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    inputMode,
    toggleInputMode,
    onRecordingComplete,
    isLoading,
  };
};
