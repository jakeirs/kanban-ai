"use client";

import { useState } from "react";
import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue";
import { MessageCloud } from "./MessageCloud";
import { GetUIToolArgs } from "../hooks/useToolInvocation";

interface ToolUIProps {
  args: GetUIToolArgs;
  messageId: string;
  toolState: "result" | "partial-call" | "call";
}

export const ToolUI = ({ args, messageId, toolState }: ToolUIProps) => {
  if (!args) return null;

  const [] = useState();

  return (
    <div>
      {args.shortMessage && (
        <MessageCloud
          key={messageId}
          message={args.shortMessage}
          isUser={false}
          userName={"App"}
          className="mb-1"
        />
      )}
      {args.listOfActionToDo && (
        <div className="my-2">
          {args.listOfActionToDo.map((action, index) => {
            return (
              <div className="mb-1">
                <DateBeanDialogue key={index} event={action} />
              </div>
            );
          })}
        </div>
      )}
      {toolState === "result" && (
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
