"use client"

import React from "react"
import { Mic, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MicrophoneButton } from "../../../MicrophoneButton"
import { useInputAiMessage } from "./useInputAiMessage"

interface InputAiMessageProps {
  onMessageSubmit?: (message: string) => void
}

export const InputAiMessage: React.FC<InputAiMessageProps> = ({ onMessageSubmit }) => {
  const { inputMode, message, toggleInputMode, handleMessageChange } = useInputAiMessage()

  return (
    <div className="space-y-4">
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

      <div className="flex flex-col items-center justify-center h-48">
        {inputMode === "voice" ? (
          <div className="text-center space-y-6">
            <p className="text-gray-500 text-lg">
              Tap the mic button to start speaking
            </p>
            <MicrophoneButton
              onClick={() => {}}
              classNames="h-[100px] w-[100px]"
            />
          </div>
        ) : (
          <textarea
            className="w-full h-32 p-3 border rounded-lg"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => handleMessageChange(e.target.value)}
          />
        )}
      </div>
    </div>
  )
}
