interface RecognizedElement {
  id: string;
  type: "core" | "essential" | "detail" | "question" | "insight";
  content: string;
  confidence: number;
  importance: number;
  context?: string;
  relatedElements?: string[]; // IDs of related elements
  category: "location" | "activity" | "logistics" | "preparation" | "concern";
  status: "confirmed" | "needs_clarification" | "suggested";
  metadata: {
    timeRelevance?: "before" | "during" | "after";
    location?: string;
    estimatedCost?: string;
    priority?: number;
  };
  aiInsights: Array<{
    type: "suggestion" | "warning" | "tip" | "question";
    content: string;
    importance: number;
  }>;
}

export const vietnamTripRecognition = {
  sessionId: "vt-2025-001",
  timestamp: "2025-01-09T14:30:00Z",
  processingConfidence: 0.95,

  coreContext: {
    mainGoal: "Experience authentic Vietnam through local culture and food",
    timeframe: "Planning for summer 2025",
    duration: "2 weeks",
    travelStyle: "Adventure and cultural immersion",
  },

  recognizedElements: [
    {
      id: "loc-001",
      type: "core",
      content: "Visiting Hanoi as main arrival point",
      confidence: 0.98,
      importance: 0.9,
      category: "location",
      status: "confirmed",
      metadata: {
        timeRelevance: "during",
        location: "Hanoi",
        estimatedCost: "flight costs vary by season",
      },
      aiInsights: [
        {
          type: "tip",
          content:
            "Consider spending 3-4 days in Hanoi to adjust to time zone and explore the Old Quarter",
          importance: 0.8,
        },
        {
          type: "suggestion",
          content:
            "Look into early morning arrival flights to maximize your first day",
          importance: 0.7,
        },
      ],
    },
    {
      id: "prep-001",
      type: "essential",
      content: "Need visa preparation",
      confidence: 0.95,
      importance: 1.0,
      category: "preparation",
      status: "needs_clarification",
      metadata: {
        timeRelevance: "before",
        priority: 1,
      },
      aiInsights: [
        {
          type: "warning",
          content:
            "Visa processing can take 2-3 weeks - should be started at least 1 month before travel",
          importance: 0.9,
        },
        {
          type: "question",
          content:
            "Will you be visiting any other Southeast Asian countries during this trip?",
          importance: 0.8,
        },
      ],
    },
    {
      id: "act-001",
      type: "essential",
      content: "Interest in street food exploration",
      confidence: 0.92,
      importance: 0.85,
      category: "activity",
      status: "confirmed",
      metadata: {
        timeRelevance: "during",
        location: "multiple cities",
        estimatedCost: "$10-20 per day for street food",
      },
      aiInsights: [
        {
          type: "suggestion",
          content:
            "Consider booking a local food tour for your first day to learn about food safety and local specialties",
          importance: 0.85,
        },
        {
          type: "tip",
          content:
            "Morning markets offer the freshest food options and best cultural experience",
          importance: 0.75,
        },
      ],
    },
    {
      id: "log-001",
      type: "essential",
      content: "Transportation between cities",
      confidence: 0.88,
      importance: 0.9,
      category: "logistics",
      status: "needs_clarification",
      metadata: {
        timeRelevance: "during",
        estimatedCost: "varies by transport type",
      },
      aiInsights: [
        {
          type: "question",
          content:
            "Would you prefer overnight trains or domestic flights between major cities?",
          importance: 0.85,
        },
        {
          type: "tip",
          content:
            "Overnight trains offer a unique experience and save on accommodation costs",
          importance: 0.8,
        },
      ],
    },
    {
      id: "con-001",
      type: "detail",
      content: "Concern about weather in summer",
      confidence: 0.85,
      importance: 0.75,
      category: "concern",
      status: "needs_clarification",
      metadata: {
        timeRelevance: "during",
      },
      aiInsights: [
        {
          type: "suggestion",
          content:
            "Plan indoor activities and temple visits during peak heat hours (11am-2pm)",
          importance: 0.8,
        },
        {
          type: "tip",
          content:
            "Northern Vietnam tends to be cooler than the south during summer months",
          importance: 0.75,
        },
      ],
    },
  ],

  immediateActionItems: [
    {
      id: "action-001",
      title: "Start visa application process",
      priority: 1,
      deadline: "At least 1 month before departure",
      dependsOn: [],
    },
    {
      id: "action-002",
      title: "Research and book accommodation in Hanoi",
      priority: 2,
      deadline: "3 months before departure",
      dependsOn: ["action-001"],
    },
  ],

  missingCriticalInformation: [
    {
      id: "missing-001",
      aspect: "Specific travel dates",
      importance: "Critical",
      impact: "Affects flight booking and weather preparation",
    },
    {
      id: "missing-002",
      aspect: "Budget constraints",
      importance: "High",
      impact: "Affects accommodation and activity recommendations",
    },
  ],
};
