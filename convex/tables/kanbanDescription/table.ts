import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const kanbanDescriptionTable = Table("kanbanDescriptions", {
  kanbanBoardId: v.id("kanbanBoards"),
  taskId: v.string(), // This matches the id field in kanbanItemValidator
  content: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
  updatedBy: v.id("users"),
});
