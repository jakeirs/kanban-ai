"use client";

import { Clock, Sun, Sunset, Moon, Sunrise } from "lucide-react";
import { format, getHours } from "date-fns";

interface TimelineProps {
  issuedDate?: number;
  issuedOn?: number;
}

const getTimeOfDayIcon = (date: Date) => {
  const hour = getHours(date);

  if (hour >= 5 && hour < 12)
    return <Sunrise className="h-6 w-6 text-muted-foreground" />;
  if (hour >= 12 && hour < 17)
    return <Sun className="h-6 w-6 text-muted-foreground" />;
  if (hour >= 17 && hour < 20)
    return <Sunset className="h-6 w-6 text-muted-foreground" />;
  return <Moon className="h-6 w-6 text-muted-foreground" />;
};

const defaultProps: TimelineProps = {
  issuedDate: Date.now(),
  issuedOn: Date.now(),
};

export function Timeline({
  issuedDate = defaultProps.issuedDate,
  issuedOn = defaultProps.issuedOn,
}: TimelineProps) {
  const formattedDate = format(new Date(issuedDate), "MMM dd, yyyy");
  const formattedTime = format(new Date(issuedOn), "HH:mm");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex px-10 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Issued Date</span>
            <span className="text-lg">{formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg">{formattedTime}</span>
                {getTimeOfDayIcon(new Date(issuedOn))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
