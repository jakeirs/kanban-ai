import { tool } from "ai";
import { z } from "zod";

export const getCurrentView = tool({
  description: "Get the current view of the Kanban board that the user is looking at",
  parameters: z.object({}),
});
