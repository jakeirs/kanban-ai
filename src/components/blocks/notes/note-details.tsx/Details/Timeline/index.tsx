"use client";

import { Clock } from "lucide-react";
import { format, getHours } from "date-fns";

interface TimelineProps {
  issuedDate: number;
  issuedOn: number;
}

const getTimeOfDay = (date: Date) => {
  const hour = getHours(date);
  
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
};

const defaultProps: TimelineProps = {
  issuedDate: Date.now(),
  issuedOn: Date.now()
};

export function Timeline({ issuedDate = defaultProps.issuedDate, issuedOn = defaultProps.issuedOn }: TimelineProps) {
  const timeOfDay = getTimeOfDay(new Date(issuedOn));
  const formattedDate = format(new Date(issuedDate), "MMM dd, yyyy");
  const formattedTime = format(new Date(issuedOn), "HH:mm");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl text-muted-foreground">TimeLine</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Issued Date</span>
            <span className="text-lg">{formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Issued On</span>
            <div className="flex flex-col">
              <span className="text-lg">{formattedTime}</span>
              <span className="text-sm text-muted-foreground capitalize">{timeOfDay}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
