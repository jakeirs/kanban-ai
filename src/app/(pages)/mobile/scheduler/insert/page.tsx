"use client";

import { DateBeanList } from "@/components/blocks/scheduler/insert/InsertSchedule/DateBeanList";
import { FormattedEvent } from "../get/_utils/formatEvents";

export default function DemoPage() {
  const formattedEvents: FormattedEvent[] = [
    {
      id: "0",
      title: "Meeting",
      description: "Team sync",
      timeStart: "11:00am",
      endTime: "11:30am",
      day: {
        dayOfWeek: "Thu",
        dayOfMonth: "06",
        month: "Jun",
      },
    },
    {
      id: "1",
      title: "Review",
      description: "Project review",
      timeStart: "2:00pm",
      endTime: "2:30pm",
      day: {
        dayOfWeek: "Fri",
        dayOfMonth: "07",
        month: "Jun",
      },
    },
    {
      id: "2",
      title: "Planning",
      description: "Sprint planning",
      timeStart: "10:00am",
      endTime: "10:30am",
      day: {
        dayOfWeek: "Sat",
        dayOfMonth: "08",
        month: "Jun",
      },
    },
    {
      id: "3",
      title: "Retrospective",
      description: "Team retrospective",
      timeStart: "3:00pm",
      endTime: "3:30pm",
      day: {
        dayOfWeek: "Sun",
        dayOfMonth: "09",
        month: "Jun",
      },
    },
  ];

  return (
    <div className="p-4">
      <DateBeanList formattedEvents={formattedEvents} />
    </div>
  );
}
