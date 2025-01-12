import * as React from "react";
import { LucideIcon } from "lucide-react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
}

export function Badge({
  icon: Icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border-2 border-black px-4 py-1 text-xs font-semibold bg-transparent max-w-full ${className}`}
      {...props}
    >
      {Icon && (
        <span className="mr-2 flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-black">
          <Icon className="h-2.5 w-2.5 text-white" />
        </span>
      )}
      <span className="truncate">{children}</span>
    </div>
  );
}
