"use client";

import { Button } from "@/components/ui/button";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { formatEvent } from "./base/utils/formatEvents";

interface EventToDeleteDateCardProps {
  event: EventFromLLMGenUI;
}

export const EventToDeleteDateCard = ({
  event: eventFromLLMZod,
}: EventToDeleteDateCardProps) => {
  const event = formatEvent(eventFromLLMZod);

  return (
    <div className="flex items-center gap-4 tracking-tighter">
      <div className="bg-gray-500 min-w-[73px] text-white rounded-xl py-4 px-4 tracking-normal text-center cursor-pointer">
        <div className="text-lg font-semibold line-through">
          {event.day.dayOfWeek}
        </div>
        <div className="text-3xl font-bold line-through">
          {event.day.dayOfMonth}
        </div>
        <div className="text-sm">{event.day.month}</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-gray-400 line-through">{event.title}</span>
        </div>
        <div className="text-2xl font-bold line-through">
          {event.timeStart} - {event.endTime}
        </div>
        <Button
          variant="outline"
          className="mt-2 rounded-full bg-red-700 text-white hover:bg-black/90"
        >
          Deleted
        </Button>
      </div>
    </div>
  );
};
