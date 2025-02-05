import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { v } from "convex/values";
import { startOfDay, endOfDay } from "date-fns";

export const searchEventsByDateRange = query({
  args: {
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    project: v.optional(v.string()),
    location: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not logged in");
    }

    const eventsDoc = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!eventsDoc?.events) {
      throw new Error("User doesn't have any events");
    }

    // Filter events by all optional parameters
    const filteredEvents = eventsDoc.events.filter((event) => {
      const eventStartTime = event.time.startTime;
      
      // Date range filter (if provided)
      const startTimestamp = args.startDate ? startOfDay(new Date(args.startDate)).getTime() : null;
      const endTimestamp = args.endDate ? endOfDay(new Date(args.endDate)).getTime() : null;
      const dateRangeMatch = 
        (!startTimestamp || eventStartTime >= startTimestamp) &&
        (!endTimestamp || eventStartTime <= endTimestamp);

      // Optional filters
      const projectMatch = args.project ? event.project === args.project : true;
      const locationMatch = args.location ? event.location?.toLowerCase().includes(args.location.toLowerCase()) : true;
      const titleMatch = args.title ? event.title.toLowerCase().includes(args.title.toLowerCase()) : true;

      return dateRangeMatch && projectMatch && locationMatch && titleMatch;
    });

    return {
      events: filteredEvents,
      total: filteredEvents.length
    };
  },
});
