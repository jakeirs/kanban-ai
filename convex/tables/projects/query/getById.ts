import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { forDashboardDto } from "./_dto/forDashboardDto";
import { v } from "convex/values";

const getById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not logged in");
    }
    const projectsDoc = await ctx.db
      .query("projects")
      .filter((q) => q.and(q.eq(q.field("userId"), userId)))
      .first();

    const selectedProject = projectsDoc?.projects.filter(
      (project) => project.projectDetail.id === args.id
    );

    const data = forDashboardDto(selectedProject);

    return data;
  },
});

export default getById;
