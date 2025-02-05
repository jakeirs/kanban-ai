"use client";

import type { Message } from "ai/react";
import { MessageCloud } from "../_shared/MessageCloud";

interface MessageDisplayProps {
  message: Message;
  className?: string;
}

export const UserMessage = ({ message }: MessageDisplayProps) => {
  if (message.content.startsWith("|_|_|_")) return null;

  return (
    <div>
      <MessageCloud
        message={message.content}
        isUser={true}
        userName={"Marcin"}
      />
    </div>
  );
};
