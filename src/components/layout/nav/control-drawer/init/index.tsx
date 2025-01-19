"use client";

import React from "react";
import { Mic, Keyboard, Wand2, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTitle } from "@/components/ui/sheet";
import { MicrophoneButton } from "../../MicrophoneButton";
import { ControlDrawerTabs } from "@/components/ui/custom/tabs";
import { tabs } from "../props";

interface InitProps {
  inputMode: "voice" | "keyboard";
  setInputMode: (mode: "voice" | "keyboard") => void;
}

export const Init: React.FC<InitProps> = ({ inputMode, setInputMode }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center my-6">
        <SheetTitle className="text-3xl">How can I help you?</SheetTitle>
      </div>
      <ControlDrawerTabs tabs={tabs} />

      <div className="space-y-4 mt-5">
        {/* Input Mode Toggle */}
        <div className="flex justify-center gap-2">
          <Button
            variant={inputMode === "voice" ? "default" : "outline"}
            size="sm"
            onClick={() => setInputMode("voice")}
            className="w-32"
          >
            <Mic className="h-4 w-4 mr-2" />
            Voice
          </Button>
          <Button
            variant={inputMode === "keyboard" ? "default" : "outline"}
            size="sm"
            onClick={() => setInputMode("keyboard")}
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
            />
          )}
        </div>
        <div className="flex justify-between px-2">
          <Button variant="ghost" size="sm">
            <Wand2 className="h-4 w-4 mr-2" />
            Process
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Clarify
          </Button>
          <Button variant="ghost" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Enhance
          </Button>
        </div>
      </div>
    </div>
  );
};
