import { DropResult } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useState, useEffect } from "react";

interface KanbanItem {
  id: string;
  content: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

export const useKanbanBoard = () => {
  // Fetch data from Convex
  const columns = useQuery(api.kanban.getColumns);
  const items = useQuery(api.kanban.getItems);
  const moveItem = useMutation(api.kanban.moveItem);

  // Local state for immediate updates
  const [localColumns, setLocalColumns] = useState<Record<string, KanbanColumn>>({});

  // Update local state when Convex data changes
  useEffect(() => {
    if (columns && items) {
      const transformed = columns.reduce((acc, column) => {
        const columnItems = items.filter(item => item.columnId === column._id) || [];
        acc[column.identifier] = {
          id: column.identifier,
          title: column.title,
          items: columnItems.sort((a, b) => a.order - b.order).map(item => ({
            id: item._id,
            content: item.content,
          })),
        };
        return acc;
      }, {} as Record<string, KanbanColumn>);
      
      setLocalColumns(transformed);
    }
  }, [columns, items]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination or no change, return early
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the target column's Convex ID
    const targetColumn = columns?.find(
      col => col.identifier === destination.droppableId
    );
    if (!targetColumn) return;

    const itemId = result.draggableId as Id<"kanbanItems">;
    
    // Immediately update local state for smooth UI
    setLocalColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      
      // Get source and destination columns
      const sourceColumn = { ...newColumns[source.droppableId] };
      const destColumn = { ...newColumns[destination.droppableId] };
      
      // Create new arrays for items
      const sourceItems = [...sourceColumn.items];
      const destItems = source.droppableId === destination.droppableId
        ? sourceItems
        : [...destColumn.items];
      
      // Move the item
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      
      // Update columns
      newColumns[source.droppableId] = {
        ...sourceColumn,
        items: sourceItems,
      };
      newColumns[destination.droppableId] = {
        ...destColumn,
        items: destItems,
      };
      
      return newColumns;
    });

    try {
      // Update Convex in the background
      await moveItem({
        itemId,
        targetColumnId: targetColumn._id,
        newOrder: destination.index,
      });
    } catch (error) {
      console.error("Error moving item:", error);
      // On error, reset to server state
      if (columns && items) {
        const serverState = columns.reduce((acc, column) => {
          const columnItems = items.filter(item => item.columnId === column._id) || [];
          acc[column.identifier] = {
            id: column.identifier,
            title: column.title,
            items: columnItems.sort((a, b) => a.order - b.order).map(item => ({
              id: item._id,
              content: item.content,
            })),
          };
          return acc;
        }, {} as Record<string, KanbanColumn>);
        
        setLocalColumns(serverState);
      }
    }
  };

  return {
    columns: localColumns,
    onDragEnd
  };
};
