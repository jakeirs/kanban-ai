import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { QueryCtx } from "./_generated/server";

// Mutations
export const initializeColumns = mutation({
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

export const createItem = mutation({
  args: {
    content: v.string(),
    columnId: v.id("kanbanColumns"),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    labels: v.optional(v.array(v.string())),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("kanbanItems")
      .filter((q) => q.eq(q.field("columnId"), args.columnId))
      .collect();

    const order = items.length;

    return await ctx.db.insert("kanbanItems", {
      ...args,
      order,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateItem = mutation({
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

export const moveItem = mutation({
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

export const deleteItem = mutation({
  args: {
    id: v.id("kanbanItems"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Queries
export const getColumns = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    return await ctx.db
      .query("kanbanColumns")
      .collect();
  },
});

export const getItems = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    return await ctx.db
      .query("kanbanItems")
      .collect();
  },
});

export const getItemsByColumn = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const columns = await ctx.db
      .query("kanbanColumns")
      .collect();

    const items = await ctx.db
      .query("kanbanItems")
      .collect();

    // Group items by column
    const itemsByColumn = columns.reduce<Record<string, any>>((acc, column) => {
      acc[column._id] = items.filter((item) => item.columnId === column._id);
      return acc;
    }, {});

    return {
      columns,
      itemsByColumn,
    };
  },
});
