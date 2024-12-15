// user enters page

import { v } from "convex/values";
import { mutation } from "../../../_generated/server";
import { defaultKanbanColumns } from "../defaultValues";

const createDefaultKanbanBoardLogic = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const defaultColumns = defaultKanbanColumns;

    const kanbanBoardId = await ctx.db.insert("kanbanBoards", {
      name: "My first Kanban",
      ownerUserId: args.userId,
      isPrivate: true,
      columns: defaultColumns,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("userKanbanBoards", {
      userId: args.userId,
      ownerOfKanbaBoards: [kanbanBoardId],
      accessToOtherKanbanBoards: [],
    });

    return kanbanBoardId;
  },
});

export { createDefaultKanbanBoardLogic };
