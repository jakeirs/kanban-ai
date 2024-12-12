import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

const initializeColumns = mutation({
  args: {},
  handler: async (ctx) => {
    const columns = [
      { title: "To Do", identifier: "todo", order: 0 },
      { title: "In Progress", identifier: "inProgress", order: 1 },
      { title: "Done", identifier: "done", order: 2 },
    ];

    for (const column of columns) {
      await ctx.db.insert("kanbanColumns", column);
    }
  },
});

const createItem = mutation({
  args: {
    content: v.string(),
    columnName: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    labels: v.optional(v.array(v.string())),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // ORDER
    // const items = await ctx.db
    //   .query("kanbanItems")
    //   .filter((q) => q.eq(q.field("columnId"), args.columnId))
    //   .collect();

    // const order = items.length;

    // GET ID of COLUMN OR FROM THE REDUX
    const columns = await ctx.db.query("kanbanColumns").collect();
    const columnId = columns.find((column) =>
      // APPLY SEARCH - Similar words search
      // column.title === args.columnName
      column.title.includes(args.columnName)
    )?._id as Id<"kanbanColumns">;

    return await ctx.db.insert("kanbanItems", {
      content: args.content,
      columnId,
      order: 0,
      // order,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

const updateItem = mutation({
  args: {
    id: v.id("kanbanItems"),
    content: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    labels: v.optional(v.array(v.string())),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

const moveItem = mutation({
  args: {
    itemId: v.id("kanbanItems"),
    targetColumnId: v.id("kanbanColumns"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const { itemId, targetColumnId, newOrder } = args;

    // Get the item being moved
    const item = await ctx.db.get(itemId);
    if (!item) throw new Error("Item not found");

    // Get all items in the target column
    const itemsInTargetColumn = await ctx.db
      .query("kanbanItems")
      .filter((q) => q.eq(q.field("columnId"), targetColumnId))
      .collect();

    // Reorder items in the target column
    for (const existingItem of itemsInTargetColumn) {
      if (existingItem._id !== itemId && existingItem.order >= newOrder) {
        await ctx.db.patch(existingItem._id, {
          order: existingItem.order + 1,
        });
      }
    }

    // Update the moved item
    return await ctx.db.patch(itemId, {
      columnId: targetColumnId,
      order: newOrder,
      updatedAt: Date.now(),
    });
  },
});

const deleteItem = mutation({
  args: {
    id: v.id("kanbanItems"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export { initializeColumns, createItem, updateItem, moveItem, deleteItem };
