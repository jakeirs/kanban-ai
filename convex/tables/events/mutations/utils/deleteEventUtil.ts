import { EventFromConvex } from "../../types";

export const deleteEventUtil = (
  events: EventFromConvex[],
  eventId: string
): EventFromConvex[] => {
  return events.filter((event) => event.id !== eventId);
};
