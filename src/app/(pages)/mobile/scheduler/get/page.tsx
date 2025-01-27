"use client";

import { DateBeanList } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBeanList";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatEvents } from "./_utils/formatEvents";
import { sortEvents } from "./_utils/sortEvents";

export default function GetSchedulePage() {
  const eventsData = useQuery(
    api.tables.events.queries.getCurrentUserEvents.default
  );

  if (!eventsData) {
    return <div>... Loading</div>;
  }

  const sortedEvents = sortEvents(eventsData.currectEvents);
  const formattedEvents = formatEvents(sortedEvents);

  return (
    <div className="p-4">
      <DateBeanList formattedEvents={formattedEvents} />
    </div>
  );
}
