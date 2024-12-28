import { kanbanBoardsTable } from "./tables/kanban/table";
import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
  callbacks: {
    /**
     * This functions calls after any login | or sign
     */
    async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId }) {
      const hasUserKanbanBoard = await ctx.db
        .query("kanbanBoards")
        .filter((q) => q.eq(q.field("ownerUserId"), userId))
        .first();

      if (hasUserKanbanBoard) {
        return;
      }

      // Init KanbanBoard For New User
      const kanbanBoardId = await ctx.runMutation(
        internal.tables.kanban.logic.initKanbanBoardLogic.default,
        {
          userId,
        }
      );
    },
  },
});
