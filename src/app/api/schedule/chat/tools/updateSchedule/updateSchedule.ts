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

    const { userId, currectEventsDocId, currentEventsStringified } =
      await convex.query(
        api.tables.events.queries.getCurrentUserEvents.default
      );

    if (!userId) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    console.log("PRZED GENERATE OBJECT", format(new Date(), "pp"));

    try {
      // generate Object with AI
      const { object } = await generateObject({
        model: anthropic(AI_MODEL_TO_USE),
        system: `You are friendly assistant of user's Schedule.

        Generate Object that will match the schema and the task you were given updating current project object.

        Remember, never change createdAt time, never change any id of the item or events, notes or anything. It's immutable.
        Never create new PROJECT.
      `,
        prompt: `This is the list of the items that you need to create ${JSON.stringify(listOfActionToDo, null, 2)}. All those changes need to 
      be in ${currentEventsStringified}.

      And this is what you need to do: "${message}."

      Especially you want to look to at the property EVENTS, because we will be updating those. In proper project.
      If project is not provided by the user then assign EVENT to the default project which is EVERYDAY LIFE or something like this.
      Don't create new project. Never create new PROJECT. Project will be created in other tool.
      "
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
      console.error("Error in updating Porjects Tool", error);
      return {
        success: false,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `There was an error updating projects items. Please try again now or later. Sorry mate!`,
      };
    }
  },
});
