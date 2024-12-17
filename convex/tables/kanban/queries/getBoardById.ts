import { query } from "../../../_generated/server";
import { v } from "convex/values";

export const getBoardById = query({
  args: { boardId: v.id("kanbanBoards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.boardId);
  },
});
