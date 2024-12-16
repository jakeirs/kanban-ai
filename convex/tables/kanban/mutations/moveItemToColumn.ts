import { mutation } from "../../../_generated/server";
import { v, Infer } from "convex/values";

const moveItemToColumnValidator = v.object({
  kanbanBoardId: v.id("kanbanBoards"),
  sourceColumnId: v.string(),
  destinationColumnId: v.string(),
  order: v.number(),
  destinationOrder: v.number(),
});

export type MoveItemToColumnMutationArgs = Infer<
  typeof moveItemToColumnValidator
>;

export const moveItemToColumn = mutation({
  args: moveItemToColumnValidator,
  handler: async (ctx, args) => {
    // Get kanban board
    const kanbanBoard = await ctx.db.get(args.kanbanBoardId);

    if (!kanbanBoard) {
      throw new Error("No kanban board found for user");
    }

    const newColumns = [...kanbanBoard.columns];

    // Find source and destination columns
    const sourceColumn = newColumns.find(
      (col) => col.id === args.sourceColumnId
    );
    const destColumn = newColumns.find(
      (col) => col.id === args.destinationColumnId
    );

    if (!sourceColumn || !destColumn) {
      throw new Error("Source or destination column not found");
    }

    // Move the item
    // remove old position of the column
    const [movedItem] = sourceColumn.items.splice(args.order, 1);
    // add new position of the column
    destColumn.items.splice(args.destinationOrder, 0, movedItem);

    // Update the board
    await ctx.db.patch(kanbanBoard._id, {
      columns: newColumns,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
