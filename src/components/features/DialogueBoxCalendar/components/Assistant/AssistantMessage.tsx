"use client";

import type { Message } from "ai/react";
import { CalendarSearchTool } from "./tools/CalendarSearchTool";
import { useToolArgs } from "./tools/_shared/useToolArgs";
import { ToolInvocation } from "@ai-sdk/ui-utils";
import { MessageCloud } from "../_shared/MessageCloud";

interface MessageDisplayProps {
  message: Message;
}

export const AssistantMessage = ({ message }: MessageDisplayProps) => {
  return (
    <>
      <CalendarSearchTool message={message} />
      <MessageCloud message={message.content} isUser={false} userName={"App"} />
    </>
  );
};
