import { getAuthSessionId, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { Id } from "../../../_generated/dataModel";

const getCurrentUserKanbanId = query({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx)) as Id<"users">;
    const currentKanbanId = (
      await ctx.db
        .query("userSettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()
    )?.currentKanbanBoard as Id<"kanbanBoards">;

    const session = await getAuthSessionId(ctx);

    return {
      userId,
      currentKanbanId,
    };
  },
});

export default getCurrentUserKanbanId;
