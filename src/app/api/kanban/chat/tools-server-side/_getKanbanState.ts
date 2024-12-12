import { tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";

import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const getKanbanState = tool({
  description:
    "Get the current state of the Kanban board including columns and items",
  parameters: z.object({
    boardId: z
      .string()
      .optional()
      .describe("Optional board ID to get specific board state"),
  }),
  execute: async ({ boardId }) => {
    const convex = new ConvexHttpClient(
      process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
    );
    const result = await convex.query(api.kanban.getItemsByColumn);
    // return {
    //   columns: [
    //     { id: "todo", title: "To Do", items: [] },
    //     { id: "in-progress", title: "In Progress", items: [] },
    //     { id: "done", title: "Done", items: [] },
    //   ],
    // };

    return result;
  },
});
