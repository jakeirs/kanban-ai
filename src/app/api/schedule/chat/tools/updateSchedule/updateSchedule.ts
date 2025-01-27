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

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateSchedule = tool({
  description: `Use this tools to update schedule of the user.
   You can schedule new item (event, task or reminder) to the user calendar (schedule), 
   you can also edit exisiting one or delete exisisting one
   With this tool you can batch many requests of the users.
   For example: if user request to add 5 new events to his calendar, you should use this tool.
  `,
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

    console.log("listOfActionToDo", JSON.stringify(listOfActionToDo, null, 2));
    console.log("message", message);

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

    console.log("PRZED GENERATE OBJECT", format(new Date(), "pp"));

    try {
      // generate Object with AI
      const { object } = await generateObject({
        model: anthropic(AI_MODEL_TO_USE),

        system: `You are friendly assistant of user's Calendar.

        You have current list of user's events (tasks, items) in JSON format.

        Your tasks is to update accordingly the current JSON object of events of the user and generate object that will match the schema
        and the task you were given.

        Remember, never change createdAt time, never change any id of the item or events, notes or anything. It's immutable.
        
        Don't remove exisiting events, unless you are clearly asked for.

        Don't edit existing events, unless you are clearly asked for.

        If you are asked for creating new events, add them next to existing events.
      `,
        prompt: `This is JSON object that represent current calendar of the user ${currentEventsStringified}.
        
        With the list of items I want you to current calendar object.
        
        List of the items to add to current calendar object: ${JSON.stringify(listOfActionToDo, null, 2)}

        This what you were asked to "${message}.". Remember about previous rules.

       Additional notes:
       If user ask you to schedule relative dates (like today, tomorrow, in 1 hours, in one month, monday next week),
       calculate this, knowing that today is ${CURRENT_TIME}.
       If user doesn't add Month or year (assume current one)
       You should round all times to the nearest hour or 10-minute mark or quarters, unless the user specifically asks for an exact time
       If user didn't pass title then as default you should set "Meeting at X" where X is the date user told you
      `,
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
