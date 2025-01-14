"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface MicrophoneButtonProps {
  onClick: () => void;
  classNames?: string;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  onClick,
  classNames,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnClick = () => {
    setIsProcessing((prev) => !prev);
    onClick();
  };

  return (
    <motion.div className="relative">
      <Button
        onClick={handleOnClick}
        className={cn(
          "h-[85px] w-[85px] rounded-full",
          "bg-gradient-to-br from-white via-purple-100 to-purple-200",
          "border-4 border-white",
          "before:content-[''] before:absolute before:inset-[2px] before:rounded-full",
          "before:bg-gradient-radial before:from-purple-100 before:via-purple-300 before:to-purple-500",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-300",
          "hover:scale-105",
          isProcessing && [
            "scale-110",
            "before:animate-[pulse_0.5s_ease-in-out_infinite]",
            "shadow-purple-400/50 shadow-lg",
            "border-purple-300",
            "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300",
          ],
          classNames
        )}
      >
        <AnimatePresence>
          {/* Glow ring animation */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border-2 border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 1, 0], scale: [0.95, 1.05, 0.95] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 7, // Glow every 7 seconds
              ease: "easeInOut",
            }}
          />

          {/* Processing animation */}
          {isProcessing && (
            <motion.div
              className="absolute inset-[-8px] rounded-full border-2 border-purple-300/30"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Microphone icon */}
        <motion.div
          animate={
            isProcessing
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: isProcessing ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <Mic
            className={cn(
              "h-8 w-8 relative z-10",
              "text-purple-600",
              "transition-all duration-300",
              isProcessing && "text-purple-800"
            )}
          />
        </motion.div>
      </Button>
    </motion.div>
  );
};
