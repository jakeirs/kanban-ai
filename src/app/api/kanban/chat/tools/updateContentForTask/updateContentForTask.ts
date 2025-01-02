import { generateObject, tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { anthropic } from "@ai-sdk/anthropic";
import {
  convexAuthNextjsToken,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const updateContentForTask = tool({
  description: ``,
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
        model: anthropic("claude-3-5-sonnet-20241022"),
        system: `You are friendly assistant of Kanban board for the user. Don't mention any IDs of the tasks, columns and kanban boards and any other stuff to the user.
        If you have to do many operations like move couple of tasks from one column to another, you can use tools many time if needed.

        You will be responsible to create the content of the task. You wil get instruction and the entire state of the kanban Board.

        Based on that you will prepare concise and useful message for the user, so he could understand the task easier,
        and he could finish it earlier. In general use some techniques and strategies that could help the user.
        
        Give to the user some suggestions.

        Consider if the task could be splited into smaller steps. Write those steps. You can present estimated time 
        for each step

        Also consider what else could help to finish the task.
        Remeber that the user is a human so treat him as a human. Remember that humans are easy distracted creatures.
        Help the with this in your advices or prepare such a structure of your output that could help focus.

        Also create your content in the way that would be engaging. It means you bullet points or list. Use h1, h2, h3 or highlights or callouts.
      `,
        prompt: `This is current state of the columns in Kanban Board: ${currentKanbanColumnsStringified}, based on that prepare taskId that user what to update the content.
      And this is what you need to do: "${message}.
      "
      `,
        schema: z.object({
          content: z
            .string()
            .describe(
              "The content of the task that user want you to prepare for him"
            ),
          taskId: z
            .string()
            .describe(
              "The id of the task that user want to change, extract this from the current state of the columns in Kanban Board"
            ),
        }),
      });

      console.log(
        "object from Tool content For Task",
        JSON.stringify(object, null, 2)
      );

      // Update Content
      await convex.mutation(
        api.tables.kanbanDescription.mutations.patchDescriptionByTaskId.default,
        { kanbanBoardId, taskId: object.taskId, content: object.content }
      );

      return {
        success: true,
        message: `The content for the task has been create | updated sucessfully.`,
      };
    } catch (error) {
      console.error("Error in contentForTask Tool", error);
      return {
        success: false,
        message: `There was an error updating Kanban Description. Please try again now or later. Sorry mate!`,
      };
    }
  },
});
