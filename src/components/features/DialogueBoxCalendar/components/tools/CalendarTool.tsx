"use client"

import { EventToAddDateCard } from "@/components/blocks/dialogue-box/events/EventToAdd"
import { EventToDeleteDateCard } from "@/components/blocks/dialogue-box/events/EventToDelete"
import { EventToUpdateDateCard } from "@/components/blocks/dialogue-box/events/EventToUpdate"
import { CalendarToolArgs } from "../../hooks/useToolInvocation"

interface CalendarToolProps {
  args: CalendarToolArgs
}

export const CalendarTool = ({ args }: CalendarToolProps) => {
  if (!("events" in args)) return null

  return (
    <div className="my-2">
      {args.events.map((event, index) => (
        <div key={index} className="mb-4">
          {event.action === "created" && (
            <EventToAddDateCard event={event} />
          )}
          {event.action === "updated" && (
            <EventToUpdateDateCard event={event} />
          )}
          {event.action === "deleted" && (
            <EventToDeleteDateCard event={event} />
          )}
        </div>
      ))}
    </div>
  )
}
