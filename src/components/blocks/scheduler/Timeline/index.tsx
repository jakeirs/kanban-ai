"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreVertical, MapPin } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TimelineProps } from "./props";

// Main Timeline Component
const Timeline = ({ slots, className }: TimelineProps) => {
  return (
    // Main container with timeline line
    <div className={cn("relative w-full px-4 md:px-6", className)}>
      {/* Header section with Time label and action buttons */}
      <div className="flex justify-between mb-6">
        <div className="text-2xl font-semibold text-gray-400">Time</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <MapPin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Timeline slots container - Vertical list of time slots */}
      <div>
        {slots.map((slot, index) => (
          <div key={index} className="flex gap-6">
            {/* Time display column showing start and end times */}
            <div className="w-14  border-r-2 border-r-[1px] border-gray-300">
              <div className="w-16 md:w-20 flex flex-col shrink-0">
                <span className="text-base font-medium text-gray-900">
                  {slot.startTime}
                </span>
                <span className="text-sm text-gray-400">{slot.endTime}</span>
              </div>
            </div>

            {/* Render either a task card or an empty slot marker */}
            {slot.task ? (
              <TaskCard
                createdBy="Józef"
                title="Shopping to the garden"
                className="mb-3"
              />
            ) : (
              <div className="mt-2 w-2 h-2 rounded-full bg-gray-200 shrink-0 relative top-2 -left-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
