import { z } from "zod";

export const eventGenUiZod = z
  .object({
    id: z.string().describe("Unique identifier for the event"),
    title: z.string().describe("Title of the event"),
    description: z
      .string()
      .describe(
        "Description of the event, truncated to 75 characters if too long"
      ),
    timeStart: z
      .string()
      .describe(
        "Start time of the event in format 'h:mm aaa' (e.g., '2:30 pm')"
      ),
    endTime: z
      .string()
      .describe("End time of the event in format 'h:mm aaa' (e.g., '3:30 pm')"),
    date: z.string().describe("Date of the event (e.g., '12 March 2025')"),
  })
  .describe("Formatted event data structure used for display");

export type FormattedEvent = z.infer<typeof eventGenUiZod>;
