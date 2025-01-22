import { Project, Event, Note } from "../../types";
import { startOfDay, endOfDay, compareDesc } from "date-fns";

/**
 * Data transfer object for the dashboard view containing
 * limited number of recent projects, today's events, and latest notes
 */
export interface DashboardDto {
  projects: Project[];
  events: Event[];
  notes: Note[];
}

/**
 * Transforms projects data for the dashboard view
 * @param projects - Array of projects or undefined
 * @returns {DashboardDto} Object containing:
 * - 2 most recent projects
 * - 4 events scheduled for today
 * - 3 most recently created notes
 */
export function forDashboardDto(projects: Project[] | undefined): DashboardDto {
  if (!projects || projects.length === 0) {
    return {
      projects: [],
      events: [],
      notes: [],
    };
  }

  const todayStart = startOfDay(new Date()).getTime();
  const todayEnd = endOfDay(new Date()).getTime();

  // Get only 2 most recent projects
  const recentProjects = [...projects]
    .sort((a, b) => compareDesc(a.updatedAt || 0, b.updatedAt || 0))
    .slice(0, 2);

  // Get today's events from all projects (max 4)
  const todayEvents = projects
    .flatMap((project) => project.events || [])
    .filter((event) => {
      const eventStartTime = event.time.startTime;
      return eventStartTime >= todayStart && eventStartTime <= todayEnd;
    })
    .sort((a, b) => a.time.startTime - b.time.startTime)
    .slice(0, 4);

  // Get latest notes from all projects (max 3)
  const latestNotes = projects
    .flatMap((project) => project.notes || [])
    .sort((a, b) => compareDesc(a.createdAt || 0, b.createdAt || 0))
    .slice(0, 3);

  return {
    projects: recentProjects,
    events: todayEvents,
    notes: latestNotes,
  };
}
