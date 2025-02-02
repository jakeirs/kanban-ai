import { mutation } from "../../../_generated/server";
import { v } from "convex/values";
import { eventValidator } from "../types";

const addEventsArgs = v.object({
  currectEventsDocId: v.id("events"),
  newEvents: v.array(eventValidator),
});

const addEvents = mutation({
  args: addEventsArgs,
  handler: async (ctx, args) => {
    const eventsDoc = await ctx.db.get(args.currectEventsDocId);
    const events = eventsDoc?.events ?? [];

    console.log("args.newEvents", JSON.stringify(args.newEvents, null, 2));

    // add new events
    await ctx.db.patch(args.currectEventsDocId, {
      events: [...events, ...args.newEvents],
    });

    return { success: true };
  },
});

export default addEvents;
