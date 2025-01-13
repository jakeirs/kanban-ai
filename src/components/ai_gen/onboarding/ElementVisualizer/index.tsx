"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProcessedInput {
  id: string;
  rawText: string;
  type: "vision" | "resource" | "constraint" | "goal";
  confidence: number;
  insights: Array<{
    text: string;
    type: "suggestion" | "question" | "observation";
    importance: number;
  }>;
  possibleExpansions: string[];
}

const ElementVisualizer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeExpansionIndex, setActiveExpansionIndex] = useState(0);

  // Example input data
  const processedInput: ProcessedInput = {
    id: "1",
    rawText: "I want to create a website for sharing recipes",
    type: "vision",
    confidence: 0.9,
    insights: [
      {
        text: "Would you like to focus on any particular cuisine?",
        type: "question",
        importance: 0.7,
      },
      {
        text: "Consider adding social features for recipe sharing",
        type: "suggestion",
        importance: 0.9,
      },
      {
        text: "This could include video tutorials",
        type: "observation",
        importance: 0.6,
      },
    ],
    possibleExpansions: [
      "What features would your recipe website have?",
      "Do you have experience with web development?",
      "What makes your recipe website unique?",
    ],
  };

  // Rotate through expansions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExpansionIndex(
        (prev) => (prev + 1) % processedInput.possibleExpansions.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [processedInput.possibleExpansions.length]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {processedInput.rawText}
                </h3>
                <p className="text-sm text-gray-500">
                  Confidence: {processedInput.confidence * 100}%
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500"
            >
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-200 
                  ${isExpanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Insights Section - Always visible */}
        <div className="p-6 bg-white/50">
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "0" }}
            transition={{ duration: 0.3 }}
            className={`space-y-4 overflow-hidden ${isExpanded ? "" : "hidden"}`}
          >
            {/* Insights */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                Insights & Suggestions
              </h4>
              {processedInput.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start space-x-3 p-3 rounded-lg
                    ${
                      insight.type === "suggestion"
                        ? "bg-purple-50"
                        : insight.type === "question"
                          ? "bg-blue-50"
                          : "bg-green-50"
                    }`}
                >
                  <div className="flex-shrink-0">
                    {insight.type === "suggestion" ? (
                      <Lightbulb className="h-5 w-5 text-purple-500" />
                    ) : insight.type === "question" ? (
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Brain className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{insight.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expansion Suggestions */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Explore Further
              </h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExpansionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="h-5 w-5 text-purple-500" />
                    <p className="text-sm text-purple-700">
                      {processedInput.possibleExpansions[activeExpansionIndex]}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
};

export default ElementVisualizer;
