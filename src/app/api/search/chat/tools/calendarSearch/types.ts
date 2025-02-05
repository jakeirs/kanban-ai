import { z } from "zod";

// Output schema for a single matched event
export const calendarMatchZod = z.object({
  eventId: z
    .string()
    .describe(
      "ID of the matched event from the calendar - this will be used to download/modify the event later"
    ),
  matchConfidence: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "Confidence score between 0 and 1 indicating how well this event matches the query"
    ),
  reasoning: z
    .string()
    .describe(
      "Detailed explanation of why this event matches the user's query, including factors like time relevance, title/description matches, contextual relevance, and other matching factors"
    ),
});

// Output schema for the search results
export const calendarSearchToolArgsZod = z.object({
  matches: z
    .array(calendarMatchZod)
    .describe(
      "Array of matching events with their confidence scores and reasoning, sorted by confidence in descending order"
    ),
  searchSummary: z
    .string()
    .describe(
      "Brief summary explaining the search process and why these specific events were selected as matches"
    ),
});

// Type exports
export type CalendarSearchToolArgs = z.infer<typeof calendarSearchToolArgsZod>;
