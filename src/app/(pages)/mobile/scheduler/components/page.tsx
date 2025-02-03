"use client";

import { EventToAddDateCard } from "@/components/blocks/dialogue-box/events/EventToAdd";
import { exampleEvents } from "./props";

export default function SchedulerPage() {
  const firstEvent = exampleEvents.events[0];

  return (
    <div>
      <EventToAddDateCard event={firstEvent} />
    </div>
  );
}
