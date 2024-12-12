import { tool } from "ai";
import { z } from "zod";

export const getKanbanState = tool({
  description: "Get the current state of the Kanban board including columns and items",
  parameters: z.object({
    boardId: z.string().optional().describe("Optional board ID to get specific board state"),
  }),
});
