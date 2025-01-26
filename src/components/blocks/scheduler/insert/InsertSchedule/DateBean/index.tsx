"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMemo } from "react";

interface DateBeanProps {
  date: Date;
  appointment: {
    startTime: string;
    endTime: string;
  };
  onTodoClick: () => void;
  onDateClick: () => void;
}

export const DateBean = ({
  date,
  appointment,
  onTodoClick,
  onDateClick,
}: DateBeanProps) => {
  const formattedDate = useMemo(() => {
    return {
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayOfMonth: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "long" }),
    };
  }, [date]);

  return (
    <div className="flex items-center gap-4 tracking-tighter">
      <div
        onClick={onDateClick}
        className="bg-black text-white rounded-xl py-4 px-4 tracking-normal text-center cursor-pointer"
      >
        <div className="text-lg font-semibold">{formattedDate.dayOfWeek}</div>
        <div className="text-3xl font-bold">{formattedDate.dayOfMonth}</div>
        <div className="text-sm">{formattedDate.month}</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-gray-400">Next Appointment</span>
        </div>
        <div className="text-2xl font-bold">
          {appointment.startTime} - {appointment.endTime}
        </div>
        <Button
          variant="outline"
          className="mt-2 rounded-full bg-black text-white hover:bg-black/90"
          onClick={onTodoClick}
        >
          To-Do List
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400"
        onClick={onDateClick}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
};
