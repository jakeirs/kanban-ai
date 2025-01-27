import { mutation } from "../../../_generated/server";
import { v } from "convex/values";
import { ProjectValidator } from "../table";

const patchProjectsArgs = v.object({
  currectProjectsDocId: v.id("projects"),
  projects: v.array(ProjectValidator),
});

const patchColumns = mutation({
  args: patchProjectsArgs,
  handler: async (ctx, args) => {
    // Update the board
    await ctx.db.patch(args.currectProjectsDocId, {
      projects: args.projects,
    });

    return { success: true };
  },
});

export default patchColumns;
