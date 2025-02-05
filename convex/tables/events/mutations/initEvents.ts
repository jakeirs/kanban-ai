// user enters page

import { mutation } from "../../../_generated/server";
import { defaultEvents } from "../defaultValues";
import { getAuthUserId } from "@convex-dev/auth/server";
import { bigCalendarEvents } from "../defaultValuesBigCalendar";

const initEvents = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not logged in");
    }

    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    // Events already exists
    if (events) {
      throw new Error("Events already exists");
    }

    // Create new events for the first time
    const eventsDocId = await ctx.db.insert("events", {
      userId: userId,
      events: bigCalendarEvents,
    });

    return eventsDocId;
  },
});

export default initEvents;
