import { ToolInvocation } from "@ai-sdk/ui-utils"
import { useMemo } from "react"
import { z } from "zod"
import { calendarToolSchemaZod } from "@/app/api/schedule/chat/tools/calendarTool/types"
import { confirmationToolZod } from "@/app/api/schedule/chat/tools/confirmationTool/types"
import { generalToolParamsZod } from "@/app/api/schedule/chat/tools/generalTool/types"

export interface GetUIToolArgs {
  message: string
  shortMessage: string
}

export type CalendarToolArgs = z.infer<typeof calendarToolSchemaZod>
export type ConfirmationToolArgs = z.infer<typeof confirmationToolZod>
export type GeneralToolArgs = z.infer<typeof generalToolParamsZod>

export type ToolType = "calendarTool" | "confirmationTool" | "generalTool"

interface ToolRenderItem {
  toolCallId: string
  args: GetUIToolArgs | CalendarToolArgs | ConfirmationToolArgs | GeneralToolArgs
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

export const useToolInvocation = (toolInvocations?: ToolInvocation[]): ToolInvocationResult => {
  const tools = useMemo(() => {
    if (!toolInvocations?.length) return {
      toolGroups: [],
      toolState: "result" as const
    }

    const toolGroups: ToolGroup[] = []
    const toolsByName = new Map<string, ToolInvocation[]>()

    // Group tools by name
    toolInvocations.forEach(tool => {
      const tools = toolsByName.get(tool.toolName) || []
      tools.push(tool)
      toolsByName.set(tool.toolName, tools)
    })

    // Get first tool's state and ID
    const firstTool = toolInvocations[0]
    const toolState = firstTool?.state || "result"
    const toolCallId = firstTool?.toolCallId

    // Map calendar tools
    const calendarTools = toolsByName.get("calendarTool") || []
    if (calendarTools.length && toolCallId) {
      toolGroups.push({
        type: "calendarTool",
        items: calendarTools.map(tool => ({
          toolCallId,
          args: tool.args as CalendarToolArgs
        }))
      })
    }

    // Map confirmation tools
    const confirmationTools = toolsByName.get("confirmationTool") || []
    if (confirmationTools.length && toolCallId) {
      toolGroups.push({
        type: "confirmationTool",
        items: confirmationTools.map(tool => ({
          toolCallId,
          args: tool.args as ConfirmationToolArgs
        }))
      })
    }

    // Map general tools
    const generalTools = toolsByName.get("generalTool") || []
    if (generalTools.length && toolCallId) {
      toolGroups.push({
        type: "generalTool",
        items: generalTools.map(tool => ({
          toolCallId,
          args: tool.args as GeneralToolArgs
        }))
      })
    }

    return {
      toolGroups,
      toolState
    }
  }, [toolInvocations])

  return tools
}
