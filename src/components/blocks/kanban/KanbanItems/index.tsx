"use client";

import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "../../../ui/card";
import type { KanbanItem } from "@/convex/tables/kanban/types";

interface KanbanItemsProps {
  items: KanbanItem[];
  onItemClick?: (item: KanbanItem) => void;
}

export function KanbanItems({ items, onItemClick }: KanbanItemsProps) {
  return (
    <>
      {items.map((item: KanbanItem, index: number) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-2 cursor-grab active:cursor-grabbing"
              onClick={() => onItemClick?.(item)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{item.title}</h3>
                  {item.labels && item.labels.length > 0 && (
                    <div className="flex gap-1">
                      {item.labels.map((label: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.priority && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Priority: {item.priority}
                    </div>
                  )}
                  {item.dueDate && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </Draggable>
      ))}
    </>
  );
}
