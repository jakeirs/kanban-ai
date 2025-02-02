"use client"

import { GeneralToolArgs } from "../../hooks/useToolInvocation"
import { MessageCloud } from "../MessageCloud"

interface GeneralToolProps {
  args: GeneralToolArgs
}

export const GeneralTool = ({ args }: GeneralToolProps) => {
  if (!("messageToUser" in args)) return null

  return (
    <div className="my-2">
      <MessageCloud
        message={args.messageToUser}
        isUser={false}
        userName={"App"}
        className="mb-1"
      />
    </div>
  )
}
