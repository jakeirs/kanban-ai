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
  const onDragEnd = async (result: DropResult) => {};
};
