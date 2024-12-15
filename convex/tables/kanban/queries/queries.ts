import { query } from "../../../_generated/server";
import { v } from "convex/values";

const getBoardById = query({
  args: { boardId: v.id("kanbanBoards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.boardId);
  },
});

// This is for backward compatibility with _getKanbanState.ts
const getItemsByColumn = query({
  args: {},
  handler: async (ctx) => {
    // Get the first board
    const board = await ctx.db.query("kanbanBoards").first();

    if (!board) {
      return {
        columns: [],
        itemsByColumn: {},
      };
    }

    // Transform the data to match the expected format
    const columns = board.columns;
    const itemsByColumn = columns.reduce(
      (acc, column) => {
        acc[column.id] = column.items;
        return acc;
      },
      {} as Record<string, any>
    );

    return {
      columns,
      itemsByColumn,
    };
  },
});

export { getBoardById, getItemsByColumn };
