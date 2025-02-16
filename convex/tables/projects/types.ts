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

  reminders: v.optional(v.array(v.string())), // Array of linked reminder IDs (bell icons)
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
});

// Use the projectValidator from table.ts
export type Project = Infer<typeof ProjectValidator>;
export type ProjectDetail = Infer<typeof projectDetailsValidator>;
export type Event = Infer<typeof eventValidator>;
export type Note = Infer<typeof noteValidator>;

