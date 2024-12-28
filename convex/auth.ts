import { KanbanBoard } from "./tables/kanban/types";
import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [GitHub],
  callbacks: {
    /**
     * Prepare App For New User
     */
    async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId }) {
      const KanbanBoardId = await ctx.runMutation(
        internal.tables.kanban.logic.initKanbanBoardLogic.default,
        {
          userId,
        }
      );
    },
  },
});
