"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { InputModeToggle } from "./InputModeToggle";
import { InputForm } from "./InputForm";

interface UserInputZoneProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onRecordingComplete: (blob: Blob) => Promise<void>;
}

export const UserInputZone: React.FC<UserInputZoneProps> = ({
  handleInputChange,
  handleSubmit,
  onRecordingComplete,
  input,
}) => {
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("keyboard");

  const toggleInputMode = (mode: "voice" | "keyboard") => {
    setInputMode(mode);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4">
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
        />
      </div>
    </div>
  );
};
