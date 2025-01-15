import { Plus, Pencil, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Operation = "create" | "edit" | "delete" | "scheduled";

interface OperationTagProps {
  operation: Operation;
  number?: number;
  className?: string;
}

const getOperationConfig = (operation: Operation) => {
  switch (operation) {
    case "create":
      return {
        icon: Plus,
        bgColor: "bg-emerald-500/10",
        textColor: "text-emerald-500",
      };
    case "edit":
      return {
        icon: Pencil,
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-500",
      };
    case "delete":
      return {
        icon: Trash2,
        bgColor: "bg-red-500/10",
        textColor: "text-red-500",
      };
    case "scheduled":
      return {
        icon: Clock,
        bgColor: "bg-yellow-500/10",
        textColor: "text-yellow-500",
      };
  }
};

export const OperationTag = ({
  operation,
  number,
  className,
}: OperationTagProps) => {
  const config = getOperationConfig(operation);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-1 rounded-full px-2 py-1",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <Icon size={14} />
      <span className="text-xs capitalize">{operation}</span>
      {typeof number === "number" && (
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border",
            config.bgColor,
            config.textColor
          )}
        >
          <span className="text-xs">{number}</span>
        </div>
      )}
    </div>
  );
};
