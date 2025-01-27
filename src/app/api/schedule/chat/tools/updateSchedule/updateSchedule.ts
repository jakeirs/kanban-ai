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
import { projectSchemaZod } from "@/convex/tables/projects/typesZod";

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
  }),
  execute: async ({ message }) => {
    const tokenNextJs = await convexAuthNextjsToken();
    const isAuthenticated = await isAuthenticatedNextjs();

    if (!isAuthenticated) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    convex.setAuth(tokenNextJs!);

    const { userId, currentProjectsStringified, currectProjectsDocId } =
      await convex.query(
        api.tables.projects.queries.getCurrentUserProjects.default
      );

    if (!userId) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    try {
      // generate Object with AI
      const { object } = await generateObject({
        model: anthropic(AI_MODEL_TO_USE),
        system: `You are friendly assistant of user's Schedule.

        Generate Object that will match the schema and the task you were given updating current project object.

        Remember, never change createdAt time, never change any id of the item or events, notes or anything. It's immutable.
        Never create new PROJECT.
      `,
        prompt: `This is current state of the current state of schedule of the user: ${currentProjectsStringified}
      And this is what you need to do: "${message}.

      Especially you want to look to at the property EVENTS, because we will be updating those. In proper project.
      If project is not provided by the user then assign EVENT to the default project which is EVERYDAY LIFE or something like this.
      Don't create new project. Never create new PROJECT. Project will be created in other tool.
      "
      `,
        schema: z.object({
          projects: z.array(projectSchemaZod),
          idsOfTasksThatWillBeAffected: idsOfTasksThatWillBeAffectedZod,
        }),
      });

      console.log("object PROJECTs gen by AI", JSON.stringify(object, null, 2));

      // Update Columns
      const patchProjects = await convex.mutation(
        api.tables.projects.mutations.patchProjects.default,
        {
          projects: object.projects,
          currectProjectsDocId,
        }
      );

      return {
        success: true,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `The columns has been changed.`,
      };
    } catch (error) {
      console.error("Error in updateKanbanColumns Tool", error);
      return {
        success: false,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `There was an error updating Kanban items. Please try again now or later. Sorry mate!`,
      };
    }
  },
});
