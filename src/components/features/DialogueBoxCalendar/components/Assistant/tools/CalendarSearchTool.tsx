"use client";

import { Card } from "@/components/ui/card";
import { useToolArgs } from "./_shared/useToolArgs";
import type { Message } from "ai";

interface CalendarSearchToolProps {
  message: Message;
}

export const CalendarSearchTool = ({ message }: CalendarSearchToolProps) => {
  const { toolArgs, toolState, toolName, toolCallId, toolResult } =
    useToolArgs(message);

  if (toolState === "result" && toolArgs?.matches) {
    return (
      <div className="my-2">
        <Card className="p-4 mb-4">
          <p className="text-sm text-muted-foreground">
            {toolArgs?.requestSummary}
          </p>
          {toolArgs?.matches?.search?.map((item) => (
            <div key={item.eventId}>{item.eventId}</div>
          ))}
        </Card>
      </div>
    );
  }
  return null;
};
