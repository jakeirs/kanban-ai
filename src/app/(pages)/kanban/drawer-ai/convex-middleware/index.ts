import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useKanbanData = () => {
  const kanbanData = useQuery(api.kanban.getItemsByColumn);

  return {
    data: kanbanData,
    isLoading: kanbanData === undefined,
  };
};
