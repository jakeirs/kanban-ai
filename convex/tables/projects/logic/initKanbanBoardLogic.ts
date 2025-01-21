// user enters page

import { v } from "convex/values";
import { internalMutation } from "../../../_generated/server";
import { defaultProjects } from "../defaultValues";

const initProjectsLogic = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get user by ID - args.userId is already a proper users ID
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const projectsId = await ctx.db.insert("projects", {
      userId: args.userId,
      projects: defaultProjects,
    });

    return projectsId;
  },
});

export default initProjectsLogic;
