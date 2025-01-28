"use client";

import type { EventFromConvex } from "@/convex/tables/events/types";
import { DateBean } from "../DateBean";

interface DateBeanListProps {
  events: EventFromConvex[];
}

export const DateBeanList = ({ events }: DateBeanListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {events.map((event, index) => (
        <DateBean key={index} event={event} />
      ))}
    </div>
  );
};
