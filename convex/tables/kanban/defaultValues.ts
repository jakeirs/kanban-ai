import { KanbanColumn } from "./types";

export const defaultKanbanColumns: KanbanColumn[] = [
  {
    id: "todo",
    name: "Todo",
    items: [
      {
        id: "001",
        title: "Make plan for become millionaire",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
  {
    id: "inProgress",
    name: "In Progress",
    items: [
      {
        id: "002",
        title: "Keep using notForget.ai App",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
  {
    id: "done",
    name: "Done",
    items: [
      {
        id: "003",
        title:
          "Remind yourself that you are amazing and you keep becoming even more amazing",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
];
