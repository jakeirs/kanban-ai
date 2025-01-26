import { Infer, v } from "convex/values";
import { ProjectValidator } from "./table";

// NOTES
export const noteValidator = v.object({
  id: v.string(),
  icon: v.string(),
  color: v.string(),
  title: v.string(),
  shortDescription: v.optional(v.string()),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),
  lastVisited: v.optional(v.number()),
});

// Define event status
export const statusEnum = v.union(
  v.literal("scheduled"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("needs_attention"),
  v.literal("forgotten")
);

// EVENTS
export const eventValidator = v.object({
  id: v.string(),
  title: v.string(),
  subtitle: v.optional(v.string()),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),

  time: v.object({
    startTime: v.number(), // Unix timestamp
    endTime: v.number(), // Unix timestamp
    recurrence: v.optional(v.number()), // number of days eg. every 1 day, recurrence: 1
    exceptions: v.optional(v.array(v.number())), //  Array of Unix timestamps (dates)
  }),

  priority: v.optional(v.boolean()),
  status: statusEnum,

  location: v.optional(v.string()), // at the doctor

  category: v.optional(v.array(v.string())), // some custom category of the event

  linkedNotes: v.optional(v.array(v.string())), // Array of note IDs

  reminders: v.optional(v.array(v.string())), // Array of note IDs

  // version: v.number(),
  // previousVersions: v.optional(v.array(v.string())), // Array of version IDs
  // // Task-Specific Fields
  // completion: v.optional(
  //   v.object({
  //     percentage: v.number(),
  //     checklist: v.optional(
  //       v.array(
  //         v.object({
  //           id: v.string(),
  //           text: v.string(),
  //           isDone: v.boolean(),
  //         })
  //       )
  //     ),
  //   })
  // ),
  // AI-Related Fields
  // aiMetadata: v.optional(
  //   v.object({
  //     interactionType: aiInteractionEnum, // suggested, analyzed, optimized
  //     confidence: v.number(), // 0-1 scale
  //     suggestions: v.optional(v.array(v.string())),
  //     optimizationHistory: v.optional(
  //       v.array(
  //         v.object({
  //           timestamp: v.number(),
  //           action: v.string(),
  //           reason: v.string(),
  //         })
  //       )
  //     ),
  //     contextualTags: v.optional(v.array(v.string())),
  //   })
  // ),
});

// Status projektu
export const projectStatusEnum = v.union(
  v.literal("planning"), // Projekt w fazie planowania
  v.literal("ongoing"), // Projekt w trakcie realizacji
  v.literal("paused"), // Projekt wstrzymany
  v.literal("completed"), // Projekt zakończony
  v.literal("archived") // Projekt zarchiwizowany
);

// PROJECT DETAILS
export const projectDetailsValidator = v.object({
  // Podstawowe informacje
  id: v.string(),
  title: v.string(),
  description: v.optional(v.string()),
  isDefault: v.optional(v.boolean()),
  status: projectStatusEnum,
  indetifiers: v.object({
    icon: v.string(),
    colorBg: v.string(),
    colorIcon: v.string(),
  }),

  // Ograniczenia czasowe (opcjonalne)
  timeConstraints: v.optional(
    v.object({
      startDate: v.number(), // Unix timestamp
      endDate: v.number(), // Unix timestamp
    })
  ),
  // Metadane systemowe
  createdAt: v.number(),
  updatedAt: v.number(),

  // // Postęp i metryki
  // progress: v.optional(
  //   v.object({
  //     percentage: v.number(), // 0-100
  //     lastMilestone: v.optional(v.string()),
  //     nextMilestone: v.optional(v.string()),
  //     estimatedCompletion: v.optional(v.number()), // Unix timestamp
  //   })
  // ),

  // // Metadane AI
  // aiMetadata: v.optional(
  //   v.object({
  //     suggestions: v.optional(v.array(v.string())), // Sugestie AI
  //     analysis: v.optional(
  //       v.object({
  //         risk: v.string(),
  //         complexityScore: v.number(),
  //         estimatedEffort: v.string(),
  //         potentialBlockers: v.array(v.string()),
  //       })
  //     ),
  //     patterns: v.optional(v.array(v.string())), // Wykryte wzorce
  //     optimizationTips: v.optional(v.array(v.string())), // Sugestie optymalizacji
  //     contextualTags: v.optional(v.array(v.string())), // Tagi kontekstowe
  //   })
  // ),

  // // Cele i metryki
  // objectives: v.optional(
  //   v.array(
  //     v.object({
  //       id: v.string(),
  //       description: v.string(),
  //       completed: v.boolean(),
  //       metrics: v.optional(v.array(v.string())),
  //     })
  //   )
  // ),

  // version: v.number(),
});

// Use the projectValidator from table.ts
export type Project = Infer<typeof ProjectValidator>;
export type ProjectDetail = Infer<typeof projectDetailsValidator>;
export type Event = Infer<typeof eventValidator>;
export type Note = Infer<typeof noteValidator>;
