import { type EventFromLLMZod } from "@/convex/tables/events/typesZod";
import { generateId } from "ai";

// generate ID & UnixTime
export const prepareToConvex = (events: EventFromLLMZod[]) => {
  return events.map((event) => {
    return {
      ...event,
      id: generateId(20),
      updatedAt: new Date(event.updatedAt).getTime(),
      time: {
        ...event.time,
        startTime: new Date(event.time.startTime).getTime(),
        endTime: new Date(event.time.endTime).getTime(),
      },
    };
  });
};
