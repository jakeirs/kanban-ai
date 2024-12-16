"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { KanbanManualDrawer } from "./drawer-manual";
import { KanbanAIDrawer } from "./drawer-ai";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import type { KanbanItem, KanbanColumn } from "@/convex/tables/kanban/types";
import type { DropResult } from "@hello-pangea/dnd";

export default function KanbanBoard() {
  const storedUserId: Id<"users"> = localStorage.getItem(
    "userId"
  ) as Id<"users">;
  const userId = storedUserId as Id<"users">;

  const kanbanBoard = useQuery(
    api.tables.kanban.logic.visitKanbanPageLogic.visitKanbanPageLogic,
    {
      userId,
    }
  );

  console.log("kanbanBoard", kanbanBoard);

  const [columns, setColumns] = useState<KanbanColumn[]>([]);

  useEffect(() => {
    if (kanbanBoard?.columns) {
      setColumns(kanbanBoard.columns);
    }
  }, [kanbanBoard]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside of a droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = newColumns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    // Remove from source column
    const [movedItem] = sourceColumn.items.splice(source.index, 1);

    // Add to destination column
    destColumn.items.splice(destination.index, 0, movedItem);

    setColumns(newColumns);

    // TODO: Add mutation to update the kanban board in the database
  };

  if (!kanbanBoard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {kanbanBoard.name || "Kanban Board"}
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-1">
              <h2 className="mb-2 font-semibold">{column.name}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md min-h-[200px]"
                  >
                    {column.items.map((item: KanbanItem, index: number) => (
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
                            className="mb-2 cursor-grab active:cursor-grabbing"
                          >
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <h3 className="font-medium">{item.title}</h3>
                                {item.labels && item.labels.length > 0 && (
                                  <div className="flex gap-1">
                                    {item.labels.map(
                                      (label: string, i: number) => (
                                        <span
                                          key={i}
                                          className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                                        >
                                          {label}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                                {item.priority && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Priority: {item.priority}
                                  </div>
                                )}
                                {item.dueDate && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Due:{" "}
                                    {new Date(
                                      item.dueDate
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
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
      <div className="flex mt-4">
        <KanbanManualDrawer />
        <KanbanAIDrawer />
      </div>
    </div>
  );
}
