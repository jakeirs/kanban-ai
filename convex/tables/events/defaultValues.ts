export const defaultEvent = {
  id: "default",
  userId: "", // This will be set when creating actual event
  title: "New Event",
  description: "",
  updatedAt: Date.now(),
  time: {
    startTime: Date.now(),
    endTime: Date.now() + 3600000, // 1 hour from now by default
    recurrence: {
      type: "weekly" as const,
      interval: 1,
      endDate: Date.now() + 7776000000, // 90 days from now
      exceptions: [],
    },
  },
  location: "Virtual Meeting",
  project: "",
  notes: [],
};

export const getDefaultEvent = () => ({
  ...defaultEvent,
  updatedAt: Date.now(),
  time: {
    ...defaultEvent.time,
    startTime: Date.now(),
    endTime: Date.now() + 3600000,
    recurrence: {
      ...defaultEvent.time.recurrence,
      endDate: Date.now() + 7776000000,
    },
  },
});

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
      recurrence: {
        type: "daily" as const,
        interval: 1,
        exceptions: [],
      },
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
      recurrence: {
        type: "weekly" as const,
        interval: 1,
        exceptions: [],
      },
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
      recurrence: {
        type: "monthly" as const,
        interval: 1,
        exceptions: [],
      },
    },
    location: "Board Room",
    project: "Project Review",
  },
];
