import { Event } from "@/convex/tables/events/types";
import { formatISO } from "date-fns";

export const convertToISO = (events: Event[]) => {
  return events.map((event) => {
    const converted = {
      ...event,
      updatedAt: formatISO(event.updatedAt),
      time: {
        ...event.time,
        startTime: formatISO(event.time.startTime),
        endTime: formatISO(event.time.endTime),
      },
    };
    return converted;
  });
};
