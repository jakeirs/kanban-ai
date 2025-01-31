"use client";

import { Button } from "@/components/ui/button";
import { ConfirmationToolArgs } from "../../hooks/useToolInvocation";

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
  messageToUser,
  eventContext,
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
    const result = {
      userSelectedOption: option,
      eventContext,
    };
    addToolResult({ result, toolCallId });
  };

  return (
    <div className="space-y-4">
      {eventContext && (
        <p className="text-sm text-muted-foreground">{eventContext}</p>
      )}
      {messageToUser && <p className="font-medium">{messageToUser}</p>}
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
