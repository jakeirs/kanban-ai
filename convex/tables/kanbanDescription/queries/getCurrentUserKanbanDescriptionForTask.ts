import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { Id } from "../../../_generated/dataModel";
import { ConvexError, v } from "convex/values";

const getCurrentUserKanbanDescriptionForTask = query({
  args: {
    taskId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError("User Not Authenticated");
    }
    // current user KanbanBoardId
    const currentKanbanId = (
      await ctx.db
        .query("userSettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()
    )?.currentKanbanBoard as Id<"kanbanBoards">;

    console.log("currentKanbanId", JSON.stringify(currentKanbanId, null, 2));

    // get Description by currentKanbanBoard & taskId
    const description = await ctx.db
      .query("kanbanDescription")
      .withIndex("by_board_and_task", (q) =>
        q.eq("kanbanBoardId", currentKanbanId).eq("taskId", args.taskId)
      )
      .first();

    console.log("description", JSON.stringify(description, null, 2));

    return description;
  },
});

export default getCurrentUserKanbanDescriptionForTask;
