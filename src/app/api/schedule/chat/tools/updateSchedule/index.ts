import { generateObject, tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { anthropic } from "@ai-sdk/anthropic";
import { idsOfTasksThatWillBeAffectedZod } from "./types";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { AI_MODEL_TO_USE } from "@/config/ai/model";
import { eventSchemaZod } from "@/convex/tables/events/typesZod";
import { format } from "date-fns";
import { convertToUnixTime } from "./utils/convertToUnixTime";
import { convertToISO } from "./utils/convertTimeToISO";
import {
  updateScheduleAgentPrompt,
  updateScheduleAgentSystem,
  updateSchedulePrompt,
} from "../../prompts/updateSchedule";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateSchedule = tool({
  description: updateSchedulePrompt,
  parameters: z.object({
    message: z.string().describe(`Pass the message to this tool as clear order,
         what exactly it has to be done in order to achieve given goal`),
    listOfActionToDo: z
      .array(
        z
          .string()
          .describe(
            `Short description of details of the events and what tool should to do`
          )
      )
      .describe(`Array of items, tasks, events to insert or change.`),
  }),
  execute: async ({ message, listOfActionToDo }) => {
    const tokenNextJs = await convexAuthNextjsToken();
    const isAuthenticated = await isAuthenticatedNextjs();

    if (!isAuthenticated) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    convex.setAuth(tokenNextJs!);

    const { userId, currectEventsDocId, currectEvents } = await convex.query(
      api.tables.events.queries.getCurrentUserEvents.default
    );

    if (!userId) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    const eventsWithTimeToISO = convertToISO(currectEvents);
    const currentEventsStringified = JSON.stringify(
      eventsWithTimeToISO,
      null,
      2
    );
    const CURRENT_TIME = format(new Date(), "PP pp");
    const listOfActionToDoStringified = JSON.stringify(
      listOfActionToDo,
      null,
      2
    );

    console.log("PRZED GENERATE OBJECT", format(new Date(), "pp"));

    try {
      // generate Object with AI
      const { object } = await generateObject({
        model: anthropic(AI_MODEL_TO_USE),

        system: updateScheduleAgentSystem,
        prompt: updateScheduleAgentPrompt({
          CURRENT_TIME,
          currentEventsStringified,
          listOfActionToDoStringified,
          message,
        }),
        schema: z.object({
          events: z.array(eventSchemaZod),
          idsOfTasksThatWillBeAffected: idsOfTasksThatWillBeAffectedZod,
        }),
      });

      console.log("PO GENERATE OBJECT", format(new Date(), "pp"));
      console.log("object PROJECTs gen by AI", JSON.stringify(object, null, 2));

      const eventsConvertedToUnixTime = convertToUnixTime(object.events);

      // Update Columns
      const patchEvents = await convex.mutation(
        api.tables.events.mutations.patchEvents.default,
        {
          events: eventsConvertedToUnixTime,
          currectEventsDocId,
        }
      );

      return {
        success: true,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `The events has been changed successfully`,
      };
    } catch (error) {
      console.error("Error in updatingScheduleTool", error);
      return {
        success: false,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `There was an error updating events items. Please try again now or later. Sorry mate!`,
      };
    }
  },
});
