import { mutation } from "../../../_generated/server";
import { v, Infer } from "convex/values";
import { kanbanColumnsValidator } from "../types";

const patchColumnsArgs = v.object({
  kanbanBoardId: v.id("kanbanBoards"),
  columns: kanbanColumnsValidator,
});

const patchColumns = mutation({
  args: patchColumnsArgs,
  handler: async (ctx, args) => {
    // Update the board
    await ctx.db.patch(args.kanbanBoardId, {
      columns: args.columns,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

export default patchColumns;
