import { api } from "@/convex/_generated/api";
import { tool } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { z } from "zod";

// export const getReportOfKanban = tool({
//   description: "Create a new item in the Kanban board",
//   parameters: z.object({
//     columnName: z.string().describe("The ID of the column to add the item to"),
//     content: z.string().describe("The content of the item"),
//     description: z
//       .string()
//       .optional()
//       .describe("Optional description for the item"),
//     priority: z
//       .enum(["low", "medium", "high"])
//       .optional()
//       .describe("Priority level of the item"),
//   }),
//   execute: async (args) => {
//     const convex = new ConvexHttpClient(
//       process.env.NEXT_PUBLIC_CONVEX_URL ?? ""
//     );

//     const result = await convex.mutation(api.kanban.createItem, { ...args });

//     return {
//       success: true,
//       item: {
//         id: Date.now().toString(),
//         ...result
//       },
//     };
//   },
// });
