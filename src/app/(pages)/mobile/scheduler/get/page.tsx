"use client";

import { DateBeanList } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBeanList";
import { useEffect } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatEvents } from "./_utils/formatEvents";

declare global {
  interface Window {
    dateFns: typeof dateFns;
  }
}

export default function GetSchedulePage() {
  const eventsData = useQuery(
    api.tables.events.queries.getCurrentUserEvents.default
  );

  if (!eventsData) {
    return <div>... Loading</div>;
  }

  const formattedEvents = formatEvents(eventsData.currectEvents);

  useEffect(() => {
    window.dateFns = dateFns;
  }, []);

  const appointments = [
    {
      date: new Date(2024, 5, 6), // June 6, 2024
      startTime: "11:00am",
      endTime: "11:30am",
    },
    {
      date: new Date(2024, 5, 7), // June 7, 2024
      startTime: "2:00pm",
      endTime: "2:30pm",
    },
    {
      date: new Date(2024, 5, 8), // June 8, 2024
      startTime: "10:00am",
      endTime: "10:30am",
    },
    {
      date: new Date(2024, 5, 9), // June 9, 2024
      startTime: "3:00pm",
      endTime: "3:30pm",
    },
  ];

  return (
    <div className="p-4">
      <DateBeanList
        appointments={appointments}
        onTodoClick={(index) =>
          console.log("Todo clicked for appointment", index)
        }
        onDateClick={(index) =>
          console.log("Date clicked for appointment", index)
        }
      />
    </div>
  );
}
