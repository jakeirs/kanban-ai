import { generateObject, tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { anthropic } from "@ai-sdk/anthropic";
import { addUpdatedPropertiesToItems } from "@/lib/kanban/addPropertiesToItems";
import { idsOfTasksThatWillBeAffectedZod } from "./types";
import { kanbanColumnZod } from "@/convex/tables/kanban/types";
import { preloadQuery } from "convex/nextjs";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateKanbanColumns = tool({
  description: `Use this tools to change state of the Kanban Board.
   Move items from one column to another, delete items, change something in items,
    or even create a new one. In general this tool is able to make many actions in the same time.
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
    const { currentKanbanId: kanbanBoardId, userId } = await convex.query(
      api.tables.kanban.queries.getCurrentUserKanbanId.default
    );

    if (!userId) {
      return {
        success: false,
        message: "User is not authorized.",
      };
    }

    try {
      // get current state of Kanban Board
      const currentKanbanBoardState = await convex.query(
        api.tables.kanban.queries.getKanbanBoard.default,
        { kanbanBoardId: kanbanBoardId }
      );

      const currentColumnsStringified = JSON.stringify({
        ...currentKanbanBoardState?.columns,
      });

      // generate Object with AI
      const { object } = await generateObject({
        model: anthropic("claude-3-5-sonnet-20241022"),
        system: `You are friendly assistant of Kanban board for the user. Don't mention any IDs of the tasks, columns and kanban boards and any other stuff to the user.
        If you have to do many operations like move couple of tasks from one column to another, you can use tools many time if needed.

        Generate Object that will match the schema and the task you were given changing current Kanban Board State.

        Remember, never change createdAt time, never change any id of the item or column or title.
      `,
        prompt: `This is current state of the columns in Kanban Board: ${currentColumnsStringified}
      And this is what you need to do: "${message}.
      "
      `,
        schema: z.object({
          columns: z.array(kanbanColumnZod),
          idsOfTasksThatWillBeAffected: idsOfTasksThatWillBeAffectedZod,
        }),
      });

      // updated properties such as updatedAt, createdAt, createdBy
      const columnsWithUpdatedProperties = addUpdatedPropertiesToItems({
        columns: object.columns,
        idsOfTasksThatWillBeAffected: object.idsOfTasksThatWillBeAffected,
        userId,
      });

      // make mutation with generated Object from AI
      const patchColumns = await convex.mutation(
        api.tables.kanban.mutations.patchColumns.patchColumns,
        { columns: columnsWithUpdatedProperties, kanbanBoardId: kanbanBoardId }
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
