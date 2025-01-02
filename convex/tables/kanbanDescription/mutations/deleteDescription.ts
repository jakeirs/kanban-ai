import { mutation } from "../../../_generated/server";
import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const deleteKanbanDescriptionArgs = v.object({
  taskId: v.string(),
  kanbanBoardId: v.id("kanbanBoards"),
});

const createKanbanDescription = mutation({
  args: deleteKanbanDescriptionArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError("User Not Authenticated");
    }

    // get Description by currentKanbanBoard & taskId
    const description = await ctx.db
      .query("kanbanDescription")
      .withIndex("by_board_and_task", (q) =>
        q.eq("kanbanBoardId", args.kanbanBoardId).eq("taskId", args.taskId)
      )
      .first();

    if (!description) {
      return {
        success: false,
        message: `It can't find the Description for the task with
         id: ${args.taskId} in kanbanBoardId: ${args.kanbanBoardId}`,
      };
    }
    // create description
    await ctx.db.delete(description?._id!);
    return { success: true };
  },
});

export default createKanbanDescription;
