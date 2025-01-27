import { addDays, format } from "date-fns";

export const defaultEvent = {
  id: "default",
  title: "New Event",
  description: "",
  updatedAt: Date.now(),
  time: {
    startTime: addDays(Date.now(), 4).getTime(),
    endTime: addDays(Date.now() + 3600000, 4).getTime(), // 1 hour from now by default
  },
  location: "Virtual Meeting",
  project: "",
  notes: [],
};

addDays;

// Example events for different use cases
export const defaultEvents = [
  {
    ...defaultEvent,
    id: "daily-standup",
    title: "Daily Standup",
    description: "Team daily sync meeting",
    time: {
      startTime: addDays(Date.now(), 5).getTime(),
      endTime: addDays(Date.now() + 1800000, 5).getTime(),
    },
    location: "Virtual Meeting Room 1",
  },
  {
    ...defaultEvent,
    id: "weekly-planning",
    title: "Weekly Planning",
    description: "Team planning session",
    time: {
      startTime: addDays(Date.now(), 6).getTime(),
      endTime: addDays(Date.now() + 1800000, 6).getTime(),
    },
    location: "Main Conference Room",
  },
  {
    ...defaultEvent,
    id: "monthly-review",
    title: "Monthly Review",
    description: "Project progress review",
    time: {
      startTime: addDays(Date.now(), 7).getTime(),
      endTime: addDays(Date.now() + 1800000, 7).getTime(),
    },
    location: "Board Room",
    project: "Project Review",
  },
];
