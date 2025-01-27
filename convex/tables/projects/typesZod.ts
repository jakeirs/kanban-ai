import { z } from "zod";

// NOTES
export const noteSchemaZod = z.object({
  id: z.string(),
  icon: z.string(),
  color: z.string(),
  title: z.string(),
  shortDescription: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  lastVisited: z.number().optional(),
});

// Define event status
export const statusEnumZod = z.enum([
  "scheduled",
  "in_progress",
  "completed",
  "needs_attention",
  "forgotten",
]);

// EVENTS
export const eventSchemaZod = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),

  time: z.object({
    startTime: z.number(), // Unix timestamp
    endTime: z.number(), // Unix timestamp
    recurrence: z.number().optional(), // number of days eg. every 1 day, recurrence: 1
    exceptions: z.array(z.number()).optional(), //  Array of Unix timestamps (dates)
  }),

  priority: z.boolean().optional(),
  status: statusEnumZod,

  location: z.string().optional(), // at the doctor

  category: z.array(z.string()).optional(), // some custom category of the event

  linkedNotes: z.array(z.string()).optional(), // Array of note IDs

  reminders: z.array(z.string()).optional(), // Array of linked reminder IDs (bell icons)
});

// Status projektu
export const projectStatusEnumZod = z.enum([
  "planning", // Projekt w fazie planowania
  "ongoing", // Projekt w trakcie realizacji
  "paused", // Projekt wstrzymany
  "completed", // Projekt zakończony
  "archived", // Projekt zarchiwizowany
]);

// PROJECT DETAILS
export const projectDetailsSchemaZod = z.object({
  // Podstawowe informacje
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isDefault: z.boolean().optional(),
  status: projectStatusEnumZod,
  indetifiers: z.object({
    icon: z.string(),
    colorBg: z.string(),
    colorIcon: z.string(),
  }),

  // Ograniczenia czasowe (opcjonalne)
  timeConstraints: z
    .object({
      startDate: z.number(), // Unix timestamp
      endDate: z.number(), // Unix timestamp
    })
    .optional(),

  // Metadane systemowe
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const projectSchemaZod = z.object({
  events: z.array(eventSchemaZod),
  notes: z.array(noteSchemaZod),
  projectDetail: projectDetailsSchemaZod,
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

// Types
export type Note = z.infer<typeof noteSchemaZod>;
export type Event = z.infer<typeof eventSchemaZod>;
export type ProjectDetail = z.infer<typeof projectDetailsSchemaZod>;
export type Project = z.infer<typeof projectSchemaZod>;
