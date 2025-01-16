"use client";

import React, { useState } from "react";
import { MicrophoneButton } from "../MicrophoneButton";
import { Mic, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ControlDrawerTabs } from "@/components/ui/custom/tabs";
import { tabs } from "./props";

interface VoiceDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const VoiceDrawer: React.FC<VoiceDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("voice");

  return (
    <>
      {/* Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[70%] rounded-t-3xl">
          <SheetHeader className="space-y-4">
            {/* Context Selector */}
            <ControlDrawerTabs tabs={tabs} />
            <div className="flex justify-between items-center">
              <SheetTitle className="text-3xl">How can I help you?</SheetTitle>
            </div>
          </SheetHeader>

          <div className="mt-8 space-y-4">
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
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
