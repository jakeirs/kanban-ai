import { mutation } from "../../../_generated/server";
import { v } from "convex/values";

const patchKanbanDescriptionArgs = v.object({
  kanbanDescriptionId: v.id("kanbanDescription"),
  content: v.string(),
});

const patchKanbanDescription = mutation({
  args: patchKanbanDescriptionArgs,
  handler: async (ctx, args) => {
    // Update the description
    await ctx.db.patch(args.kanbanDescriptionId, { content: args.content });

    return { success: true };
  },
});

export default patchKanbanDescription;
