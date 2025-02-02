import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import type { ToolResponse } from "../types";
import { afterConfirmationToolDescription } from "./description";
import { afterConfirmationToolZod } from "./types";
import { tool } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { prepareToConvex } from "./utils/prepareToConvex";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const afterConfirmationTool = tool({
  description: afterConfirmationToolDescription,
  parameters: afterConfirmationToolZod,
  execute: async (input) => {
    const tokenNextJs = await convexAuthNextjsToken();
    const isAuthenticated = await isAuthenticatedNextjs();

    if (!isAuthenticated) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    convex.setAuth(tokenNextJs!);

    const { userId, currectEventsDocId } = await convex.query(
      api.tables.events.queries.getCurrentUserEvents.default
    );

    if (!userId) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    const newEventsToConvex = prepareToConvex(input.events);

    // Update Events
    const patchEvents = await convex.mutation(
      api.tables.events.mutations.addEvents.default,
      {
        newEvents: newEventsToConvex,
        currectEventsDocId,
      }
    );

    const response: ToolResponse = {
      success: true,
      nextAction: {
        waitForUserResponse: false,
        actImmediatelly: true,
        nextToolToUse: "GeneralTool",
      },
    };

    return response;
  },
});
