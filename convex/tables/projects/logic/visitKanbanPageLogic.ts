import { query } from "../../../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const visitKanbanPageLogic = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    const kanbanBoard = await ctx.db
      .query("kanbanBoards")
      .filter((q) => q.eq(q.field("ownerUserId"), userId))
      .first();

    return kanbanBoard;
  },
});

export default visitKanbanPageLogic;

enum MyEnum {
  ELO = "elo",
  MELO = "melo",
  ECKO = "ecko",
}
