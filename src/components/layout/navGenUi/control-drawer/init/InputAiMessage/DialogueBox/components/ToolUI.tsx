"use client";

import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue";
import { MessageCloud } from "./MessageCloud";
import {
  CalendarToolArgs,
  GetUIToolArgs,
  ConfirmationToolArgs,
} from "../hooks/useToolInvocation";
import { format } from "date-fns";
import { ConfirmationDisplay } from "./ConfirmationDisplay";

interface ToolUIProps {
  args: GetUIToolArgs | CalendarToolArgs | ConfirmationToolArgs;
  messageId: string;
  toolState: "result" | "partial-call" | "call";
  toolType: "getUI" | "CALENDAR_EVENTS" | "confirmationTool";
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
        <MessageCloud
          key={messageId}
          message={shortMessage}
          isUser={false}
          userName={"App"}
          className="mb-1"
        />
      )}

      {toolType === "getUI" && "listOfActionToDo" in args && (
        <div className="my-2">
          {args.listOfActionToDo.map((action, index) => (
            <div key={index} className="mb-1">
              <DateBeanDialogue event={action} />
            </div>
          ))}
        </div>
      )}

      {toolType === "CALENDAR_EVENTS" && "events" in args && (
        <div className="my-2">
          {args.events.map((event, index) => (
            <div key={index} className="mb-1">
              <DateBeanDialogue event={event} />
            </div>
          ))}
        </div>
      )}

      {toolType === "confirmationTool" && "options" in args && (
        <div className="my-2">
          <ConfirmationDisplay
            {...args}
            toolCallId={toolCallId}
            addToolResult={addToolResult}
          />
        </div>
      )}

      {toolState === "result" && toolType !== "confirmationTool" && (
        <MessageCloud
          message={"Is this something what you wanted?"}
          isUser={false}
          userName={"App"}
          className="mb-1"
        />
      )}
    </div>
  );
};
