"use client";

import { DateBeanList } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBeanList";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { sortEvents } from "./_utils/sortEvents";
import { FilterBar } from "@/components/blocks/scheduler/get/FilterBar";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function GetSchedulePage() {
  const [showDateBeanList, setShowDateBeanList] = useState(true);
  const eventsData = useQuery(
    api.tables.events.queries.getCurrentUserEvents.default
  );

  if (!eventsData) {
    return <div>... Loading</div>;
  }

  const sortedEvents = sortEvents(eventsData.currectEvents);

  return (
    <div className="p-4">
      <FilterBar />
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          checked={showDateBeanList}
          onCheckedChange={setShowDateBeanList}
        />
        <label className="text-sm font-medium">Show Date Bean List</label>
      </div>
      {showDateBeanList && <DateBeanList events={sortedEvents} />}
    </div>
  );
}
