// user enters page

import { mutation } from "../../../_generated/server";
import { defaultProjects } from "../defaultValues";
import { getAuthUserId } from "@convex-dev/auth/server";

const initProjects = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not logged in");
    }


    const projects = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (projects) {
      return;
    }

    // Create new projects for the first time
    const projectsId = await ctx.db.insert("projects", {
      userId: userId,
      projects: defaultProjects,
    });

    return projectsId;
  },
});

export default initProjects;
