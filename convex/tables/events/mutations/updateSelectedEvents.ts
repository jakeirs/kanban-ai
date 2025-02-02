import { mutation } from "../../../_generated/server";
import { v } from "convex/values";
import { eventValidator } from "../types";

const updateSelectedEventsArgs = v.object({
  currectEventsDocId: v.id("events"),
  events: v.array(eventValidator),
});

const updateSelectedEvents = mutation({
  args: updateSelectedEventsArgs,
  handler: async (ctx, args) => {
    // Get current events
    const eventsDoc = await ctx.db.get(args.currectEventsDocId);
    if (!eventsDoc) {
      throw new Error("Events document not found");
    }

    // Create a map of existing events by their IDs for efficient lookup
    const existingEventsMap = new Map(
      eventsDoc.events.map((event) => [event.id, event])
    );

    // Update only the events that are in args.events
    args.events.forEach((updatedEvent) => {
      if (existingEventsMap.has(updatedEvent.id)) {
        existingEventsMap.set(updatedEvent.id, updatedEvent);
      }
    });

    // Convert map back to array
    const updatedEvents = Array.from(existingEventsMap.values());

    // Update events
    await ctx.db.patch(args.currectEventsDocId, {
      events: updatedEvents,
    });

    return { success: true };
  },
});

export default updateSelectedEvents;
