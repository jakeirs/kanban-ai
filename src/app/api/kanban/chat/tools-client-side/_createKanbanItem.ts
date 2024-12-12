import { Column } from './../../../../(pages)/kanban/config';
import { tool } from "ai";
import { z } from "zod";

/**
 * see what is optional and what is not
 */

export const createKanbanItem = tool({
  description: "Create a new item in the Kanban board",
  parameters: z.object({
    columnName: z.string().describe("The Name of the column to add the item to"),
    content: z.string().describe("The content of the item"),
    description: z
      .string()
      .optional()
      .describe("Optional description for the item"),
    priority: z
      .enum(["low", "medium", "high"])
      .optional()
      .describe("Priority level of the item"),
  }),
  execute: async ({ columnName, content, description, priority }) => {
    // Placeholder for actual implementation
    return {
      success: true,
      item: {
        id: Date.now().toString(),
        columnName,
        content,
        description,
        priority,
      },
    };
  },
});
