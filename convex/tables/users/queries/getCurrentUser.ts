import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../../../_generated/server";

const getCurrentUserId = query({
  handler: async (ctx) => {
    return getAuthUserId(ctx);
  },
});

export default getCurrentUserId;
