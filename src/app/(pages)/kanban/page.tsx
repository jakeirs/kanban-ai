"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanManualDrawer } from "./drawer-manual";
import { KanbanAIDrawer } from "./drawer-ai";
import { useQuery, useMutation } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import type { KanbanColumn } from "@/convex/tables/kanban/types";
import { KanbanColumns } from "@/components/blocks/kanban/KanbanColumns";
import { useKanbanLogic } from "@/components/blocks/kanban/logic";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") as Id<"users">;
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const kanbanBoard = useQuery(
    api.tables.kanban.logic.visitKanbanPageLogic.visitKanbanPageLogic,
    {
      userId: userId as Id<"users">,
    }
  ) as Doc<"kanbanBoards">;
  const moveItemMutation = useMutation(
    api.tables.kanban.mutations.moveItemToColumn.moveItemToColumn
  );

  useEffect(() => {
    if (kanbanBoard?.columns) {
      setColumns(kanbanBoard.columns);
    }
  }, [kanbanBoard]);

  const { onDragEnd } = useKanbanLogic({
    setColumnsLocalState: setColumns,
    moveItemMutation,
    kanbanBoard,
  });

  if (!userId) {
    return <div>Loading user...</div>;
  }

  if (!kanbanBoard) {
    return <div>Loading board...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {kanbanBoard.name || "Kanban Board"}
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanColumns columns={columns} />
      </DragDropContext>
      <div className="flex mt-4">
        <KanbanManualDrawer />
        <KanbanAIDrawer />
      </div>
    </div>
  );
}
