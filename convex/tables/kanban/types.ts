import { v, Infer } from "convex/values";
import { z } from "zod";
import { kanbanBoardsTable } from "./table";

export const kanbanItemValidator = v.object({
  id: v.string(),
  title: v.string(),
  labels: v.optional(v.array(v.string())),
  hasDescription: v.optional(v.boolean()),
  dueDate: v.optional(v.number()),
  priority: v.optional(v.string()),
  createdAt: v.optional(v.number()),
  updatedAt: v.optional(v.number()),
  updatedBy: v.optional(v.number()),
});

export const kanbanColumnsValidator = v.array(
  v.object({
    id: v.string(),
    name: v.string(),
    items: v.array(kanbanItemValidator),
  })
);

// Use the columnsValidator from table.ts
export type KanbanItem = Infer<typeof kanbanItemValidator>;
export type KanbanBoard = Infer<typeof kanbanBoardsTable.doc>;

export interface KanbanColumn {
  id: string;
  name: string;
  items: KanbanItem[];
}

export const kanbanItemZod = z.object({
  id: z.string(),
  title: z.string(),
  labels: z.array(z.string()).optional(),
  hasDescription: z.boolean().optional(),
  dueDate: z.number().optional(),
  priority: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  updatedBy: z.number().optional(),
});

export const kanbanColumnZod = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(kanbanItemZod),
});
