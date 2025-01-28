import { mutation } from "../../../_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"
import { deleteEventUtil } from "./utils/deleteEventUtil"

const deleteEventArgs = v.object({
  eventId: v.string(),
});

const deleteEvent = mutation({
  args: deleteEventArgs,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not logged in");
    }

    const eventsDoc = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    eventsDoc?._id;

    // Events don't exist
    if (!eventsDoc) {
      throw new Error("Events not found");
    }
    // Update events
    await ctx.db.patch(eventsDoc?._id, {
      events: deleteEventUtil(eventsDoc.events, args.eventId)
    });

    return { success: true };
  },
});

export default deleteEvent;
