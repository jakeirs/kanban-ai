"use client";

import {
  CalendarToolArgs,
  GetUIToolArgs,
  ConfirmationToolArgs,
  GeneralToolArgs,
} from "../hooks/useToolInvocation";
import { CalendarTool } from "./tools/CalendarTool";
import { MessageDisplay } from "./tools/MessageDisplay";

interface ToolUIProps {
  args:
    | GetUIToolArgs
    | CalendarToolArgs
    | ConfirmationToolArgs
    | GeneralToolArgs;
  messageId: string;
  toolState: "result" | "partial-call" | "call";
  toolType:
    | "getUI"
    | "calendarTool"
    | "confirmationTool"
    | "generalTool"
    | "calendarSearch";
  toolCallId: string;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
}

export const ToolUI = ({
  args,
  messageId,
  toolState,
  toolType,
  toolCallId,
  addToolResult,
}: ToolUIProps) => {
  if (!args) return null;

  const shortMessage = "shortMessage" in args ? args.shortMessage : "";

  return (
    <div>
      {shortMessage && (
        <MessageDisplay
          key={messageId}
          message={shortMessage}
          className="mb-1"
        />
      )}

      {(toolType === "calendarTool" || toolType === "calendarSearch") &&
        toolState === "result" && (
          <CalendarTool args={args as CalendarToolArgs} />
        )}
    </div>
  );
};
