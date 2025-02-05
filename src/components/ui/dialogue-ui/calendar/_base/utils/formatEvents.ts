import { EventFromConvex } from "@/convex/tables/events/types";
import type { EventFromLLMZod } from "@/convex/tables/events/typesZod";
import { format } from "date-fns";

export interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  timeStart: string | null;
  endTime: string | null;
  project?: string;
  day: {
    dayOfWeek: string | null;
    dayOfMonth: string | null;
    month: string | null;
  };
}

export const formatEvent = (
  event: EventFromConvex | EventFromLLMZod
): FormattedEvent => {
  if (!event) {
    throw new Error("Event is required");
  }

  let timeStart: string | null = null;
  let endTime: string | null = null;
  let dayOfWeek: string | null = null;
  let dayOfMonth: string | null = null;
  let month: string | null = null;

  if (event.time?.startTime && event.time?.endTime) {
    const startDate = new Date(event.time.startTime);
    const endDate = new Date(event.time.endTime);

    const isStartValid = !isNaN(startDate.getTime());
    const isEndValid = !isNaN(endDate.getTime());
    const isChronologicallyValid = endDate >= startDate;

    if (isStartValid && isEndValid && isChronologicallyValid) {
      timeStart = format(startDate, "h:mm aaa");
      endTime = format(endDate, "h:mm aaa");
      dayOfWeek = format(startDate, "EEE");
      dayOfMonth = format(startDate, "dd");
      month = format(startDate, "MMM");
    }
  }

  return {
    id: event.id,
    title: event.title,
    description: event.description
      ? event.description.length > 75
        ? `${event.description.slice(0, 75)}...`
        : event.description
      : "",
    timeStart,
    endTime,
    project: (event as any).project,
    day: {
      dayOfWeek,
      dayOfMonth,
      month,
    },
  };
};
