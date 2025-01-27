"use client";

import React from "react";
import { Mic, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceRecorder } from "@/components/blocks/voice-recorder";
import { useInputAiMessage } from "./useInputAiMessage";
import { Message } from "ai/react";

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
  } = useInputAiMessage();

  return (
    <div className="space-y-4">
      {/* Messages Container */}
      <div className="flex-1 mb-4 space-y-4 overflow-y-auto max-h-[300px]">
        {messages?.map((m: Message) => (
          <div
            key={m.id}
            className={`p-4 rounded-lg ${
              m.role === "assistant" ? "bg-gray-100 ml-4" : "bg-blue-100 mr-4"
            }`}
          >
            <div className="mb-2 text-sm font-semibold text-gray-600">
              {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
            </div>
            <div className="text-gray-800">{m.content}</div>
          </div>
        ))}
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={inputMode === "voice" ? "default" : "outline"}
          size="sm"
          onClick={() => toggleInputMode("voice")}
          className="w-32"
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice
        </Button>
        <Button
          variant={inputMode === "keyboard" ? "default" : "outline"}
          size="sm"
          onClick={() => toggleInputMode("keyboard")}
          className="w-32"
        >
          <Keyboard className="h-4 w-4 mr-2" />
          Type
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        {inputMode === "voice" ? (
          <div className="text-center space-y-6">
            <p className="text-gray-500 text-lg">
              Tap the mic button to start speaking
            </p>
            <VoiceRecorder onRecordingComplete={onRecordingComplete} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <textarea
              className="w-full h-32 p-3 border rounded-lg mb-2"
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
