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
      "ISO 8601 formatted date string (e.g., '2024-03-20T14:30:00Z') that can be parsed to Unix timestamp"
    ),

  time: z
    .object({
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
    })
    .describe("object of of when event starts and ends"),
});

export type EventFromLLMGenUI = z.infer<typeof eventFromLLMGenUiZod>;
