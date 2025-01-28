import { Event } from "../../types"

export const deleteEventUtil = (events: Event[], eventId: string): Event[] => {
  return events.filter((event) => event.id !== eventId)
}
