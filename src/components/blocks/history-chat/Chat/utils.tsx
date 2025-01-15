import React from "react";
import { Brain, Plus, Pencil, Trash2, Edit } from "lucide-react";

export type ActionType = "create" | "edit" | "delete" | "scheduled";

const iconColors = {
  create: "bg-emerald-400",
  edit: "bg-blue-400",
  delete: "bg-red-400",
  scheduled: "bg-yellow-400",
};

const borderColors = {
  create: "border-emerald-200",
  edit: "border-blue-200",
  delete: "border-red-200",
  scheduled: "border-yellow-200",
};

export const getActionIcon = (type: ActionType) => {
  const IconComponent = {
    create: Plus,
    edit: Pencil,
    delete: Trash2,
    scheduled: Brain,
  }[type];

  return (
    <div
      className={`${iconColors[type]} p-3 rounded-full border-2 ${borderColors[type]}`}
    >
      <IconComponent className="h-6 w-6 text-white" />
    </div>
  );
};
