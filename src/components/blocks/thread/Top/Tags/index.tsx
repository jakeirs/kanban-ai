"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoursBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}

export function HoursBadge({
  icon: Icon,
  children,
  className,
  invert,
}: HoursBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl px-5 py-1 text-sm font-medium leading-[1]",
        invert ? "bg-black text-[#FFF176]" : "bg-[#FFF176] text-black",
        className
      )}
    >
      {Icon && <Icon className="h-6 w-6" />}
      {children}
    </div>
  );
}
