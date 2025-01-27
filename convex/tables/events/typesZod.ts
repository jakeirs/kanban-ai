import { z } from "zod";

// Define recurrence type
export const recurrenceTypeEnumZod = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "custom",
]);

// EVENTS
export const eventSchemaZod = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  updatedAt: z.string(), // Unix timestamp

  time: z.object({
    startTime: z.string(), // Unix timestamp
    endTime: z.string(), // Unix timestamp
    recurrence: z
      .object({
        type: recurrenceTypeEnumZod,
        interval: z.number(), // e.g., every 2 weeks: interval: 2, type: "weekly"
        endDate: z.string().optional(), // Optional end date for recurring events
        exceptions: z.array(z.number()).optional(), // Array of Unix timestamps (excluded dates)
      })
      .optional(),
  }),

  location: z.string().optional(), // Physical or virtual location

  project: z.string().optional(), // assignment to the project
  notes: z.array(z.string()).optional(), // assignment to the project
});

// Types
export type EventZod = z.infer<typeof eventSchemaZod>;
