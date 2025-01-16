"use client";

import { Markdown } from "@/components/blocks/kanban/KanbanContent/Markdown";
import { Body } from "./Body";
import { TabsNotes } from "./TabsNotes";

interface BodyNoteProps {
  description: string;
  onClick?: () => void;
  className?: string;
}

export function BodyNote({ description, onClick, className }: BodyNoteProps) {
  return (
    <Body onClick={onClick} className={className}>
      <TabsNotes description={description} />
    </Body>
  );
}
