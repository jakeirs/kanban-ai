import { Project } from "./project-basic";

// Enhanced Solution - Advanced Project Structure
interface EnhancedProject extends Project {
  // Enhanced Wave 1: Deeper Personal Context
  personalContext: {
    // Extends basic personal context
    learningStyle: {
      preferredMethods: Array<"visual" | "auditory" | "kinesthetic">;
      adaptability: number; // 0-1
      pacePreference: "methodical" | "rapid" | "balanced";
    };
    workStyle: {
      focusPatterns: Array<{
        timeOfDay: "morning" | "afternoon" | "evening";
        energyLevel: number;
        preferredTaskTypes: string[];
      }>;
      collaborationPreference: "solo" | "collaborative" | "mixed";
      adaptabilityToChange: number; // 0-1
    };

    vision: {
      // Extends basic vision
      successCriteria: Array<{
        description: string;
        measurableOutcome: string;
        importance: number;
        verificationMethod: string;
      }>;
      riskTolerance: {
        technical: number;
        schedule: number;
        resource: number;
      };
    };
  };

  // Enhanced Wave 2: Smart Constraints
  constraints: {
    // Extends basic constraints
    adaptiveScheduling: {
      flexibilityRanges: Array<{
        dayOfWeek: number;
        preferredHours: number;
        minimumRequired: number;
      }>;
      bufferPreference: number; // 0-1
      recoveryStrategy: "immediate" | "distributed" | "weekend";
    };
    qualityThresholds: Array<{
      aspect: string;
      minimumAcceptable: number;
      targetLevel: number;
    }>;
  };

  // Enhanced Wave 3: Intelligent Project Structure
  structure: {
    // Extends basic structure
    streams: Array<{
      // Extends basic streams
      healthMetrics: Array<{
        name: string;
        currentValue: number;
        threshold: number;
        trend: "improving" | "stable" | "declining";
      }>;
      adaptiveCapacity: number; // 0-1
      riskFactors: Array<{
        description: string;
        probability: number;
        impact: number;
        mitigationStrategy: string;
      }>;
    }>;

    knowledgeGraph: {
      nodes: Array<{
        id: string;
        type: "concept" | "skill" | "resource" | "goal";
        content: string;
        connections: Array<{
          targetId: string;
          relationship: string;
          strength: number;
        }>;
      }>;
    };
  };

  // Wave 4: Project Intelligence
  intelligence: {
    patterns: Array<{
      type: "behavior" | "progress" | "risk";
      description: string;
      confidence: number;
      recommendations: string[];
    }>;
    insights: Array<{
      category: "optimization" | "risk" | "opportunity";
      description: string;
      actionability: number;
      impact: number;
    }>;
    adaptiveGuidance: {
      currentFocus: string;
      suggestedAdjustments: Array<{
        target: string;
        reason: string;
        priority: number;
      }>;
    };
  };
}
