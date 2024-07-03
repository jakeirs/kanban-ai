import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", { email: args.email });

    return newUserId;
  },
});
