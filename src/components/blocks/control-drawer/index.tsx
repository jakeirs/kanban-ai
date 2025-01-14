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

interface VoiceDrawerProps {
  // onVoiceCommand: (context: string) => void;
}

type Context = "planner" | "search" | "brain-dump" | "conversation";

const VoiceDrawer: React.FC<VoiceDrawerProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentContext, setCurrentContext] = useState<Context>("conversation");
  const [inputMode, setInputMode] = useState<"voice" | "keyboard">("voice");

  const handleVoiceStart = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    setIsRecording(true);
    // Simulate voice recording for demo
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

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
      {/* Main Action Button */}
      <Button
        onClick={handleVoiceStart}
        className={cn(
          "fixed bottom-20 right-4 h-16 w-16 rounded-full",
          "bg-gradient-to-br from-white to-purple-100",
          "border-4 border-purple-100 shadow-lg",
          "hover:shadow-xl transition-all duration-300",
          isRecording && "animate-pulse border-purple-300 scale-110",
          isProcessing && "border-purple-400"
        )}
      >
        {isProcessing ? (
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
        ) : (
          <Mic
            className={cn(
              "h-8 w-8",
              isRecording ? "text-purple-600" : "text-purple-500"
            )}
          />
        )}
      </Button>

      {/* Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[70%] rounded-t-3xl">
          <SheetHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <SheetTitle>How can I help you?</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Context Selector */}
            <Tabs
              value={currentContext}
              onValueChange={(value) => setCurrentContext(value as Context)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 h-14">
                {(
                  [
                    "planner",
                    "search",
                    "brain-dump",
                    "conversation",
                  ] as Context[]
                ).map((context) => {
                  const Icon = getContextIcon(context);
                  return (
                    <TabsTrigger
                      key={context}
                      value={context}
                      className="flex flex-col gap-1 capitalize"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{context}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
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

export default VoiceDrawer;
