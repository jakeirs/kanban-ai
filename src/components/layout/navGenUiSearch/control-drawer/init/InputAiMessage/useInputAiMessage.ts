import { Message, useChat } from "ai/react";
import { generateId } from "ai";
import { useCallback, useState } from "react";
import { format } from "date-fns";

interface UseInputAiMessageProps {
  initialMode?: "voice" | "keyboard";
  userCalendarObject?: any;
  currentTime?: string;
}

export const useInputAiMessage = ({
  initialMode = "keyboard",
  userCalendarObject,
  currentTime,
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

  const customHandleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: generateId(),
          content: input,
          role: "user",
        },
        {
          id: generateId(),
          role: "user",
          content: `CurrentTime: ${currentTime} My Calendar: ${JSON.stringify(userCalendarObject)}`,
        },
      ]);

      await reload();
    },
    [input, setMessages]
  );

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
