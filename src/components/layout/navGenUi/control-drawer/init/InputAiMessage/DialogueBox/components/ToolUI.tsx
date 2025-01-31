"use client";

import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue"
import { MessageCloud } from "./MessageCloud"
import { CalendarToolArgs, GetUIToolArgs, ConfirmationToolArgs } from "../hooks/useToolInvocation"
import { format } from "date-fns"
import { ConfirmationDisplay } from "./ConfirmationDisplay"

interface ToolUIProps {
  args: GetUIToolArgs | CalendarToolArgs | ConfirmationToolArgs;
  messageId: string;
  toolState: "result" | "partial-call" | "call";
  toolType: "getUI" | "CALENDAR_EVENTS" | "confirmationTool";
}

const CalendarEventsDisplay = ({
  events,
}: {
  events: CalendarToolArgs["events"];
}) => {
  return (
    <div className="space-y-2">
      {events.map((event, index) => (
        <div key={index} className="bg-secondary/20 rounded-lg p-3">
          <h3 className="font-medium">{event?.title}</h3>
          {event?.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {event?.description}
            </p>
          )}
          <div className="text-sm mt-2">
            <p>Start: {format(new Date(event?.time?.startTime), "PPp")}</p>
            <p>End: {format(new Date(event?.time?.endTime), "PPp")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ToolUI = ({
  args,
  messageId,
  toolState,
  toolType,
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
          <ConfirmationDisplay {...args} />
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
