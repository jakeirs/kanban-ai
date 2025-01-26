import { Project } from "./types";

export const defaultProjects: Project[] = [
  {
    projectDetail: {
      id: "project-everyday-life",
      title: "Everyday life",
      description: "Managing daily tasks, routines, and personal goals",
      isDefault: true,
      status: "ongoing",
      indetifiers: {
        icon: "🌟",
        colorBg: "#E3F2FD",
        colorIcon: "#1976D2",
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    events: [
      {
        id: "event-1",
        title: "Morning Routine",
        subtitle: "Exercise and meditation",
        time: {
          startTime: Date.now() + 24 * 60 * 60 * 1000, // tomorrow
          endTime: Date.now() + 24.5 * 60 * 60 * 1000,
        },
        status: "scheduled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-2",
        title: "Weekly Shopping",
        subtitle: "Groceries and essentials",
        time: {
          startTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // in 3 days
          endTime: Date.now() + 3.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-3",
        title: "House Cleaning",
        subtitle: "Deep cleaning session",
        time: {
          startTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // in 5 days
          endTime: Date.now() + 5.3 * 24 * 60 * 60 * 1000,
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
        title: "Daily Habits",
        shortDescription: "Track and maintain healthy daily routines",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-2",
        icon: "🎯",
        color: "#F3E5F5",
        title: "Personal Goals",
        shortDescription: "Short-term and long-term life objectives",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
  {
    projectDetail: {
      id: "project-home-renovation",
      title: "Home Renovation",
      description: "Planning and tracking home improvement projects",
      status: "ongoing",
      indetifiers: {
        icon: "🏠",
        colorBg: "#FFF3E0",
        colorIcon: "#E65100",
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    events: [
      {
        id: "event-4",
        title: "Kitchen Design Planning",
        subtitle: "Review design options",
        time: {
          startTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // in 7 days
          endTime: Date.now() + 7.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Home Office",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-5",
        title: "Contractor Meeting",
        subtitle: "Discuss timeline and budget",
        time: {
          startTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // in 10 days
          endTime: Date.now() + 10.2 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Home",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "event-6",
        title: "Paint Selection",
        subtitle: "Choose colors for each room",
        time: {
          startTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // in 14 days
          endTime: Date.now() + 14.3 * 24 * 60 * 60 * 1000,
        },
        status: "scheduled",
        location: "Home Improvement Store",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
    notes: [
      {
        id: "note-3",
        icon: "💰",
        color: "#E8F5E9",
        title: "Budget Tracking",
        shortDescription: "Renovation costs and expenses",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-4",
        icon: "📋",
        color: "#FFF3E0",
        title: "Materials List",
        shortDescription: "Required supplies and materials",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "note-5",
        icon: "🔨",
        color: "#E1F5FE",
        title: "DIY Tasks",
        shortDescription: "Projects to handle personally",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
];
