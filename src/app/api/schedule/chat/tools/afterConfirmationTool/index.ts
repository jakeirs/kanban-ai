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
import { convertToUnixTime } from "./utils/convertToUnixTime";

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

    input.events.map(async ({ action, events }) => {
      if (action === "created") {
        const newEventsToConvex = prepareToConvex(events);
        // add Events
        const patchEvents = await convex.mutation(
          api.tables.events.mutations.addEvents.default,
          {
            newEvents: newEventsToConvex,
            currectEventsDocId,
          }
        );
      }
      if (action === "updated") {
        const patchEvents = await convex.mutation(
          api.tables.events.mutations.updateSelectedEvents.default,
          {
            events: convertToUnixTime(events),
            currectEventsDocId,
          }
        );
      }
      if (action === "deleted") {
        const patchEvents = await convex.mutation(
          api.tables.events.mutations.deleteManyEvents.default,
          {
            eventIds: events.map((e) => e.id),
            currectEventsDocId,
          }
        );
      }
    });

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
