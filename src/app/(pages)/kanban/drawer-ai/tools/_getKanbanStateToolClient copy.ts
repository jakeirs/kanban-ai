import { fetchQuery } from 'convex/nextjs';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";


export const getKanbanStateToolClient = (toolName: string, args: any) => {
  if (toolName !== "getKanbanState") {
    throw new Error("Wrong Tool was invoked");
  }
  const fetchedEntireKanbanState = fetchQuery(api.kanban.getItemsByColumn)
  const entireKanbanState = useQuery(api.kanban.getItemsByColumn)


  return entireKanbanState;
};
