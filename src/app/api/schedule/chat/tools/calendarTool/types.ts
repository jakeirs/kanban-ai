import { z } from "zod";

export const eventFromLLMGenUiZod = z.object({
  id: z.string().describe("Unique identifier for the event"),
  title: z.string().describe("Title of the event"),
  description: z
    .string()
    .describe(
      "Description of the event, truncated to 75 characters if too long"
    ),
  updatedAt: z
    .string()
    .describe(
      "date string (e.g., 'Feb 2, 2025 2:29:31 PM') that can be parsed to Unix timestamp"
    ),

  time: z
    .object({
      endTime: z
        .string()
        .describe(
          "date string (e.g., 'Feb 2, 2025 2:29:31 PM')"
        ),
      startTime: z
        .string()
        .describe(
          "date string (e.g., 'Feb 2, 2025 2:29:31 PM')"
        ),
    })
    .describe("object of of when event starts and ends"),
});

export type EventFromLLMGenUI = z.infer<typeof eventFromLLMGenUiZod>;

// Main calendar response schema
export const calendarToolSchemaZod = z.object({
  events: z
    .array(eventFromLLMGenUiZod)
    .min(1)
    .describe("List of events to add or modify in the calendar"),
});
