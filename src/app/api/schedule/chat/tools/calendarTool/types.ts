import { z } from "zod";

export const TimeSchema = z.object({
  startTime: z
    .string()
    .describe(
      "Event start date and time in ISO 8601 format (e.g., '2024-03-20T14:30:00Z'). Important to consider user's timezone."
    ),
  endTime: z
    .string()
    .describe(
      "Event end date and time in ISO 8601 format (e.g., '2024-03-20T15:30:00Z'). Must be later than startTime."
    ),
});

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
      "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') that can be parsed to Unix timestamp"
    ),

  time: z
    .object({
      endTime: z
        .string()
        .describe(
          "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') for easy Unix timestamp conversion and human readability"
        ),
      startTime: z
        .string()
        .describe(
          "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') for easy Unix timestamp conversion and human readability"
        ),
    })
    .describe("object of of when event starts and ends"),
});

export type EventFromLLMGenUI = z.infer<typeof eventFromLLMGenUiZod>;

// Main calendar response schema
export const calendarToolSchemaZod = z.object({
  action: z
    .literal("CALENDAR_EVENTS")
    .describe("Constant value defining the type of calendar action"),
  events: z
    .array(eventFromLLMGenUiZod)
    .min(1)
    .describe("List of events to add or modify in the calendar"),
  shortMessage: z
    .string()
    .max(200)
    .describe(
      "Short message explaining to the user what has been prepared (e.g., 'I have prepared 2 meetings for next week')"
    ),
  requiresConfirmation: z
    .boolean()
    .describe(
      "Flag indicating whether the user should confirm the proposed changes"
    ),
});
