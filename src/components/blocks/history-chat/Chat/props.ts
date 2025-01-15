export type ActionType = "create" | "edit" | "delete" | "scheduled";

export interface ChatMemoryItem {
  id: string;
  summary: string;
  description?: string;
  date: string;
  operationalTags?: string[];
  actionType: ActionType;
}

export const memoryItems: ChatMemoryItem[] = [
  {
    id: "1",
    summary: "Project Setup Complete",
    description: "Initial project configuration and dependencies setup",
    date: "2024-01-14",
    operationalTags: ["Infrastructure", "Configuration"],
    actionType: "create",
  },
  {
    id: "2",
    summary: "Schedule Optimization Discussion",
    description: "Team meeting to improve project timeline efficiency",
    date: "2024-01-14",
    operationalTags: ["Planning", "Timeline"],
    actionType: "scheduled",
  },
  {
    id: "3",
    summary: "Task Priority Update",
    description: "Adjusted task priorities based on client feedback",
    date: "2024-01-14",
    operationalTags: ["Task Management", "Client Input"],
    actionType: "edit",
  },
  {
    id: "4",
    summary: "Resource Allocation Changed",
    description: "Updated team resource distribution for Q1",
    date: "2024-01-14",
    operationalTags: ["Resource Planning", "Team Management"],
    actionType: "delete",
  },
];
