import { tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const moveKanbanItem = tool({
  description: "Move an item from one column to another in the Kanban board",
  parameters: z.object({
    itemId: z.string().describe("The ID of the item to move"),
    destinationColumnId: z
      .string()
      .describe("The ID of the column to move the item to"),
    sourceColumnId: z
      .string()
      .describe(
        "The ID of the column to move the item from. Id of the initial column of the item"
      ),
    kanbanBoardId: z.string().describe("Kanban Board Id to update"),
    destinationOrder: z
      .number()
      .optional()
      .describe("Order of the item in the destination column. In other words: Position of the item in the"),
  }),
  execute: async ({
    destinationColumnId,
    sourceColumnId,
    kanbanBoardId,
    itemId,
    destinationOrder,
  }) => {
    convex.mutation(
      api.tables.kanban.mutations.moveItemToColumn.moveItemToColumn,
      {
        destinationColumnId,
        sourceColumnId,
        kanbanBoardId: kanbanBoardId as Id<"kanbanBoards">,
        itemId,
        destinationOrder,
      }
    );

    return {
      success: true,
      message: `Item ${itemId} moved to column ${destinationColumnId}`,
    };
  },
});
