import { Project,  } from "./types";

export const defaultProjects: Project[] = [
  {
    projectDetail: {
      id: "project-mobile-app",
      title: "Creating Mobile App",
      description:
        "Development of a new mobile application for fitness tracking",
      status: "ongoing",
      indetifiers: {
        icon: "📱",
        colorBg: "#E8F5E9",
        colorIcon: "#2E7D32",
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    events: [
      {
        id: "event-1",
        title: "Initial Project Planning",
        subtitle: "Define core features and timeline",
        time: {
          startTime: Date.now() + 24 * 60 * 60 * 1000, // tomorrow
          endTime: Date.now() + 25 * 60 * 60 * 1000,
        },
        status: "scheduled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-2",
        title: "UI/UX Design Review",
        subtitle: "Review and approve design mockups",
        time: {
          startTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // in 3 days
          endTime: Date.now() + 3.5 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-3",
        title: "Development Sprint Planning",
        time: {
          startTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // in 5 days
          endTime: Date.now() + 5.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
    notes: [
      {
        id: "note-1",
        icon: "📝",
        color: "#E3F2FD",
        title: "App Features List",
        shortDescription: "Core features and nice-to-have features for MVP",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-2",
        icon: "🎨",
        color: "#F3E5F5",
        title: "Design Guidelines",
        shortDescription: "Color scheme, typography, and component library",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
  {
    projectDetail: {
      id: "project-health",
      title: "Health",
      description: "Personal health and wellness tracking project",
      status: "ongoing",
      indetifiers: {
        icon: "🏥",
        colorBg: "#FFF3E0",
        colorIcon: "#E65100",
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    events: [
      {
        id: "event-4",
        title: "Annual Medical Checkup",
        subtitle: "General health examination",
        time: {
          startTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // in 7 days
          endTime: Date.now() + 7.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "City Medical Center",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-5",
        title: "Dental Appointment",
        time: {
          startTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // in 10 days
          endTime: Date.now() + 10.1 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Dental Clinic",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-6",
        title: "Fitness Assessment",
        subtitle: "Monthly progress check",
        time: {
          startTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // in 14 days
          endTime: Date.now() + 14.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Local Gym",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-7",
        title: "Nutritionist Consultation",
        time: {
          startTime: Date.now() + 21 * 24 * 60 * 60 * 1000, // in 21 days
          endTime: Date.now() + 21.5 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Wellness Center",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
    notes: [
      {
        id: "note-3",
        icon: "📊",
        color: "#E8F5E9",
        title: "Health Metrics",
        shortDescription: "Track vital signs and key health indicators",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-4",
        icon: "🥗",
        color: "#FFF3E0",
        title: "Meal Planning",
        shortDescription: "Weekly meal plans and nutrition goals",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-5",
        icon: "💪",
        color: "#E1F5FE",
        title: "Exercise Routine",
        shortDescription: "Workout schedule and progress tracking",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
];
