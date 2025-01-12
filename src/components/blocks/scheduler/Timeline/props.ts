interface Task {
  id: string;
  title: string;
  recurrence: string;
  platform: {
    type: "zoom" | "google_meet" | "room";
    value: string;
  };
  person: {
    name: string;
    avatar?: string;
  };
  tag: {
    label: string;
    color: string;
  };
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  task?: Task;
}

interface TimelineProps {
  slots: TimeSlot[];
  className?: string;
}

const exampleSlots: TimeSlot[] = [
  {
    startTime: "11:35",
    endTime: "13:05",
    task: {
      id: "1",
      title: "English (Intermediate)",
      recurrence: "Every Mon, Tue",
      platform: {
        type: "zoom",
        value: "Zoom",
      },
      person: {
        name: "Brooklyn Williamson",
      },
      tag: {
        label: "Study",
        color: "purple",
      },
    },
  },
  {
    startTime: "13:15",
    endTime: "14:45",
    task: {
      id: "2",
      title: "Design Daily Sync",
      recurrence: "Once",
      platform: {
        type: "google_meet",
        value: "Google meet",
      },
      person: {
        name: "Julie Watson",
      },
      tag: {
        label: "Work",
        color: "pink",
      },
    },
  },
  {
    startTime: "15:10",
    endTime: "16:40",
    task: {
      id: "3",
      title: "Ktarget kick off",
      recurrence: "Once",
      platform: {
        type: "room",
        value: "Room 1-403",
      },
      person: {
        name: "Jenny Alexander",
      },
      tag: {
        label: "Work",
        color: "pink",
      },
    },
  },
];

export type { TimeSlot, Task, TimelineProps };
export { exampleSlots };
