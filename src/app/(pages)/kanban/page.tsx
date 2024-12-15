"use client";

import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { useKanbanBoard } from "./hooks";
import { KanbanManualDrawer } from "./drawer-manual";
import { KanbanAIDrawer } from "./drawer-ai";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function KanbanBoard() {
  const userId = localStorage.getItem("userId") as Id<"users">;
  const kanbanBoard = useQuery(api.kanban.getAllBoardsForUserId, { userId });
  console.log("kanbanBoard", kanbanBoard);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Kanban Board</h1>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
      <div className="flex space-x-4">
        {/* {Object.values(columns).map((column) => (
            <div key={column.id} className="flex-1">
              <h2 className="mb-2 font-semibold">{column.title}</h2>
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
          ))} */}
      </div>
      {/* </DragDropContext> */}
      <div className="flex">
        <KanbanManualDrawer />
        <KanbanAIDrawer />
      </div>
    </div>
  );
}
