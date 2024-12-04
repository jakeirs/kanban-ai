// Define the structure of our items and columns
export interface Item {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  items: Item[];
}

// Initial data for the Kanban board
export const initialData: { [key: string]: Column } = {
  todo: {
    id: "todo",
    title: "To Do",
    items: [
      { id: "task-1", content: "Task 1" },
      { id: "task-2", content: "Task 2" },
      { id: "task-3", content: "Task 3" },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    items: [
      { id: "task-4", content: "Task 4" },
      { id: "task-5", content: "Task 5" },
      { id: "task-6", content: "Task 6" },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    items: [
      { id: "task-7", content: "Task 7" },
      { id: "task-8", content: "Task 8" },
      { id: "task-9", content: "Task 9" },
    ],
  },
};
