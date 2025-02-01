"use client";

import { Button } from "@/components/ui/button";
import { ConfirmationToolArgs } from "../../hooks/useToolInvocation";
import { MessageCloud } from "../MessageCloud";
import type { ToolResponse } from "@/app/api/schedule/chat/tools/types";

interface Props extends ConfirmationToolArgs {
  toolCallId: string;
  addToolResult: ({
    toolCallId,
    result,
  }: {
    toolCallId: string;
    result: any;
  }) => void;
}

export const ConfirmationDisplay = ({
  options,
  message,
  toolCallId,
  addToolResult,
}: Props) => {
  const getVariant = (option: string) => {
    switch (option) {
      case "APPROVE":
        return "default";
      case "MODIFY":
        return "secondary";
      case "CANCEL":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleConfrimationButton = (
    option: "APPROVE" | "MODIFY" | "CANCEL"
  ) => {
    const result: ToolResponse = {
      nextAction: {
        actImmediatelly: true,
        waitForUserResponse: false,
        nextToolToUse:
          option === "APPROVE" ? "afterConfirmationTool" : "generalTool",
      },
      success: true,
      userResponse: option,
    };
    addToolResult({ result, toolCallId });
  };

  return (
    <div className="space-y-4">
      <MessageCloud isUser={false} message={message} userName="App" />
      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={getVariant(option)}
            onClick={() => handleConfrimationButton(option)}
          >
            {option.charAt(0) + option.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>
    </div>
  );
};
