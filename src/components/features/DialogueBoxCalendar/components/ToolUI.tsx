"use client";

import { CalendarSearchToolArgs } from "../hooks/useToolInvocation"
import { CalendarSearchTool } from "./tools/CalendarSearchTool"

interface ToolUIProps {
  args: CalendarSearchToolArgs
  messageId: string
  toolState: "result" | "partial-call" | "call"
  toolType: "calendarSearchTool"
  toolCallId: string
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string
    result: any
  }) => void
}

export const ToolUI = ({
  args,
  toolState,
  toolType,
}: ToolUIProps) => {
  if (!args) return null

  return (
    <div>
      {toolType === "calendarSearchTool" && toolState === "result" && (
        <CalendarSearchTool args={args} />
      )}
    </div>
  )
}
