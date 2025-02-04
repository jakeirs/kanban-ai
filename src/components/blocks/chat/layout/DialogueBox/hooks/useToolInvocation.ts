import { ToolInvocation } from "@ai-sdk/ui-utils"
import { useMemo } from "react"
import { z } from "zod"
import { calendarSearchParamsZod } from "@/app/api/search/chat/tools/calendarSearch/types"

export type CalendarSearchToolArgs = z.infer<typeof calendarSearchParamsZod>

export type ToolType = "calendarSearchTool"

interface ToolRenderItem {
  toolCallId: string
  args: CalendarSearchToolArgs
}

interface ToolGroup {
  type: ToolType
  items: ToolRenderItem[]
}

type ToolState = "result" | "partial-call" | "call"

interface ToolInvocationResult {
  toolGroups: ToolGroup[]
  toolState: ToolState
}

export const useToolInvocation = (
  toolInvocations?: ToolInvocation[]
): ToolInvocationResult => {
  const tools = useMemo(() => {
    if (!toolInvocations?.length)
      return {
        toolGroups: [],
        toolState: "result" as const,
      }

    const toolGroups: ToolGroup[] = []
    const toolsByName = new Map<string, ToolInvocation[]>()

    // Group tools by name
    toolInvocations.forEach((tool) => {
      const tools = toolsByName.get(tool.toolName) || []
      tools.push(tool)
      toolsByName.set(tool.toolName, tools)
    })

    // Get first tool's state and ID
    const firstTool = toolInvocations[0]
    const toolState = firstTool?.state || "result"
    const toolCallId = firstTool?.toolCallId

    // Map calendar search tools
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

  return tools
}
