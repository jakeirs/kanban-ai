"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface ThreadProps {
  color?: string;
  className?: string;
}

export const Thread = ({ color = "#FFB5E8", className }: ThreadProps) => {
  return (
    <div className={cn("w-full rounded-3xl p-1 bg-secondary/20", className)}>
      <div
        className="flex w-full items-center gap-4 rounded-2xl px-10 py-1"
        style={{
          backgroundColor: color,
        }}
      >
        <div className="bg-white rounded-full p-3 flex justify-center">
          <MessageCircle className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 leading-[1]">Thread</div>
          <div className="text-3xl text-white font-semibold leading-[1]">
            Details
          </div>
        </div>
      </div>
    </div>
  );
};
