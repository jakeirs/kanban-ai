import { ToolInvocation } from "@ai-sdk/ui-utils"
import { useMemo } from "react"
import { ToolGroup, ToolInvocationResult, CalendarSearchToolArgs } from "../types"

export const useToolInvocation = (
  toolInvocations?: ToolInvocation[]
): ToolInvocationResult => {
  return useMemo(() => {
    if (!toolInvocations?.length) {
      return {
        toolGroups: [],
        toolState: "result" as const,
      }
    }

    const toolsByName = new Map<string, ToolInvocation[]>()
    toolInvocations.forEach((tool) => {
      const tools = toolsByName.get(tool.toolName) || []
      tools.push(tool)
      toolsByName.set(tool.toolName, tools)
    })

    const firstTool = toolInvocations[0]
    const toolState = firstTool?.state || "result"
    const toolCallId = firstTool?.toolCallId

    const toolGroups: ToolGroup[] = []
    const calendarSearch = toolsByName.get("calendarSearchTool") || []
    if (calendarSearch.length && toolCallId) {
      toolGroups.push({
        type: "calendarSearchTool",
        items: calendarSearch.map((tool) => ({
          toolCallId,
          args: tool.args as CalendarSearchToolArgs,
        })),
      })
    }

    return {
      toolGroups,
      toolState,
    }
  }, [toolInvocations])
}
