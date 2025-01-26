import { generateObject, tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { anthropic } from "@ai-sdk/anthropic";
import { addUpdatedPropertiesToItems } from "@/lib/kanban/addPropertiesToItems";
import { idsOfTasksThatWillBeAffectedZod } from "./types";
import { kanbanColumnZod } from "@/convex/tables/kanban/types";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { AI_MODEL_TO_USE } from "@/config/ai/model";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateKanbanColumns = tool({
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

    const {
      currentKanbanId: kanbanBoardId,
      userId,
      currentKanbanColumnsStringified,
    } = await convex.query(
      api.tables.kanban.queries.getCurrentUserForUpdateKanbanBoard.default
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
        system: `You are friendly assistant of Kanban board for the user. Don't mention any IDs of the tasks, columns and kanban boards and any other stuff to the user.
        If you have to do many operations like move couple of tasks from one column to another, you can use tools many time if needed.

        Generate Object that will match the schema and the task you were given changing current Kanban Board State.

        Remember, never change createdAt time, never change any id of the item or column or title.
      `,
        prompt: `This is current state of the columns in Kanban Board: ${currentKanbanColumnsStringified}
      And this is what you need to do: "${message}.
      "
      `,
        schema: z.object({
          columns: z.array(kanbanColumnZod),
          idsOfTasksThatWillBeAffected: idsOfTasksThatWillBeAffectedZod,
        }),
      });

      // updated properties such as updatedAt, createdAt, createdBy
      const { columns, idsOfTasksThatWillBeAffected } =
        addUpdatedPropertiesToItems({
          columns: object.columns,
          idsOfTasksThatWillBeAffected: object.idsOfTasksThatWillBeAffected,
          userId,
        });

      // create or delete descriptions for the tasks
      idsOfTasksThatWillBeAffected.every(async (task) => {
        if (task.action === "created") {
          await convex.mutation(
            api.tables.kanbanDescription.mutations.createDescription.default,
            { kanbanBoardId, taskId: task.id }
          );
        }
        if (task.action === "deleted") {
          await convex.mutation(
            api.tables.kanbanDescription.mutations.deleteDescription.default,
            {
              kanbanBoardId,
              taskId: task.id,
            }
          );
        }
      });

      // Update Columns
      const patchColumns = await convex.mutation(
        api.tables.kanban.mutations.patchColumns.default,
        {
          columns: columns,
          kanbanBoardId: kanbanBoardId,
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
