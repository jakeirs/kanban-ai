"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "../../../ui/drawer";
import type { KanbanItem } from "@/convex/tables/kanban/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Markdown } from "./Markdown";

interface KanbanContentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: KanbanItem | null;
}

export function KanbanContent({
  isOpen,
  onOpenChange,
  selectedItem,
}: KanbanContentProps) {
  if (!isOpen && !selectedItem) {
    return null;
  }

  const content = useQuery(
    api.tables.kanbanDescription.queries.getCurrentUserKanbanDescriptionForTask
      .default,
    { taskId: selectedItem?.id! }
  );

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-h-[75vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>{selectedItem?.title}</DrawerTitle>
            {selectedItem?.labels && selectedItem.labels.length > 0 && (
              <div className="flex gap-1 mt-2">
                {selectedItem.labels.map((label: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            <Markdown content={content?.content} />
            {selectedItem?.priority && (
              <div className="mt-2">Priority: {selectedItem.priority}</div>
            )}
            {selectedItem?.dueDate && (
              <div className="mt-2">
                Due: {new Date(selectedItem.dueDate).toLocaleDateString()}
              </div>
            )}
          </DrawerHeader>
        </div>
        <DrawerFooter className="border-t">
          <DrawerClose className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
