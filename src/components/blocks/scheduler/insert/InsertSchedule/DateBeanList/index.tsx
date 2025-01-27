"use client";

import { DateBean } from "../DateBean";

import { FormattedEvent } from "@/app/(pages)/mobile/scheduler/get/_utils/formatEvents";

interface DateBeanListProps {
  formattedEvents: FormattedEvent[];
}

export const DateBeanList = ({ formattedEvents }: DateBeanListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {formattedEvents.map((event, index) => (
        <DateBean key={index} event={event} />
      ))}
    </div>
  );
};
