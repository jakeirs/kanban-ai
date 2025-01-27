import { mutation } from "../../../_generated/server";
import { v } from "convex/values";
import { eventValidator } from "../types";

const patchProjectsArgs = v.object({
  currectEventsDocId: v.id("events"),
  events: v.array(eventValidator),
});

const patchEvents = mutation({
  args: patchProjectsArgs,
  handler: async (ctx, args) => {
    // Update events
    await ctx.db.patch(args.currectEventsDocId, {
      events: args.events,
    });

    return { success: true };
  },
});

export default patchEvents;
