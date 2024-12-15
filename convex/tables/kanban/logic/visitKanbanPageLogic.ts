import { v } from "convex/values";
import { query } from "../../../_generated/server";

export const visitKanbanPageLogic = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const kanbanBoard = await ctx.db
      .query("kanbanBoards")
      .filter((q) => q.eq(q.field("ownerUserId"), userId))
      .first();

    return kanbanBoard;
  },
});
