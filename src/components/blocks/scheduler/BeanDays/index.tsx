"use client";

import { cn } from "@/lib/utils";
import { Circle, Frown, Meh, SmilePlus } from "lucide-react";

interface BeanDay {
  date: number;
  day: string;
  mood?: "neutral" | "happy" | "sad";
  isToday?: boolean;
  isWeekend?: boolean;
  isActive?: boolean;
}

const BeanDays = () => {
  const days: BeanDay[] = [
    { date: 13, day: "Mon", mood: "neutral", isActive: true },
    { date: 14, day: "Tue", mood: "happy" },
    { date: 15, day: "Wed", mood: "sad" },
    { date: 16, day: "Thu", isToday: true },
    { date: 17, day: "Fri" },
    { date: 18, day: "Sat", isWeekend: true },
    { date: 19, day: "Sun", isWeekend: true },
  ];

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case "neutral":
        return <Meh size={24} />;
      case "happy":
        return <SmilePlus size={24} />;
      case "sad":
        return <Frown size={24} />;
      default:
        return <Circle size={24} />;
    }
  };

  return (
    <div className="flex gap-1 justify-between px-4 py-2">
      {days.map((day) => (
        <div key={day.date} className="flex flex-col items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              day.mood && !day.isActive && "bg-yellow-400 text-black",
              day.mood && day.isActive && "bg-black text-yellow-400",
              day.isToday && "bg-black text-white",
              !day.mood &&
                !day.isToday &&
                "bg-white border border-gray-200 text-gray-400",
              "cursor-pointer hover:opacity-80 transition-opacity"
            )}
          >
            {getMoodIcon(day.mood)}
          </div>
          <span className="text-sm mt-1">{day.date}</span>
          <span className={cn("text-xs", day.isWeekend && "text-blue-500")}>
            {day.day}
          </span>
        </div>
      ))}
    </div>
  );
};

export { BeanDays };
