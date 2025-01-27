import { Event } from "@/convex/tables/events/types";
import { format } from "date-fns";

export interface FormattedEvent {
  title: string;
  description: string;
  timeStart: string;
  endTime: string;
  day: string;
}

export const formatEvents = (events: Event[]): FormattedEvent[] => {
  if (!events || !events.length) {
    return [];
  }
  return events.map((event) => {
    return {
      title: event.title,
      description: event.description
        ? event.description.length > 75
          ? `${event.description.slice(0, 75)}...`
          : event.description
        : "",
      timeStart: format(new Date(event.time.startTime), "h:mma"),
      endTime: format(new Date(event.time.endTime), "h:mma"),
      day: format(new Date(event.time.startTime), "MMMM d, yyyy"),
    };
  });
};
