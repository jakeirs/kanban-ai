import { Project, Event, Note, type ProjectDetail } from "../../types"
import { compareDesc } from "date-fns"
import { getEventsForDashboard } from "./utilts/events"

/**
 * Data transfer object for the dashboard view containing
 * limited number of recent projects, today's events, and latest notes
 */
export interface DashboardDto {
  projects: ProjectDetail[];
  events: Event[];
  notes: Note[];
}

/**
 * Transforms projects data for the dashboard view
 * @param projects - Array of projects or undefined
 * @returns {DashboardDto} Object containing:
 * - 2 most recent projects
 * - 4 events (today's events if available, otherwise upcoming events)
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

  // Get only 2 most recent projects
  const recentProjects = [...projects.map((project) => project.projectDetail)]
    .sort((a, b) => compareDesc(a.updatedAt || 0, b.updatedAt || 0))
    .slice(0, 2)

  // Get today's events or upcoming events if no today's events
  const events = getEventsForDashboard(projects)

  // Get latest notes from all projects (max 3)
  const latestNotes = projects
    .flatMap((project) => project.notes || [])
    .sort((a, b) => compareDesc(a.createdAt || 0, b.createdAt || 0))
    .slice(0, 3);

    

  return {
    projects: recentProjects,
    events,
    notes: latestNotes,
  };
}
