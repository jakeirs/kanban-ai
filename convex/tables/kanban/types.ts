import { kanbanBoardsTable } from "./table";
import { v, Infer } from "convex/values";

export const kanbanItemValidator = v.object({
  id: v.string(),
  title: v.string(),
  order: v.optional(v.number()),
  labels: v.optional(v.array(v.string())),
  hasDescription: v.optional(v.boolean()),
  dueDate: v.optional(v.number()),
  priority: v.optional(v.string()),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),
  updatedBy: v.optional(v.number()),
});

export type KanbanItem = Infer<typeof kanbanItemValidator>;
export type KanbanBoard = Infer<typeof kanbanBoardsTable.doc>;

export interface KanbanColumn {
  id: string;
  name: string;
  items: KanbanItem[];
}
