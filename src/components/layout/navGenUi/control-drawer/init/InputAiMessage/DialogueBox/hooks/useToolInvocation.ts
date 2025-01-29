import { ToolInvocation } from "@ai-sdk/ui-utils";
import { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/getUI/types";

export interface GetUIToolArgs {
  message: string;
  shortMessage: string;
  listOfActionToDo: EventFromLLMGenUI[];
}

export const useToolInvocation = (toolInvocations?: ToolInvocation[]) => {
  const getUITools =
    toolInvocations?.filter((tool) => tool.toolName === "getUI") || [];

  const toolState = getUITools[0]?.state;
  const getUIArgs = getUITools.map((tool) => tool.args as GetUIToolArgs);

  return {
    getUIArgs,
    toolState,
  };
};
