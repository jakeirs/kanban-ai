import { getUnixTime } from "date-fns";
import { EventZod } from "@/convex/tables/events/typesZod";

export const convertToUnixTime = (events: EventZod[]) => {
  return events.map((event) => {
    return {
      ...event,
      updatedAt: getUnixTime(new Date(event.updatedAt)),
      time: {
        ...event.time,
        startTime: getUnixTime(new Date(event.time.startTime)),
        endTime: getUnixTime(new Date(event.time.endTime)),
        recurrence: event.time.recurrence
          ? {
              ...event.time.recurrence,
              endDate: event.time.recurrence.endDate
                ? getUnixTime(new Date(event.time.recurrence.endDate))
                : undefined,
            }
          : undefined,
      },
    };
  });
};
