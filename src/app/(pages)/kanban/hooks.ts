import { useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { Column, initialData } from "./config";

export const useKanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination, we don't need to do anything
    if (!destination) return;

    // If the source and destination are the same, we don't need to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    // Create new arrays for the source and destination items
    const sourceItems = [...sourceColumn.items];
    const destItems =
      source.droppableId === destination.droppableId
        ? sourceItems
        : [...destColumn.items];

    // Remove the item from the source array
    const [removed] = sourceItems.splice(source.index, 1);

    // Insert the item into the destination array
    destItems.splice(destination.index, 0, removed);

    // Update the state with the new data
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  };

  return {
    columns,
    onDragEnd
  };
};
