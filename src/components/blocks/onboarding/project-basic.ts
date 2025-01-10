// Basic Solution - Core Project Structure
export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Wave 1: Personal Context and Vision
  personalContext: {
    currentSituation: {
      skills: Array<{
        name: string;
        level: "beginner" | "intermediate" | "advanced";
        relevance: number; // 0-1
      }>;
      resources: Array<{
        type: "tool" | "knowledge" | "asset";
        name: string;
        description: string;
        availability: "available" | "needed" | "uncertain";
      }>;
      struggles: Array<{
        description: string;
        impact: number; // 0-1
        relatedTo: string[]; // References to other elements
      }>;
      motivations: Array<{
        description: string;
        strength: number; // 0-1
        type: "intrinsic" | "extrinsic";
      }>;
    };

    vision: {
      mainGoal: string;
      desiredOutcomes: Array<{
        description: string;
        priority: number;
        timeframe: "short-term" | "mid-term" | "long-term";
      }>;
      assumptions: string[];
    };
  };

  // Wave 2: Constraints and Boundaries
  constraints: {
    time: {
      projectDuration: number; // in days
      weeklyAvailability: number; // in hours
      preferredWorkingHours: {
        start: string;
        end: string;
      };
      deadlines: Array<{
        description: string;
        date: Date;
        flexibility: "fixed" | "flexible" | "preferred";
      }>;
    };
    resources: Array<{
      type: string;
      availability: number; // 0-1
      constraints: string[];
    }>;
  };

  // Wave 3: Project Structure
  structure: {
    streams: Array<{
      id: string;
      name: string;
      description: string;
      priority: number;
      dependencies: string[]; // References to other streams
      estimatedEffort: number;
      status: "planned" | "active" | "completed";
    }>;
    milestones: Array<{
      id: string;
      name: string;
      targetDate: Date;
      requiredStreams: string[];
      status: "pending" | "active" | "achieved";
    }>;
  };
}
