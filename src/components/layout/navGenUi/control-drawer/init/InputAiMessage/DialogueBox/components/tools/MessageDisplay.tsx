"use client"

import { MessageCloud } from "../MessageCloud"

interface MessageDisplayProps {
  message: string
  className?: string
}

export const MessageDisplay = ({ message, className }: MessageDisplayProps) => {
  return (
    <MessageCloud
      message={message}
      isUser={false}
      userName={"App"}
      className={className}
    />
  )
}
