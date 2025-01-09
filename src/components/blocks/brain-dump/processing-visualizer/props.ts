import { ProcessingVisualizerProps } from ".";

export const exampleProcessingProps: ProcessingVisualizerProps = {
  // Keywords extracted from user's brain dump input
  keywords: [
    "mobile app launch",
    "marketing strategy",
    "user testing",
    "social media",
    "analytics setup",
    "documentation"
  ],

  // Connections identified by the AI relating to existing project elements
  connections: [
    {
      type: "Primary Goal",
      target: "Launch MVP by Q2",
      category: "goal"
    },
    {
      type: "Marketing Stream",
      target: "Social Media Campaign",
      category: "stream"
    },
    {
      type: "Development Stream",
      target: "User Testing Phase",
      category: "stream"
    },
    {
      type: "Immediate Task",
      target: "Set Up Analytics Dashboard",
      category: "task"
    },
    {
      type: "Required Resource",
      target: "Technical Documentation",
      category: "resource"
    },
    {
      type: "Related Task",
      target: "Create Instagram Content",
      category: "task"
    }
  ],

  // Boolean to control processing state
  isProcessing: true
};