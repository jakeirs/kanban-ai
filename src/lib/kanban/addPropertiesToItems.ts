import { IdsOfTasksThatWillBeAffected } from "@/app/api/kanban/chat/tools/updateKanbanColumn/types";
import { generateId } from "ai";
import { KanbanColumn } from "@/convex/tables/kanban/types";

export const addUpdatedPropertiesToItems = ({
  columns,
  idsOfTasksThatWillBeAffected,
  userId,
}: {
  columns: KanbanColumn[];
  idsOfTasksThatWillBeAffected: IdsOfTasksThatWillBeAffected;
  userId: string;
}): {
  columns: KanbanColumn[];
  idsOfTasksThatWillBeAffected: IdsOfTasksThatWillBeAffected;
} => {
  const currentTimestamp = Date.now();

  const newColumns = columns.map((column) => ({
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
            id: (() => {
              const newId = generateId(20);
              // Update the task ID in idsOfTasksThatWillBeAffected
              affectedTask.id = newId;
              return newId;
            })(),
          }),
        };
      }
      return item;
    }),
  }));

  return {
    columns: newColumns,
    idsOfTasksThatWillBeAffected
  };
};
