"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Mic,
  MicOff,
  Sparkles,
  Plus,
  MoveDiagonal,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// First, let's define our types for better code organization and type safety
interface ProjectElement {
  id: string;
  text: string;
  importance: number;
  position: { x: number; y: number };
  connections: string[];
}

interface CanvasContextType {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  addElement: (element: ProjectElement) => void;
  elements: ProjectElement[];
  canvasState: "initial" | "listening" | "processing" | "insight";
  energy: number;
}

// Create our context with proper typing
const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Create a custom hook for easy context usage
export const useLivingCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useLivingCanvas must be used within LivingCanvasProvider");
  }
  return context;
};

// Our main component implementation
export const LivingCanvasWrapper: React.FC<{
  children: React.ReactNode;
  onStateChange?: (state: string) => void;
}> = ({ children, onStateChange }) => {
  // State management
  const [isListening, setIsListening] = useState(false);
  const [elements, setElements] = useState<ProjectElement[]>([]);
  const [canvasState, setCanvasState] = useState<
    "initial" | "listening" | "processing" | "insight"
  >("initial");
  const [energy, setEnergy] = useState(0);

  // References and utilities
  const canvasRef = useRef<HTMLDivElement>(null);

  // Animation variants for different components
  const backgroundVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  const promptVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Dynamic background style based on energy level
  const getBackgroundStyle = () => ({
    background: `
      radial-gradient(
        circle at ${50 + energy * 30}% ${50 + energy * 30}%, 
        rgba(124, 58, 237, ${0.1 + energy * 0.2}),
        rgba(139, 92, 246, ${0.05 + energy * 0.15}),
        rgba(167, 139, 250, ${0.03 + energy * 0.1})
      )
    `,
  });

  // Energy simulation effect
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setEnergy((prev) => {
          const newEnergy = prev + (Math.random() * 0.1 - 0.05);
          return Math.max(0, Math.min(1, newEnergy));
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setEnergy(0);
    }
  }, [isListening]);

  // Notify parent component of state changes
  useEffect(() => {
    onStateChange?.(canvasState);
  }, [canvasState, onStateChange]);

  // Core functionality handlers
  const startListening = () => {
    setIsListening(true);
    setCanvasState("listening");
  };

  const stopListening = () => {
    setIsListening(false);
    setCanvasState("processing");

    // Simulate processing time with visual feedback
    setTimeout(() => {
      setCanvasState("insight");
    }, 2000);
  };

  const addElement = (element: ProjectElement) => {
    setElements((prev) => [...prev, element]);
  };

  return (
    <CanvasContext.Provider
      value={{
        isListening,
        startListening,
        stopListening,
        addElement,
        elements,
        canvasState,
        energy,
      }}
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* Animated Background Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          style={getBackgroundStyle()}
        >
          {/* Grid Pattern for depth */}
          <svg width="100%" height="100%" className="opacity-20">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-purple-500"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Energy Waves Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isListening ? [0.2, 0.4, 0.2] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        </motion.div>

        {/* Interactive Content Layer */}
        <div className="relative z-10 w-full h-full">
          {/* Initial Welcome Screen */}
          <AnimatePresence>
            {canvasState === "initial" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                variants={promptVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.h1
                  className="text-3xl font-bold text-purple-900 mb-8"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Begin Your Project Journey
                </motion.h1>

                <div className="space-y-6">
                  <Button
                    onClick={startListening}
                    className="relative z-20 rounded-full px-8 py-6 bg-purple-500 hover:bg-purple-600 text-white transform transition-all hover:scale-105"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Start Speaking
                  </Button>

                  <div className="text-center">
                    <span className="text-sm text-purple-700 opacity-75">
                      Share your project idea, no matter how rough
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="relative z-10">{children}</div>

          {/* Floating Action Button */}
          <AnimatePresence>
            {canvasState !== "initial" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute bottom-6 right-6 z-30"
              >
                <Button
                  size="icon"
                  className={cn(
                    "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-purple-500 hover:bg-purple-600",
                    isListening && "animate-pulse"
                  )}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <MicOff className="h-6 w-6 text-white" />
                  ) : (
                    <Mic className="h-6 w-6 text-white" />
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Processing Overlay */}
        <AnimatePresence>
          {canvasState === "processing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-black/10 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
                <p className="text-purple-900 font-medium">
                  Processing your ideas...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CanvasContext.Provider>
  );
};

export default LivingCanvasWrapper;
