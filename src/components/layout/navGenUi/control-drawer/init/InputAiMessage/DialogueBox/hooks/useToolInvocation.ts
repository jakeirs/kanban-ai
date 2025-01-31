import { ToolInvocation } from "@ai-sdk/ui-utils";
import { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/getUI/types";
import { z } from "zod";
import { calendarToolSchemaZod } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { confirmationToolZod } from "@/app/api/schedule/chat/tools/confirmationTool/types";

export interface GetUIToolArgs {
  message: string;
  shortMessage: string;
  listOfActionToDo: EventFromLLMGenUI[];
}

export type CalendarToolArgs = z.infer<typeof calendarToolSchemaZod>;
export type ConfirmationToolArgs = z.infer<typeof confirmationToolZod>;

export type ToolName = "getUI" | "calendarTool" | "confirmationTool";

export const useToolInvocation = (toolInvocations?: ToolInvocation[]) => {
  const filterToolsByName = (name: ToolName) =>
    toolInvocations?.filter((tool) => tool.toolName === name) || [];

  const getUITools = filterToolsByName("getUI");
  const calendarTools = filterToolsByName("calendarTool");
  const confirmationTools = filterToolsByName("confirmationTool");

  const toolState =
    getUITools[0]?.state ||
    calendarTools[0]?.state ||
    confirmationTools[0]?.state;

  const toolCallId =
    getUITools[0]?.toolCallId ||
    calendarTools[0]?.toolCallId ||
    confirmationTools[0]?.toolCallId;

  const getUIArgs = getUITools.map((tool) => tool.args as GetUIToolArgs);
  const calendarArgs = calendarTools.map(
    (tool) => tool.args as CalendarToolArgs
  );
  const confirmationArgs = confirmationTools.map(
    (tool) => tool.args as ConfirmationToolArgs
  );

  return {
    getUIArgs,
    calendarArgs,
    confirmationArgs,
    toolState,
    toolCallId,
    hasCalendarTools: calendarTools.length > 0,
    hasGetUITools: getUITools.length > 0,
    hasConfirmationTools: confirmationTools.length > 0,
  };
};
