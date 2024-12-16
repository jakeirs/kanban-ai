"use client";

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { KanbanColumn } from "@/convex/tables/kanban/types";
import { KanbanItems } from "../KanbanItems";

interface KanbanColumnsProps {
  columns: KanbanColumn[];
}

export function KanbanColumns({ columns }: KanbanColumnsProps) {
  return (
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
                <KanbanItems items={column.items} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
}
