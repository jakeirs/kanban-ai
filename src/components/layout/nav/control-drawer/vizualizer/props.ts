export interface ProcessingVisualizerProps {
  keywords: string[]
  connections: Array<{
    type: string
    target: string
    category: "goal" | "stream" | "task" | "resource"
  }>
  isProcessing: boolean
}

export const exampleProcessingProps: ProcessingVisualizerProps = {
  keywords: [
    "mobile app launch",
    "marketing strategy", 
    "user testing",
    "social media",
    "analytics setup",
    "documentation"
  ],
  connections: [
    {
      type: "Primary Goal",
      target: "Launch MVP by Q2",
      category: "goal" as const
    },
    {
      type: "Marketing Stream",
      target: "Social Media Campaign",
      category: "stream" as const
    },
    {
      type: "Development Stream",
      target: "User Testing Phase",
      category: "stream" as const
    },
    {
      type: "Immediate Task",
      target: "Set Up Analytics Dashboard",
      category: "task" as const
    },
    {
      type: "Required Resource",
      target: "Technical Documentation",
      category: "resource" as const
    },
    {
      type: "Related Task",
      target: "Create Instagram Content",
      category: "task" as const
    }
  ],
  isProcessing: true
}
