import { EventFromConvex } from "@/convex/tables/events/types";
import { format } from "date-fns";

export const convertToLocalTime = (events: EventFromConvex[]) => {
  return events.map((event) => {
    const converted = {
      ...event,
      updatedAt: format(event.updatedAt, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX"),
      time: {
        ...event.time,
        startTime: format(
          event.time.startTime,
          "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX"
        ),
        endTime: format(
          event.time.endTime,
          "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX"
        ),
      },
    };
    return converted;
  });
};
