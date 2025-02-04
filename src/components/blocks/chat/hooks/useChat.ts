import { Message, useChat as useChatSdk } from "ai/react";
import { generateId } from "ai";
import { useCallback } from "react";

interface UseChatProps {
  userCalendarObject?: any;
  currentTime?: string;
  api?: string;
}

export const useChat = ({
  api = "/api/chat",
  userCalendarObject,
  currentTime,
}: UseChatProps) => {
  const { input, handleInputChange, setMessages, reload, ...chatMethods } =
    useChatSdk({
      api,
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

      // Create a fake event to clear the input
      const clearEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      handleInputChange(clearEvent);
      await reload();
    },
    [input, setMessages, handleInputChange]
  );

  return {
    ...chatMethods,
    input,
    handleInputChange,
    setMessages,
    reload,
    handleSubmit: customHandleSubmit,
    onRecordingComplete,
  };
};
