"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";

// Define the structure of our items and columns
interface Item {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  items: Item[];
}

// Initial data for the Kanban board
const initialData: { [key: string]: Column } = {
  todo: {
    id: "todo",
    title: "To Do",
    items: [
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
      { id: "task-3", content: "Task 3" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    items: [
      { id: "task-4", content: "Task 4" },
      { id: "task-5", content: "Task 5" },
      { id: "task-6", content: "Task 6" },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    items: [
      { id: "task-7", content: "Task 7" },
      { id: "task-8", content: "Task 8" },
      { id: "task-9", content: "Task 9" },
    ],
  },
};

export default function KanbanBoard() {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex-1">
              <h2 className="font-semibold mb-2">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-2 rounded-md min-h-[200px]"
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent className="p-6">
                              {item.content}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
