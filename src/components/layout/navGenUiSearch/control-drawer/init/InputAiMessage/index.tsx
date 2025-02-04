"use client";

import React from "react";
import { useInputAiMessage } from "./useInputAiMessage";
import { DialogueBox } from "./DialogueBox";
import { InputModeToggle } from "./InputModeToggle";
import { InputForm } from "./InputForm";

interface InputAiMessageProps {
  onMessageSubmit?: (message: string) => void;
}

export const InputAiMessage: React.FC<InputAiMessageProps> = ({
  onMessageSubmit,
}) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    inputMode,
    toggleInputMode,
    onRecordingComplete,
    isLoading,
    addToolResult,
    append,
    setMessages,
  } = useInputAiMessage();

  return (
    <div className="space-y-4">
      <DialogueBox
        messages={messages}
        isLoading={isLoading}
        addToolResult={addToolResult}
      />
      <InputModeToggle
        inputMode={inputMode}
        toggleInputMode={toggleInputMode}
      />
      <InputForm
        inputMode={inputMode}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onRecordingComplete={onRecordingComplete}
        append={append}
        setMessages={setMessages}
      />
    </div>
  );
};
