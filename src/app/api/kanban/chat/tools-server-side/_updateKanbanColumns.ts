import { generateObject, tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";
import { anthropic } from "@ai-sdk/anthropic";
import { kanbanColumnZod } from "@/convex/tables/kanban/types";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateKanbanColumns = tool({
  description: `Use this tools to change state of the Kanban Board.
   Move items from one column to another, delete items, change something in items,
    or even create a new one.
  `,
  parameters: z.object({
    message: z.string().describe(`Pass the message to this tool as clear order,
         what exactly it has to be done in order to achieve given goal`),
  }),
  execute: async ({ message }) => {
    console.log(
      "message in updateKanbanColumns",
      JSON.stringify(message, null, 2)
    );

    const kanbanBoardId =
      "jh7ernq6xs05pn0dgzvcszq9h176jrx1" as Id<"kanbanBoards">;

    // get current state of Kanban Board
    const currentKanbanBoardState = await convex.query(
      api.tables.kanban.queries.getBoardById.getBoardById,
      { boardId: kanbanBoardId }
    );

    const currentColumnsStringified = JSON.stringify({
      ...currentKanbanBoardState?.columns,
    });

    try {
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
          idsOfTasksThatWillBeAffected: z
            .array(
              z
                .string()
                .describe("Id of the tasks / item that will be affected")
            )
            .describe("Array of Ids of the tasks that will be affcted"),
          columns: z.array(kanbanColumnZod),
        }),
        // output: "array",
      });

      console.log(
        "idsOfTasksThatWillBeAffected",
        JSON.stringify(object.idsOfTasksThatWillBeAffected, null, 2)
      );

      // make mutation with generated Object from AI
      const patchColumns = await convex.mutation(
        api.tables.kanban.mutations.patchColumns.patchColumns,
        { columns: object.columns, kanbanBoardId: kanbanBoardId }
      );

      return {
        success: true,
        // message: `The columns has been changed. Generated this ${object}`,
        message: `The columns has been changed.`,
      };
    } catch (error) {
      console.error("Error in updateKanbanColumns Tool", error);
    }
  },
});
