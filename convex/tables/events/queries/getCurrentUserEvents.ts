import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";

const getCurrentUserEvents = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not logged in");
    }
    const currectEventsDoc = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    const currectEvents = currectEventsDoc?.events;

    if (!currectEvents) {
      throw new Error("User doesn't has any currectEvents");
    }

    const currentEventsStringified = JSON.stringify({
      ...currectEvents,
    });

    const currectEventsDocId = currectEventsDoc._id;

    return {
      userId,
      currentEventsStringified,
      currectEventsDocId,
    };
  },
});

export default getCurrentUserEvents;
