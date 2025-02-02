import { getUnixTime } from "date-fns";
import { type EventFromLLMZod } from "@/convex/tables/events/typesZod";

export const convertToUnixTime = (events: EventFromLLMZod[]) => {
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
