import { Table } from "convex-helpers/server";
import { v } from "convex/values";
import { kanbanItemValidator } from "./types";

export const kanbanBoardsTable = Table("kanbanBoards", {
  ownerUserId: v.id("users"),
  name: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
  columns: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
      items: v.array(
        kanbanItemValidator
      ),
    })
  ),
  description: v.optional(v.string()),
  isPrivate: v.optional(v.boolean()),
  sharedWith: v.optional(v.array(v.id("users"))),
});
