import { z } from "zod";
import { eventFromLLMGenUiZod } from "../calendarTool/types";

// Simple and focused schema for confirmation
export const afterConfirmationToolZod = z.object({
  events: z
    .array(eventFromLLMGenUiZod)
    .min(1)
    .describe("List of events to add or modify in the calendar"),
});
