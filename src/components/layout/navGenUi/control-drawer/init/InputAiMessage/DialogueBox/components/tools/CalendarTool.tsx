"use client"

import { DateBeanDialogue } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBean/DateBeanDialogue"
import { CalendarToolArgs } from "../../hooks/useToolInvocation"

interface CalendarToolProps {
  args: CalendarToolArgs
}

export const CalendarTool = ({ args }: CalendarToolProps) => {
  if (!("events" in args)) return null

  return (
    <div className="my-2">
      {args.events.map((event, index) => (
        <div key={index} className="mb-1">
          <DateBeanDialogue event={event} />
        </div>
      ))}
    </div>
  )
}
