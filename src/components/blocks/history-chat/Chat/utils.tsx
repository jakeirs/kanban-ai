import React from "react";
import { Brain, Plus, Pencil, Trash2, Edit } from "lucide-react";

export type ActionType = "insert" | "adjust" | "edit" | "delete" | "knowledge";

const iconColors = {
  insert: "bg-pink-400",
  adjust: "bg-blue-400",
  edit: "bg-violet-400",
  delete: "bg-red-400",
  knowledge: "bg-purple-400",
};

const borderColors = {
  insert: "border-pink-200",
  adjust: "border-blue-200",
  edit: "border-violet-200",
  delete: "border-red-200",
  knowledge: "border-purple-200",
};

export const getActionIcon = (type: ActionType) => {
  const IconComponent = {
    insert: Plus,
    adjust: Pencil,
    edit: Edit,
    delete: Trash2,
    knowledge: Brain,
  }[type];

  return (
    <div
      className={`${iconColors[type]} p-3 rounded-full border-2 ${borderColors[type]}`}
    >
      <IconComponent className="h-6 w-6 text-white" />
    </div>
  );
};
