import { Event, Project } from "../../../types"
import { startOfDay, endOfDay } from "date-fns"

/**
 * Get today's events from all projects
 */
export function getTodayEvents(projects: Project[]): Event[] {
  const todayStart = startOfDay(new Date()).getTime()
  const todayEnd = endOfDay(new Date()).getTime()

  return projects
    .flatMap((project) => project.events || [])
    .filter((event) => {
      const eventStartTime = event.time.startTime
      return eventStartTime >= todayStart && eventStartTime <= todayEnd
    })
    .sort((a, b) => a.time.startTime - b.time.startTime)
}

/**
 * Get upcoming events from all projects
 */
export function getUpcomingEvents(projects: Project[]): Event[] {
  const todayEnd = endOfDay(new Date()).getTime()

  return projects
    .flatMap((project) => project.events || [])
    .filter((event) => event.time.startTime > todayEnd)
    .sort((a, b) => a.time.startTime - b.time.startTime)
}

/**
 * Get events for dashboard - prioritizes today's events, falls back to upcoming if no today's events
 */
export function getEventsForDashboard(projects: Project[]): Event[] {
  const todayEvents = getTodayEvents(projects)
  
  if (todayEvents.length > 0) {
    return todayEvents.slice(0, 4)
  }

  return getUpcomingEvents(projects).slice(0, 4)
}
