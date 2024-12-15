import { Infer } from "convex/values";
import { userKanbanBoardsTable } from "./table";

export type UserKanbanBoards = Infer<typeof userKanbanBoardsTable.doc>;
