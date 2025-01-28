import { z } from "zod";

// Define recurrence type
export const recurrenceTypeEnumZod = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "custom",
]);

// EVENTS FROM LLM
export const eventSchemaZod = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  updatedAt: z
    .string()
    .describe(
      "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') that can be parsed to Unix timestamp"
    ),

  time: z.object({
    startTime: z
      .string()
      .describe(
        "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') for easy Unix timestamp conversion and human readability"
      ),
    endTime: z
      .string()
      .describe(
        "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') for easy Unix timestamp conversion and human readability"
      ),
  }),

  location: z.string().optional(), // Physical or virtual location

  project: z.string().optional(), // assignment to the project
  notes: z.array(z.string()).optional(), // assignment to the project
});

// Types
export type EventFromLLMZod = z.infer<typeof eventSchemaZod>;
