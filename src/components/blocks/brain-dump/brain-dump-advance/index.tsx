"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Mic,
  Type,
  Pencil,
  Stars,
  Waves,
  ArrowRight,
  CheckCircle2,
  Clock,
  ListTodo,
  Link,
  BookMarked,
} from "lucide-react";

const ImmersiveThoughtSpace: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<
    "opening" | "interaction" | "processing" | "resolution"
  >("opening");
  const [inputMode, setInputMode] = useState<"text" | "voice" | "gesture">(
    "text"
  );
  const [inputContent, setInputContent] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);

  // Simulate the flow through stages
  useEffect(() => {
    if (isOpen) {
      if (stage === "opening") {
        const timer = setTimeout(() => setStage("interaction"), 1500);
        return () => clearTimeout(timer);
      }
    } else {
      // Reset when closed
      setStage("opening");
      setInputContent("");
      setProcessingProgress(0);
    }
  }, [isOpen, stage]);

  // Handle input submission
  const handleSubmit = () => {
    if (inputContent.trim()) {
      setStage("processing");
      // Simulate processing with progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setProcessingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setStage("resolution");
        }
      }, 500);
    }
  };

  const ProcessingStage = () => (
    <div className="space-y-6 p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin inline-block">
          <Brain className="h-8 w-8 text-purple-500" />
        </div>
        <div className="text-sm text-purple-700">Processing your input...</div>
        <Progress value={processingProgress} className="w-full" />
      </div>

      {/* Floating keywords animation */}
      <div className="relative h-40">
        {["Project", "Timeline", "Resources"].map((word, index) => (
          <div
            key={word}
            className="absolute bg-white/90 rounded-full px-3 py-1 text-sm"
            style={{
              left: `${20 + index * 30}%`,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );

  const ResolutionStage = () => (
    <div className="space-y-8 p-4">
      {/* Summary Card */}
      <div className="bg-white/80 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold text-purple-900">Processed Input</h3>
        <p className="text-sm text-gray-600">{inputContent}</p>
      </div>

      {/* Action Bloom */}
      <div className="relative h-[300px]">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
            <Stars className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Action Petals */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
          <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Clock className="mr-2 h-4 w-4" />
            Schedule Task
          </Button>
        </div>

        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 transition-all duration-500">
          <Button className="bg-green-500 hover:bg-green-600 shadow-lg">
            <ListTodo className="mr-2 h-4 w-4" />
            Create Task
          </Button>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 transition-all duration-500">
          <Button className="bg-purple-500 hover:bg-purple-600 shadow-lg">
            <Link className="mr-2 h-4 w-4" />
            Link to Stream
          </Button>
        </div>

        <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500">
          <Button className="bg-rose-500 hover:bg-rose-600 shadow-lg">
            <BookMarked className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Action taken confirmation */}
      <div className="text-center space-y-2">
        <Button
          className="w-full"
          onClick={() => {
            setStage("interaction");
            setInputContent("");
          }}
        >
          Start New Brain Dump
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
        >
          <Brain className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-3xl bg-white/95 backdrop-blur-md border-none"
      >
        <SheetHeader className="relative z-10">
          <SheetTitle className="text-center text-2xl font-bold text-purple-900">
            {stage === "resolution" ? "Actions Available" : "Brain Dump"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 relative z-10">
          {stage === "interaction" && (
            <div className="space-y-6 p-4">
              <div className="flex justify-center space-x-4">
                <Button
                  variant={inputMode === "text" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setInputMode("text")}
                >
                  <Type className="h-4 w-4" />
                </Button>
                <Button
                  variant={inputMode === "voice" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setInputMode("voice")}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant={inputMode === "gesture" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setInputMode("gesture")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="What's on your mind about the project?"
                className="min-h-[100px] bg-white/50 backdrop-blur-sm"
              />

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!inputContent.trim()}
              >
                Process Input
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {stage === "processing" && <ProcessingStage />}
          {stage === "resolution" && <ResolutionStage />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ImmersiveThoughtSpace;
