import { IdsOfTasksThatWillBeAffected } from "@/app/api/kanban/chat/tools-server-side/updateKanbanColumn/types";
import { KanbanColumn } from "@/convex/tables/kanban/types";

export const addUpdatedPropertiesToItems = ({
  columns,
  idsOfTasksThatWillBeAffected,
  userId,
}: {
  columns: KanbanColumn[];
  idsOfTasksThatWillBeAffected: IdsOfTasksThatWillBeAffected;
  userId: string;
}): KanbanColumn[] => {
  const currentTimestamp = Date.now();

  return columns.map((column) => ({
    ...column,
    items: column.items.map((item) => {
      const affectedTask = idsOfTasksThatWillBeAffected.find(
        (task) => task.id === item.id
      );

      if (affectedTask) {
        return {
          ...item,
          updatedAt: currentTimestamp,
          updatedBy: userId,
          // If it's a newly created item, set createdAt
          ...(affectedTask.action === "created" && {
            createdAt: currentTimestamp,
          }),
        };
      }
      return item;
    }),
  }));
};
