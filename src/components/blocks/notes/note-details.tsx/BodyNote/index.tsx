"use client";

import { Markdown } from "@/components/blocks/kanban/KanbanContent/Markdown";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BodyNoteProps {
  description: string;
  readNumber?: number;
  onClick?: () => void;
  className?: string;
}

export function BodyNote({
  description,
  readNumber,
  onClick,
  className,
}: BodyNoteProps) {
  return (
    <Card
      className={cn(
        "w-full cursor-pointer bg-zinc-900 p-6 transition-colors rounded-t-3xl",
        className
      )}
      onClick={onClick}
    >
      <div className="mt-2 text-sm ">
        <Markdown content={description} className="text-white" />
      </div>

      {readNumber && (
        <div className="mt-4 text-xs text-white">
          Available read nr: {readNumber}
        </div>
      )}
    </Card>
  );
}
