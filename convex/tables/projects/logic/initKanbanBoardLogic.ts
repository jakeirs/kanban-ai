// user enters page

import { v } from "convex/values";
import { internalMutation,  } from "../../../_generated/server";
import {  } from "../defaultValues";

const initProjectLogic = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get user by ID - args.userId is already a proper users ID
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

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

    await ctx.db.insert("userSettings", {
      userId: args.userId,
      currentKanbanBoard: kanbanBoardId,
    });

    return kanbanBoardId;
  },
});

export default initKanbanBoardLogic;
