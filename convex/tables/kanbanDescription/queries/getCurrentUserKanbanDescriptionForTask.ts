import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { Id } from "../../../_generated/dataModel";
import { v } from "convex/values";

const getCurrentUserKanbanDescriptionForTask = query({
  args: {
    taskId: v.string(),
  },
  handler: async (ctx, args) => {
    // current user
    const userId = (await getAuthUserId(ctx)) as Id<"users">;
    // current user KanbanBoardId
    const currentKanbanId = (
      await ctx.db
        .query("userSettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()
    )?.currentKanbanBoard as Id<"kanbanBoards">;
    // get Description by currentKanbanBoard & taskId
    const description = await ctx.db
      .query("kanbanDescription")
      .withIndex("by_board_and_task", (q) =>
        q.eq("kanbanBoardId", currentKanbanId).eq("taskId", args.taskId)
      )
      .first();

    return {
      taskId: args.taskId,
      currentKanbanId,
      description,
    };
  },
});

export default getCurrentUserKanbanDescriptionForTask;
