export const defaultEvent = {
  id: "default",
  title: "New Event",
  description: "",
  updatedAt: Date.now(),
  time: {
    startTime: Date.now(),
    endTime: Date.now() + 3600000, // 1 hour from now by default
  },
  location: "Virtual Meeting",
  project: "",
  notes: [],
};

// Example events for different use cases
export const defaultEvents = [
  {
    ...defaultEvent,
    id: "daily-standup",
    title: "Daily Standup",
    description: "Team daily sync meeting",
    time: {
      startTime: Date.now(),
      endTime: Date.now() + 1800000, // 30 minutes
    },
    location: "Virtual Meeting Room 1",
  },
  {
    ...defaultEvent,
    id: "weekly-planning",
    title: "Weekly Planning",
    description: "Team planning session",
    time: {
      startTime: Date.now(),
      endTime: Date.now() + 3600000, // 1 hour
    },
    location: "Main Conference Room",
  },
  {
    ...defaultEvent,
    id: "monthly-review",
    title: "Monthly Review",
    description: "Project progress review",
    time: {
      startTime: Date.now(),
      endTime: Date.now() + 7200000, // 2 hours
    },
    location: "Board Room",
    project: "Project Review",
  },
];
