import { mutation } from "../../../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { deleteEventsUtil } from "./utils/deleteEventsUtil";

const deleteManyEventsArgs = v.object({
  eventIds: v.array(v.string()),
  currectEventsDocId: v.id("events"),
});

const deleteManyEvent = mutation({
  args: deleteManyEventsArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const eventsDoc = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    // Events don't exist
    if (!eventsDoc) {
      throw new Error("Events not found");
    }

    // Update events
    await ctx.db.patch(eventsDoc._id, {
      events: deleteEventsUtil(eventsDoc.events, args.eventIds),
    });

    return { success: true };
  },
});

export default deleteManyEvent;
