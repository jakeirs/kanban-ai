import { KanbanBoard } from "./../../kanban/types";
import { mutation } from "../../../_generated/server";
import { v } from "convex/values";

const patchKanbanDescriptionByTaskIdArgs = v.object({
  kanbanBoardId: v.id("kanbanBoards"),
  taskId: v.string(),
  content: v.string(),
});

const patchKanbanDescriptionByTaskId = mutation({
  args: patchKanbanDescriptionByTaskIdArgs,
  handler: async (ctx, args) => {
    const description = await ctx.db
      .query("kanbanDescription")
      .withIndex("by_board_and_task", (q) =>
        q.eq("kanbanBoardId", args.kanbanBoardId).eq("taskId", args.taskId)
      )
      .first();

    if (!description) {
      return { success: false };
    }

    await ctx.db.patch(description?._id, { content: args.content });

    return { success: true };
  },
});

export default patchKanbanDescriptionByTaskId;
