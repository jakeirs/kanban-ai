import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const createUser = internalMutation({
  args: { email: v.string(), stripeCheckoutId: v.string() },
  handler: async (ctx, { email, stripeCheckoutId }) => {
    const newUserId = await ctx.db.insert("users", { email, stripeCheckoutId });

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
