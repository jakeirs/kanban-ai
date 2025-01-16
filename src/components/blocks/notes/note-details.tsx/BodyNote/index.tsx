"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BodyNoteProps {
  title: string;
  description: string;
  readNumber?: number;
  onClick?: () => void;
  className?: string;
}

export function BodyNote({
  title,
  description,
  readNumber,
  onClick,
  className,
}: BodyNoteProps) {
  return (
    <Card
      className={cn(
        "w-full cursor-pointer bg-zinc-900 p-6 transition-colors rounded-3xl",
        className
      )}
      onClick={onClick}
    >
      <p className="mt-2 text-sm text-white">{description}</p>

      {readNumber && (
        <div className="mt-4 text-xs text-white">
          Available read nr: {readNumber}
        </div>
      )}
    </Card>
  );
}
