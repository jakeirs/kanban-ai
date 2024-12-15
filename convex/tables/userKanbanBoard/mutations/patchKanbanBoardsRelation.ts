import { internalMutation } from "../../../_generated/server";
import { userKanbanBoardsTable } from "../table";
import { Doc } from "../../../_generated/dataModel";

const addKanbanBoardsRelation = internalMutation({
  args: userKanbanBoardsTable.withoutSystemFields,
  handler: async (ctx, args) => {
    const userKanbanBoardsDoc = (await ctx.db
      .query("userKanbanBoards")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first()) as Doc<"userKanbanBoards">; // as Doc, because we are certain that always there will be such a relation

    return await ctx.db.patch(userKanbanBoardsDoc._id, {
      accessToOtherKanbanBoards: [
        ...userKanbanBoardsDoc.accessToOtherKanbanBoards,
        ...args.accessToOtherKanbanBoards,
      ],
      ownerOfKanbaBoards: [
        ...userKanbanBoardsDoc.ownerOfKanbaBoards,
        ...args.ownerOfKanbaBoards,
      ],
    });
  },
});

// const removeKanbanBoardsRelation

export { addKanbanBoardsRelation };
