import { query } from "../../../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const visitKanbanPageLogic = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not found");
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return projects;
  },
});

export default visitKanbanPageLogic;

enum MyEnum {
  ELO = "elo",
  MELO = "melo",
  ECKO = "ecko",
}
