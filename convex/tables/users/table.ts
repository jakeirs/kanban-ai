import { Table } from "convex-helpers/server";
import { v } from "convex/values";

export const userSettingsTable = Table("userSettings", {
  userId: v.id("users"),
  currentKanbanBoard: v.id("kanbanBoards"),
});
