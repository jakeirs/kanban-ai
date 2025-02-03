"use client";

import { CalendarToolArgs } from "../../hooks/useToolInvocation";
import { EventToAddDateCard } from "@/components/blocks/dialogue-box/events/EventToAdd";
import { EventToDeleteDateCard } from "@/components/blocks/dialogue-box/events/EventToDelete";
import { EventToUpdateDateCard } from "@/components/blocks/dialogue-box/events/EventToUpdate";

interface CalendarToolProps {
  args: CalendarToolArgs;
}

export const CalendarTool = ({ args }: CalendarToolProps) => {
  if (!("events" in args)) return null;

  return (
    <div className="my-2">
      {args.events.events.map((eventGroup, index) => (
        <div key={index} className="mb-4">
          {eventGroup.events.map((event, eventIndex) => (
            <div key={eventIndex} className="mb-1">
              {eventGroup.action === "created" && (
                <EventToAddDateCard event={event} />
              )}
              {eventGroup.action === "updated" && (
                <EventToUpdateDateCard event={event} />
              )}
              {eventGroup.action === "deleted" && (
                <EventToDeleteDateCard event={event} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
