import { ToolInvocation } from "@ai-sdk/ui-utils";
import { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/getUI/types";
import { z } from "zod";
import { calendarToolSchemaZod } from "@/app/api/schedule/chat/tools/calendarTool/types";

export interface GetUIToolArgs {
  message: string;
  shortMessage: string;
  listOfActionToDo: EventFromLLMGenUI[];
}

export type CalendarToolArgs = z.infer<typeof calendarToolSchemaZod>;

export type ToolName = "getUI" | "calendarTool";

export const useToolInvocation = (toolInvocations?: ToolInvocation[]) => {
  const filterToolsByName = (name: ToolName) =>
    toolInvocations?.filter((tool) => tool.toolName === name) || [];

  const getUITools = filterToolsByName("getUI");
  const calendarTools = filterToolsByName("calendarTool");

  const toolState = getUITools[0]?.state || calendarTools[0]?.state;

  const getUIArgs = getUITools.map((tool) => tool.args as GetUIToolArgs);
  const calendarArgs = calendarTools.map(
    (tool) => tool.args as CalendarToolArgs
  );

  return {
    getUIArgs,
    calendarArgs,
    toolState,
    hasCalendarTools: calendarTools.length > 0,
    hasGetUITools: getUITools.length > 0,
  };
};
