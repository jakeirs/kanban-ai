// Sample data for the Dashboard component
export const dashboardData = {
  name: "Stanislav",
  activeSessions: [
    {
      title: "Information Arc.",
      duration: "19 min",
      type: "info" as const,
    },
    {
      title: "Project Discussion",
      duration: "18 min",
      type: "video" as const,
    },
  ],
  scheduleItems: [
    {
      time: "9:30 AM",
      title: "Face Interview",
    },
    {
      time: "10:42 AM",
      title: "Wireframe",
    },
    {
      time: "11:36 AM",
      title: "Demographic",
    },
  ],
};
