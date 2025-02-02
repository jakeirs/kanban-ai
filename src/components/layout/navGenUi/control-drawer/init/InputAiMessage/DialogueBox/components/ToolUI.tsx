"use client"

import {
  CalendarToolArgs,
  GetUIToolArgs,
  ConfirmationToolArgs,
  GeneralToolArgs,
} from "../hooks/useToolInvocation"
import { CalendarTool } from "./tools/CalendarTool"
import { ConfirmationTool } from "./tools/ConfirmationTool"
import { GeneralTool } from "./tools/GeneralTool"
import { MessageDisplay } from "./tools/MessageDisplay"

interface ToolUIProps {
  args:
    | GetUIToolArgs
    | CalendarToolArgs
    | ConfirmationToolArgs
    | GeneralToolArgs
  messageId: string
  toolState: "result" | "partial-call" | "call"
  toolType: "getUI" | "calendarTool" | "confirmationTool" | "generalTool"
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
  messageId,
  toolState,
  toolType,
  toolCallId,
  addToolResult,
}: ToolUIProps) => {
  if (!args) return null

  const shortMessage = "shortMessage" in args ? args.shortMessage : ""

  return (
    <div>
      {shortMessage && (
        <MessageDisplay key={messageId} message={shortMessage} className="mb-1" />
      )}

      {toolType === "calendarTool" && <CalendarTool args={args as CalendarToolArgs} />}

      {toolType === "generalTool" && <GeneralTool args={args as GeneralToolArgs} />}

      {toolType === "confirmationTool" && (
        <ConfirmationTool
          args={args as ConfirmationToolArgs}
          toolCallId={toolCallId}
          addToolResult={addToolResult}
        />
      )}
    </div>
  )
}
