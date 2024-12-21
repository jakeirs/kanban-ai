import { Table } from "convex-helpers/server";
import { v } from "convex/values";
import { kanbanColumnsValidator } from "./types";

// Define the columns validator separately so we can export it

export const kanbanBoardsTable = Table("kanbanBoards", {
  ownerUserId: v.id("users"),
  name: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
  columns: kanbanColumnsValidator,
  description: v.optional(v.string()),
  isPrivate: v.optional(v.boolean()),
  sharedWith: v.optional(v.array(v.id("users"))),
});
