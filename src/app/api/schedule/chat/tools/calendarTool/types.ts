import { z } from "zod";
import {
  eventsByActionZod,
  eventFromLLMGenUiZod,
  EventFromLLMGenUI,
} from "../shared/eventTypes";

export { eventFromLLMGenUiZod };
export type { EventFromLLMGenUI };

// Main calendar response schema
export const calendarToolSchemaZod = z.object({
  events: eventsByActionZod.shape.events,
});
