// Core types that reflect how we naturally think about tasks
type ThoughtStatus = 'floating' | 'captured' | 'scheduled' | 'in-progress' | 'completed' | 'archived';
type TimeScope = 'today' | 'this-week' | 'this-month' | 'someday';
type Energy = 'quick' | 'light' | 'focused' | 'deep';

// Floating Thought
// Represents initial capture of ideas and potential tasks
// Helps prevent mental clutter while preserving potentially valuable ideas
interface FloatingThought {
  id: string;
  content: string;
  capturedAt: Date;
  
  // Quick categorization to help with later processing
  natureOfThought: {
    type: 'task' | 'idea' | 'reminder' | 'exploration';
    energy: Energy;          // Estimated energy required
    timeNeeded?: number;     // Rough estimate in minutes
  };

  // Context when the thought occurred
  context: {
    timeOfDay: string;       // When the thought occurred
    mood?: string;          // Optional mood tracking
    triggers?: string[];    // What prompted this thought
  };

  // Initial processing
  processing: {
    status: ThoughtStatus;
    initialPriority: 'urgent' | 'important' | 'nice' | 'explore';
    needsScheduling: boolean;
    shouldRemind: boolean;
    timeScope?: TimeScope;
  };
}

// Actionable Task
// Represents thoughts that have been processed and deemed worth acting on
interface ActionableTask {
  id: string;
  title: string;
  description?: string;
  
  // Core scheduling
  timing: {
    timeScope: TimeScope;
    scheduledDate?: Date;    // Specific date if scheduled
    preferredTime?: string;  // Time of day preference
    duration: number;        // Estimated minutes needed
    energy: Energy;         // Energy level required
  };

  // Task progression
  progression: {
    status: ThoughtStatus;
    startedAt?: Date;
    completedAt?: Date;
    attempts: number;        // Times tried to complete
    continuation?: {        // For tasks that lead to others
      nextTaskId?: string;
      progressionType: 'sequence' | 'exploration' | 'habit';
      notes: string;
    };
  };

  // Context and meaning
  context: {
    category: string;       // Main life area
    importance: string;     // Why this matters
    relatedTasks?: string[];
    supportingLinks?: string[];  // URLs, resources
  };

  // Reflection elements
  reflection?: {
    preCompletion?: string;  // Thoughts before doing it
    postCompletion?: string; // Thoughts after doing it
    learnings?: string[];    // What was learned
    futureIdeas?: string[];  // Ideas for next time
  };
}

// Growth Thread
// Represents connected tasks that build towards meaningful progress
interface GrowthThread {
  id: string;
  title: string;
  description: string;
  
  // Core progression tracking
  progression: {
    status: 'active' | 'paused' | 'completed';
    startDate: Date;
    lastActivity: Date;
    currentPhase: string;
    milestones: {
      title: string;
      status: 'upcoming' | 'in-progress' | 'achieved';
      achievedDate?: Date;
      reflection?: string;
    }[];
  };

  // Connected tasks
  connectedTasks: {
    taskId: string;
    relationship: 'milestone' | 'exploration' | 'maintenance';
    sequence?: number;      // Optional ordering
    completed: boolean;
  }[];

  // Growth aspects
  growth: {
    targetAreas: string[];  // Skills or areas being developed
    progressNotes: {
      date: Date;
      note: string;
      feeling: string;
    }[];
    achievements: {
      date: Date;
      description: string;
      impact: string;
    }[];
  };
}