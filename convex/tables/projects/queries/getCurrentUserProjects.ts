import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";

const getCurrentUserProjects = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not logged in");
    }
    const currectProjectsDoc = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    const currectProjects = currectProjectsDoc?.projects;

    if (!currectProjects) {
      throw new Error("User doesn't has any projects");
    }

    const currentProjectsStringified = JSON.stringify({
      ...currectProjects,
    });

    const currectProjectsDocId = currectProjectsDoc._id;

    return {
      userId,
      currentProjectsStringified,
      currectProjectsDocId,
    };
  },
});

export default getCurrentUserProjects;
