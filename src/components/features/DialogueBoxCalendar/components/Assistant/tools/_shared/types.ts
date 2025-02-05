import type { CalendarSearchToolArgs as CalendarSearchToolArgsOriginal } from "@/app/api/search/chat/tools/_shared/types/tools";
import type { ToolName as ToolNameOriginal } from "@/app/api/search/chat/tools/_shared/types/tools";

// TOOLS ARGS
export type CalendarSearchToolArgs = CalendarSearchToolArgsOriginal;

// TOOLS RESULTS
// TOOL NAMES
export type ToolName = ToolNameOriginal;
export type ToolState = "result" | "partial-call" | "call";
