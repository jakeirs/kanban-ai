"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface ThreadProps {
  color?: string;
  iconColor?: string;
  className?: string;
}

export const Thread = ({
  color = "#FFB5E8",
  iconColor = "#000000",
  className,
}: ThreadProps) => {
  return (
    <div className={cn("w-full rounded-full p-1 bg-secondary/20", className)}>
      <div
        className="flex w-full items-center gap-4 rounded-full px-6 py-3"
        style={{
          backgroundColor: color,
        }}
      >
        <div className="bg-white rounded-full p-3 flex justify-center">
          <MessageCircle className="w-full h-full" color={iconColor} />
        </div>
        <span className="text-3xl font-semibold">Details</span>
      </div>
    </div>
  );
};
