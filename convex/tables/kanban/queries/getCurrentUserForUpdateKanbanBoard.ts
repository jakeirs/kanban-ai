import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";
import { Id } from "../../../_generated/dataModel";

const getCurrentUserForUpdateKanbanBoard = query({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx)) as Id<"users">;
    const currentKanbanId = (
      await ctx.db
        .query("userSettings")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first()
    )?.currentKanbanBoard as Id<"kanbanBoards">;

    const currentKanbanBoard = await ctx.db.get(currentKanbanId);

    const currentKanbanColumnsStringified = JSON.stringify({
      ...currentKanbanBoard?.columns,
    });

    return {
      userId,
      currentKanbanId,
      currentKanbanColumnsStringified,
    };
  },
});

export default getCurrentUserForUpdateKanbanBoard;
