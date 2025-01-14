"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Mic } from "lucide-react";
import { useState } from "react";

interface MicrophoneButtonProps {
  onClick: () => void;
  classNames?: string;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  onClick,
  classNames,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnClick = () => {
    setIsRecording((prev) => !prev);
    setIsProcessing((prev) => !prev);
    onClick();
  };

  return (
    <Button
      onClick={handleOnClick}
      className={cn(
        "h-24 w-24 rounded-full absolute",
        "bg-gradient-to-br from-white to-purple-100",
        "border-4 border-purple-100 shadow-lg",
        "hover:shadow-xl transition-all duration-300",
        classNames,
        isProcessing && "border-purple-400 scale-110"
      )}
    >
      <Mic
        className={cn(
          "h-8 w-8",
          isRecording ? "text-purple-600" : "text-purple-500"
        )}
      />
    </Button>
  );
};
