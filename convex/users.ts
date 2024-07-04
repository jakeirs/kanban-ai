import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", { email: args.email });

    return newUserId;
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();

    return users;
  },
});
