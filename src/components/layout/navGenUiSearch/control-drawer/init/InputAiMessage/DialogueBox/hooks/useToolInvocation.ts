import { ToolInvocation } from "@ai-sdk/ui-utils";
import { useMemo } from "react";
import { z } from "zod";
import { calendarToolSchemaZod } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { confirmationToolZod } from "@/app/api/schedule/chat/tools/confirmationTool/types";
import { generalToolParamsZod } from "@/app/api/schedule/chat/tools/generalTool/types";
import { calendarSearchParamsZod } from "@/app/api/search/chat/tools/calendarSearch/types";

export interface GetUIToolArgs {
  message: string;
  shortMessage: string;
}

export type CalendarToolArgs =
  | z.infer<typeof calendarToolSchemaZod>
  | z.infer<typeof calendarSearchParamsZod>;
export type ConfirmationToolArgs = z.infer<typeof confirmationToolZod>;
export type GeneralToolArgs = z.infer<typeof generalToolParamsZod>;

export type ToolType = "calendarTool" | "confirmationTool" | "generalTool";

interface ToolRenderItem {
  toolCallId: string;
  args:
    | GetUIToolArgs
    | CalendarToolArgs
    | ConfirmationToolArgs
    | GeneralToolArgs;
}

interface ToolGroup {
  type: ToolType;
  items: ToolRenderItem[];
}

type ToolState = "result" | "partial-call" | "call";

interface ToolInvocationResult {
  toolGroups: ToolGroup[];
  toolState: ToolState;
}

export const useToolInvocation = (
  toolInvocations?: ToolInvocation[]
): ToolInvocationResult => {
  const tools = useMemo(() => {
    if (!toolInvocations?.length)
      return {
        toolGroups: [],
        toolState: "result" as const,
      };

    const toolGroups: ToolGroup[] = [];
    const toolsByName = new Map<string, ToolInvocation[]>();

    // Group tools by name
    toolInvocations.forEach((tool) => {
      const tools = toolsByName.get(tool.toolName) || [];
      tools.push(tool);
      toolsByName.set(tool.toolName, tools);
    });

    // Get first tool's state and ID
    const firstTool = toolInvocations[0];
    const toolState = firstTool?.state || "result";
    const toolCallId = firstTool?.toolCallId;

    // Map calendar tools and search
    const calendarTools = toolsByName.get("calendarTool") || [];
    const calendarSearch = toolsByName.get("calendarSearchTool") || [];
    if ((calendarTools.length || calendarSearch.length) && toolCallId) {
      toolGroups.push({
        type: "calendarTool",
        items: [...calendarTools, ...calendarSearch].map((tool) => ({
          toolCallId,
          args: tool.args as CalendarToolArgs,
        })),
      });
    }

    return {
      toolGroups,
      toolState,
    };
  }, [toolInvocations]);

  return tools;
};
