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
      className={`inline-flex items-center rounded-full border-2 border-black px-4 py-1.5 text-sm font-semibold bg-transparent ${className}`}
      {...props}
    >
      {Icon && (
        <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Icon className="h-3 w-3 text-white" />
        </span>
      )}
      {children}
    </div>
  );
}
