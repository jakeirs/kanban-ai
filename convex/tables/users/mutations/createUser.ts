import { mutation } from "../../../_generated/server";
import { userTable } from "../table";
import { pick } from "convex-helpers";

export const createUser = mutation({
  args: pick(userTable.withoutSystemFields, ["firstName", "email"]),
  handler: async (ctx, { firstName, email }) => {
    const newUserId = await ctx.db.insert("users", { email, firstName });

    return newUserId;
  },
});
