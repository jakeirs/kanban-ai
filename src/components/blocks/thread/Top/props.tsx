// threadHeaderExamples.ts
import { Book, Briefcase, Brain, Heart, Plane } from "lucide-react";

// First, let's explicitly define our types to ensure type safety
export type ThreadStatus =
  | "thriving"
  | "needs-attention"
  | "dormant"
  | "in-focus";
export type InsightType = "pattern" | "observation" | "suggestion";

// Define interfaces for better type checking
interface ThreadMetrics {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  activeStreak: number;
}

interface ThreadHealth {
  status: ThreadStatus;
  lastActive: string;
  nextMilestone?: string;
}

interface ThreadInsight {
  type: InsightType;
  message: string;
  timestamp: string;
}

interface ThreadExample {
  title: string;
  projectColor: string;
  description: string;
  metrics: ThreadMetrics;
  health: ThreadHealth;
  insights: ThreadInsight[];
  icon: JSX.Element;
}

// Now define our examples with proper typing
export const threadExamples: Record<string, ThreadExample> = {
  readingChallenge: {
    title: "Reading Challenge",
    projectColor: "bg-yellow-300",
    description:
      "Build a consistent reading habit with AI-powered tracking and insights",
    metrics: {
      completionRate: 68,
      totalTasks: 30,
      completedTasks: 21,
      activeStreak: 7,
    },
    health: {
      status: "thriving",
      lastActive: "2 hours ago",
      nextMilestone: "Complete Chapter 5 by Friday",
    },
    insights: [
      {
        type: "pattern",
        message:
          "You're most consistent with reading between 7-8 PM. Consider scheduling your next session then!",
        timestamp: "2 hours ago",
      },
      {
        type: "observation",
        message: "Your reading speed has improved by 15% this week",
        timestamp: "1 day ago",
      },
    ],
    icon: <Book className="w-16 h-16 text-black/70" />,
  },

  workProject: {
    title: "Q1 Strategy Planning",
    projectColor: "bg-blue-300",
    description: "Develop and implement Q1 2025 business strategy",
    metrics: {
      completionRate: 45,
      totalTasks: 50,
      completedTasks: 23,
      activeStreak: 12,
    },
    health: {
      status: "in-focus",
      lastActive: "30 minutes ago",
      nextMilestone: "Stakeholder presentation next Tuesday",
    },
    insights: [
      {
        type: "suggestion",
        message:
          "Based on your energy patterns, tomorrow morning would be ideal for the complex planning tasks",
        timestamp: "1 hour ago",
      },
      {
        type: "pattern",
        message:
          "You complete 30% more tasks when you start with team alignment meetings",
        timestamp: "1 day ago",
      },
    ],
    icon: <Briefcase className="w-16 h-16 text-black/70" />,
  },

  wellnessTracker: {
    title: "Fitness Journey",
    projectColor: "bg-green-300",
    description: "Track and improve daily wellness habits",
    metrics: {
      completionRate: 82,
      totalTasks: 90,
      completedTasks: 74,
      activeStreak: 21,
    },
    health: {
      status: "thriving",
      lastActive: "4 hours ago",
      nextMilestone: "Monthly fitness assessment tomorrow",
    },
    insights: [
      {
        type: "observation",
        message:
          "You've maintained consistent exercise schedule for 3 weeks - this is becoming a solid habit!",
        timestamp: "3 hours ago",
      },
      {
        type: "suggestion",
        message:
          "Your energy levels peak after morning workouts. Consider moving more tasks to this timeframe.",
        timestamp: "2 days ago",
      },
    ],
    icon: <Heart className="w-16 h-16 text-black/70" />,
  },

  gardenPlanning: {
    title: "Garden Redesign",
    projectColor: "bg-purple-300",
    description: "Transform backyard into sustainable garden space",
    metrics: {
      completionRate: 15,
      totalTasks: 25,
      completedTasks: 4,
      activeStreak: 0,
    },
    health: {
      status: "needs-attention",
      lastActive: "5 days ago",
      nextMilestone: "Select plant varieties before spring",
    },
    insights: [
      {
        type: "suggestion",
        message:
          "This project seems stuck. Breaking it down into smaller tasks might help regain momentum.",
        timestamp: "1 day ago",
      },
      {
        type: "pattern",
        message:
          "Similar projects were more successful when started with a clear visual plan",
        timestamp: "3 days ago",
      },
    ],
    icon: <Plane className="w-16 h-16 text-black/70" />,
  },

  learningProject: {
    title: "AI Course",
    projectColor: "bg-gray-300",
    description: "Complete online AI fundamentals course",
    metrics: {
      completionRate: 35,
      totalTasks: 40,
      completedTasks: 14,
      activeStreak: 0,
    },
    health: {
      status: "dormant",
      lastActive: "2 weeks ago",
      nextMilestone: "Complete Module 3 exercises",
    },
    insights: [
      {
        type: "suggestion",
        message:
          "Consider reviewing your goals for this project. Would you like to adjust the timeline?",
        timestamp: "2 days ago",
      },
      {
        type: "observation",
        message:
          "You made great progress initially. Similar patterns in other projects were overcome by setting smaller, daily goals.",
        timestamp: "1 week ago",
      },
    ],
    icon: <Brain className="w-16 h-16 text-black/70" />,
  },
};

// Utility functions with proper typing
export const threadUtils = {
  needsAttention: (metrics: ThreadMetrics): boolean => {
    return metrics.completionRate < 30 || metrics.activeStreak === 0;
  },

  getStatusColor: (status: ThreadStatus): string => {
    const colors: Record<ThreadStatus, string> = {
      thriving: "bg-green-300",
      "needs-attention": "bg-amber-300",
      dormant: "bg-gray-300",
      "in-focus": "bg-blue-300",
    };
    return colors[status];
  },

  formatLastActive: (lastActive: string): string => {
    return lastActive;
  },
};

// Usage example with proper typing
/*
import { threadExamples } from './threadHeaderExamples';
import { ThreadHeader } from './ThreadHeader';

function YourComponent() {
  return (
    <div className="space-y-4">
      <ThreadHeader {...threadExamples.readingChallenge} />
      <ThreadHeader {...threadExamples.workProject} />
      <ThreadHeader {...threadExamples.wellnessTracker} />
      <ThreadHeader {...threadExamples.gardenPlanning} />
      <ThreadHeader {...threadExamples.learningProject} />
    </div>
  );
}
*/
