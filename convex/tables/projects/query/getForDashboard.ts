import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { Id } from "../../../_generated/dataModel";

const getForDashboard = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not logged in");
    }
    const projectsDoc = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    const projects = projectsDoc?.projects;

    return {
      projects,
    };
  },
});

export default getForDashboard;
