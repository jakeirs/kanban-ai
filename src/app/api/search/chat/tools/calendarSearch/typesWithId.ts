import { z } from "zod";
import {
  eventFromLLMGenUiZod,
  eventToUpdateFieldsZod,
} from "../_shared/types/event";

const eventIdZod = z.object({
  eventId: z
    .string()
    .describe(
      "ID of the matched event from the calendar - this will be used to download/modify the event later"
    ),
});

const reasoningZod = z.object({
  reasoning: z
    .string()
    .describe(
      "Detailed explanation of why this event matches the user's query, including factors like time relevance, title/description matches, contextual relevance, and other matching factors"
    ),
});

// Output schema for a single matched event
export const actionsToDo = z.object({
  delete: z.array(
    z.object({
      eventId: eventIdZod.shape.eventId,
      reasoning: reasoningZod.shape.reasoning,
    })
  ).describe("Array of events that should be deleted based on user's request"),
  new: z.array(
    z.object({
      event: eventFromLLMGenUiZod,
      reasoning: reasoningZod.shape.reasoning,
    })
  ).describe("Array of new events that should be created based on user's request"),
  update: z.array(
    z.object({
      eventId: eventIdZod.shape.eventId,
      whatToUpdate: eventToUpdateFieldsZod,
      reasoning: reasoningZod.shape.reasoning,
    })
  ).describe("Array of events that should be updated with specified changes based on user's request"),
}).describe("Actions categorized based on of what user requested.")

// Output schema for the search results
export const calendarSearchToolArgsZod = z.object({
  matches: z
    .array(actionsToDo)
    .describe(
      "Array of matching events with their reasoning"
    ),
  requestSummary: z
    .string()
    .describe(
      "Brief summary explaining the search process and why these specific events were selected as matches"
    ),
});

// Type exports
export type CalendarSearchToolArgs = z.infer<typeof calendarSearchToolArgsZod>;
