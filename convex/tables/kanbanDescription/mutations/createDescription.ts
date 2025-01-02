import { Authenticated } from "convex/react";
import { kanbanBoardsTable } from "./../../kanban/table";
import { kanbanDescriptionTable } from "../table";
import { mutation } from "../../../_generated/server";
import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const createKanbanDescriptionArgs = v.object({
  taskId: v.string(),
  kanbanBoardId: v.id("kanbanBoards"),
});

const createKanbanDescription = mutation({
  args: createKanbanDescriptionArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError("User Not Authenticated");
    }
    // create description
    await ctx.db.insert("kanbanDescription", {
      content: "To jest przykłądowy content",
      createdAt: Date.now(),
      kanbanBoardId: args.kanbanBoardId,
      taskId: args.taskId,
      updatedAt: Date.now(),
      updatedBy: userId,
    });
    return { success: true };
  },
});

export default createKanbanDescription;
