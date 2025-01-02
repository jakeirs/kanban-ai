import { v } from "convex/values";
import { z } from "zod";

export const kanbanDescriptionValidator = v.object({
  kanbanBoardId: v.id("kanbanBoards"),
  taskId: v.string(),
  content: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
  updatedBy: v.id("users"),
});

export interface KanbanDescription {
  kanbanBoardId: string;
  taskId: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
}

export const kanbanDescriptionZod = z.object({
  kanbanBoardId: z.string(),
  taskId: z.string(),
  content: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  updatedBy: z.string(),
});
