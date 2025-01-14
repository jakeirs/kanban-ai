export type ActionType = "insert" | "adjust" | "edit" | "delete" | "knowledge";

export interface ChatMemoryItem {
  id: string;
  summary: string;
  date: string;
  tags: string[];
  actionType: ActionType;
  exchangeCount: number;
}

export const memoryItems: ChatMemoryItem[] = [
  {
    id: "1",
    summary: "Project Setup Complete",
    date: "2024-01-14",
    tags: ["setup", "milestone"],
    actionType: "insert",
    exchangeCount: 5,
  },
  {
    id: "2",
    summary: "Schedule Optimization Discussion",
    date: "2024-01-14",
    tags: ["planning", "schedule"],
    actionType: "knowledge",
    exchangeCount: 3,
  },
  {
    id: "3",
    summary: "Task Priority Update",
    date: "2024-01-14",
    tags: ["tasks", "priority"],
    actionType: "adjust",
    exchangeCount: 2,
  },
  {
    id: "4",
    summary: "Resource Allocation Changed",
    date: "2024-01-14",
    tags: ["resources", "update"],
    actionType: "edit",
    exchangeCount: 4,
  },
];
