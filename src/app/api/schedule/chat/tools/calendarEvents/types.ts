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

export const EventSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe(
      "Event title - a short and clear description of what the meeting is about. Maximum 100 characters."
    ),
  description: z
    .string()
    .max(500)
    .describe(
      "Optional detailed event description. Should contain important information for participants. Maximum 500 characters."
    ),
  time: TimeSchema.describe("Event start and end time"),
});

// Main calendar response schema
export const calendarToolSchemaZod = z.object({
  action: z
    .literal("CALENDAR_EVENTS")
    .describe("Constant value defining the type of calendar action"),
  events: z
    .array(EventSchema)
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
