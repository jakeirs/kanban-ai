import { DropResult } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useKanbanBoard = () => {
  // Fetch data from Convex
  const columns = useQuery(api.kanban.getColumns);
  const items = useQuery(api.kanban.getItems);
  const moveItem = useMutation(api.kanban.moveItem);

  // Transform Convex data to match DnD structure
  const transformedColumns = columns?.reduce((acc, column) => {
    const columnItems = items?.filter(item => item.columnId === column._id) || [];
    acc[column.identifier] = {
      id: column.identifier,
      title: column.title,
      items: columnItems.map(item => ({
        id: item._id,
        content: item.content,
      })),
    };
    return acc;
  }, {} as Record<string, { id: string; title: string; items: { id: string; content: string }[] }>) || {};

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination or no change, we don't need to do anything
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the target column's Convex ID based on the identifier
    const targetColumn = columns?.find(
      col => col.identifier === destination.droppableId
    );
    if (!targetColumn) return;

    // Get the item being moved
    const itemId = result.draggableId as Id<"kanbanItems">;
    
    try {
      // Update the item's position in Convex
      await moveItem({
        itemId,
        targetColumnId: targetColumn._id,
        newOrder: destination.index,
      });

      console.log("Item moved successfully in Convex");
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  return {
    columns: transformedColumns,
    onDragEnd
  };
};
