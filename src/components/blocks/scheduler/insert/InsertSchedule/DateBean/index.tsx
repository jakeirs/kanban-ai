"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMemo } from "react";

import { FormattedEvent } from "@/app/(pages)/mobile/scheduler/get/_utils/formatEvents";

interface DateBeanProps {
  event: FormattedEvent;
}

export const DateBean = ({ event }: DateBeanProps) => {
  return (
    <div className="flex items-center gap-4 tracking-tighter">
      <div className="bg-black text-white rounded-xl py-4 px-4 tracking-normal text-center cursor-pointer">
        <div className="text-lg font-semibold">{event.day.dayOfWeek}</div>
        <div className="text-3xl font-bold">{event.day.dayOfMonth}</div>
        <div className="text-sm">{event.day.month}</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-gray-400">{event.title}</span>
        </div>
        <div className="text-2xl font-bold">
          {event.timeStart} - {event.endTime}
        </div>
        <Button
          variant="outline"
          className="mt-2 rounded-full bg-black text-white hover:bg-black/90"
        >
          To-Do List
        </Button>
      </div>

      <Button variant="ghost" size="icon" className="text-gray-400">
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};
