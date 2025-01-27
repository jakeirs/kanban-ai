import { getUnixTime } from "date-fns";
import { EventZod } from "@/convex/tables/events/typesZod";

export const convertToUnixTime = (events: EventZod[]) => {
  return events.map((event) => {
    return {
      ...event,
      updatedAt: new Date(event.updatedAt).getTime(),
      time: {
        ...event.time,
        startTime: new Date(event.time.startTime).getTime(),
        endTime: new Date(event.time.endTime).getTime(),
      },
    };
  });
};
