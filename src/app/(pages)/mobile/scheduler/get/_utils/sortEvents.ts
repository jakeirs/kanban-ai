import { EventFromConvex } from "@/convex/tables/events/types";
import { format } from "date-fns";

export const sortEvents = (events: EventFromConvex[]) => {
  return events.sort((a, b) => {
    const dateA = a.time.startTime;
    const dateB = b.time.startTime;
    return dateA - dateB;
  });
};
