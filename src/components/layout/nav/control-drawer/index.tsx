"use client";

import React, { useState } from "react";
import {
  Mic,
  Keyboard,
  X,
  Brain,
  Calendar,
  Search,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ControlDrawerTabs } from "./Tabs";

interface VoiceDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type Context = "planner" | "search" | "brain-dump" | "conversation";

export const VoiceDrawer: React.FC<VoiceDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentContext, setCurrentContext] = useState<Context>("conversation");
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("voice");

  const getContextIcon = (context: Context) => {
    switch (context) {
      case "planner":
        return Calendar;
      case "search":
        return Search;
      case "brain-dump":
        return Brain;
      case "conversation":
        return MessageCircle;
    }
  };

  return (
    <>
      {/* Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[70%] rounded-t-3xl">
          <SheetHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <SheetTitle>How can I help you?</SheetTitle>
            </div>

            {/* Context Selector */}
            <ControlDrawerTabs />
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

            {/* Recording/Processing State Feedback */}
            <div className="flex flex-col items-center justify-center h-48">
              {isRecording ? (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-200" />
                    <Mic className="h-12 w-12 text-purple-500 relative" />
                  </div>
                  <p className="text-sm text-gray-600">Listening...</p>
                </div>
              ) : isProcessing ? (
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                  <p className="text-sm text-gray-600">Processing...</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  {inputMode === "voice" ? (
                    <p>Tap the mic button to start speaking</p>
                  ) : (
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg"
                      placeholder="Type your message here..."
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
