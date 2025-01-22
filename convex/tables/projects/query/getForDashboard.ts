import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { forDashboardDto } from "./_dto/forDashboardDto";

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

    const data = forDashboardDto(projectsDoc?.projects);

    return data;
  },
});

export default getForDashboard;
