import { EventFromConvex } from "../../types";

export const deleteEventsUtil = (
  events: EventFromConvex[],
  eventIds: string[]
): EventFromConvex[] => {
  return events.filter((event) => !eventIds.includes(event.id));
};
