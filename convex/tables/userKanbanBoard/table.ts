import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const userKanbanBoardsTable = Table("userKanbanBoards", {
  userId: v.id("users"),
  ownerOfKanbaBoards: v.array(v.id("kanbanBoards")),
  accessToOtherKanbanBoards: v.array(v.id("kanbanBoards")),
});
