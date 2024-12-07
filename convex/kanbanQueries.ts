import { query } from "./_generated/server";
import { QueryCtx } from "./_generated/server";

const getColumns = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    return await ctx.db
      .query("kanbanColumns")
      .collect();
  },
});

const getItems = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    return await ctx.db
      .query("kanbanItems")
      .collect();
  },
});

const getItemsByColumn = query({
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

export {
  getColumns,
  getItems,
  getItemsByColumn,
};
