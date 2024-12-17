import { tool } from "ai";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const getKanbanBoard = tool({
  description:
    "Get the current state of the Kanban board including columns and items",
  parameters: z.object({
    boardId: z
      .string()
      .optional()
      .describe("board ID to get specific board state"),
  }),
  execute: async ({ boardId }) => {
    const convex = new ConvexHttpClient(
      process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
    );
    const result = await convex.query(
      api.tables.kanban.queries.getBoardById.getBoardById,
      { boardId: "jh7ernq6xs05pn0dgzvcszq9h176jrx1" as Id<"kanbanBoards"> }
    );

    return JSON.stringify({ kanbanBoardId: result?._id, ...result });
  },
});
