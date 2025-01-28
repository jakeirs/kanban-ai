import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/getUI/types";
import { EventFromConvex } from "@/convex/tables/events/types";
import type { EventFromLLMZod } from "@/convex/tables/events/typesZod";
import { format } from "date-fns";

export interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  timeStart: string;
  endTime: string;
  day: {
    dayOfWeek: string;
    dayOfMonth: string;
    month: string;
  };
}

export const formatEvent = (
  event: EventFromConvex | EventFromLLMZod | EventFromLLMGenUI
): FormattedEvent => {
  if (!event) {
    throw new Error("Event is required");
  }
  return {
    id: event.id,
    title: event.title,
    description: event.description
      ? event.description.length > 75
        ? `${event.description.slice(0, 75)}...`
        : event.description
      : "",
    timeStart: format(new Date(event.time.startTime), "h:mm aaa"),
    endTime: format(new Date(event.time.endTime), "h:mm aaa"),
    day: {
      dayOfWeek: format(new Date(event.time.startTime), "EEE"),
      dayOfMonth: format(new Date(event.time.startTime), "dd"),
      month: format(new Date(event.time.startTime), "MMM"),
    },
  };
};
