"use client";

import React from "react";
import { useInputAiMessage } from "./useInputAiMessage";
import { DialogueBox } from "./DialogueBox";
import { InputModeToggle } from "./InputModeToggle";
import { InputForm } from "./InputForm";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { sortEvents } from "@/app/(pages)/mobile/scheduler/get/_utils/sortEvents";
import { convertToLocalTime } from "@/app/api/schedule/chat/tools/afterConfirmationTool/utils/convertTimeToLocalTime";
import { format } from "date-fns";

interface InputAiMessageProps {
  onMessageSubmit?: (message: string) => void;
}

export const InputAiMessage: React.FC<InputAiMessageProps> = ({
  onMessageSubmit,
}) => {
  const eventsData = useQuery(
    api.tables.events.queries.getCurrentUserEvents.default
  );

  if (!eventsData) {
    return <div>... Loading</div>;
  }

  const sortedEvents = convertToLocalTime(sortEvents(eventsData.currectEvents));

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
  } = useInputAiMessage({
    userCalendarObject: sortedEvents,
    currentTime: format(new Date(), "PP pp"),
  });

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
