import { query } from "../../../_generated/server";
import { v } from "convex/values";

const getKanbanBoard = query({
  args: { kanbanBoardId: v.id("kanbanBoards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.kanbanBoardId);
  },
});

export default getKanbanBoard;
