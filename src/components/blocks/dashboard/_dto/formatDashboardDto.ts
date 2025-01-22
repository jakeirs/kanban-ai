import { format } from "date-fns";
import { DashboardDto } from "@/convex/tables/projects/query/_dto/forDashboardDto";
import { Event, Note, ProjectDetail } from "@/convex/tables/projects/types";

// Interface for formatted dates version of ProjectDetail
export interface FormattedProjectDetail
  extends Omit<ProjectDetail, "createdAt" | "updatedAt" | "timeConstraints"> {
  createdAt: string;
  updatedAt: string;
  timeConstraints?: {
    startDate: string;
    endDate: string;
  };
}

// Interface for formatted dates version of Event
export interface FormattedEvent
  extends Omit<Event, "createdAt" | "updatedAt" | "time"> {
  createdAt?: string;
  updatedAt?: string;
  time: {
    startTime: string;
    endTime: string;
    recurrence?: number;
    exceptions?: number[];
  };
}

// Interface for formatted dates version of Note
export interface FormattedNote
  extends Omit<Note, "createdAt" | "updatedAt" | "lastVisited"> {
  createdAt?: string;
  updatedAt?: string;
  lastVisited?: string;
}

// Interface for formatted dates version of DashboardDto
export interface FormattedDashboardDto {
  projects: FormattedProjectDetail[];
  events: FormattedEvent[];
  notes: FormattedNote[];
}

export function formatDates(
  dto: DashboardDto | undefined
): FormattedDashboardDto {
  if (!dto || dto.projects.length === 0) {
    return {
      projects: [],
      events: [],
      notes: [],
    };
  }

  return {
    projects: dto.projects.map((project: ProjectDetail) => ({
      ...project,
      createdAt: format(project.createdAt, "PPp"),
      updatedAt: format(project.updatedAt, "PPp"),
      timeConstraints: project.timeConstraints
        ? {
            startDate: format(project.timeConstraints.startDate, "PPp"),
            endDate: format(project.timeConstraints.endDate, "PPp"),
          }
        : undefined,
    })),
    events: dto.events.map((event: Event) => ({
      ...event,
      createdAt: event.createdAt ? format(event.createdAt, "PPp") : undefined,
      updatedAt: event.updatedAt ? format(event.updatedAt, "PPp") : undefined,
      time: {
        ...event.time,
        startTime: format(event.time.startTime, "PPp"),
        endTime: format(event.time.endTime, "PPp"),
      },
    })),
    notes: dto.notes.map((note: Note) => ({
      ...note,
      createdAt: note.createdAt ? format(note.createdAt, "PPp") : undefined,
      updatedAt: note.updatedAt ? format(note.updatedAt, "PPp") : undefined,
      lastVisited: note.lastVisited
        ? format(note.lastVisited, "PPp")
        : undefined,
    })),
  };
}
