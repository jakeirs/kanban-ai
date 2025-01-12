"use client";

// Main imports
import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, MapPin, Video } from "lucide-react";
import TaskCard from "./TaskCard";
import { taskCardExample } from "./TaskCard/props";
import ProjectCard from "./TaskCard2";

// Types and Interfaces
interface Task {
  id: string;
  title: string;
  recurrence: string;
  platform: {
    type: "zoom" | "google_meet" | "room";
    value: string;
  };
  person: {
    name: string;
    avatar?: string;
  };
  tag: {
    label: string;
    color: string;
  };
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  task?: Task;
}

interface TimelineProps {
  slots: TimeSlot[];
  className?: string;
}

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
      <div className="space-y-6">
        {slots.map((slot, index) => (
          <div key={index} className="flex gap-4">
            {/* Time display column showing start and end times */}
            <div className="w-16 md:w-20 flex flex-col shrink-0">
              <span className="text-base font-medium text-gray-900">
                {slot.startTime}
              </span>
              <span className="text-sm text-gray-400">{slot.endTime}</span>
            </div>

            {/* Render either a task card or an empty slot marker */}
            {slot.task ? (
              <>
                <Card
                  className={cn(
                    "flex-1 p-4 relative group", // group class enables hover effects on child elements
                    slot.task.tag.label.toLowerCase() === "study" &&
                      "bg-purple-500 text-white",
                    slot.task.tag.label.toLowerCase() === "work" && "bg-white"
                  )}
                >
                  {/* Task Header Section */}
                  <div className="flex justify-between items-start mb-3">
                    {/* Title and Recurrence Info */}
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {slot.task.title}
                      </h3>
                      <p className="text-sm opacity-80">
                        {slot.task.recurrence}
                      </p>
                    </div>
                    {/* More Options Button - Hidden by default, shows on hover */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        slot.task.tag.label.toLowerCase() === "study" &&
                          "text-white hover:bg-white/10"
                      )}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Platform Section - Shows meeting platform (Zoom/Meet) or room location */}
                  <div className="flex items-center gap-2 mb-3">
                    {/* Platform Icons - Video for online meetings, MapPin for physical rooms */}
                    {slot.task.platform.type === "zoom" && (
                      <Video className="h-4 w-4 opacity-80" />
                    )}
                    {slot.task.platform.type === "google_meet" && (
                      <Video className="h-4 w-4 opacity-80" />
                    )}
                    {slot.task.platform.type === "room" && (
                      <MapPin className="h-4 w-4 opacity-80" />
                    )}
                    <span className="text-sm opacity-80">
                      {slot.task.platform.value}
                    </span>
                  </div>

                  {/* Card Footer - Contains participant info and task type tag */}
                  <div className="flex justify-between items-center">
                    {/* Participant Section with Avatar */}
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        {slot.task.person.avatar && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slot.task.person.avatar}
                            alt={slot.task.person.name}
                          />
                        )}
                      </Avatar>
                      <span className="text-sm">{slot.task.person.name}</span>
                    </div>
                    {/* Task Type Tag - Styled differently for study/work */}
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full", // Base tag styling
                        slot.task.tag.label.toLowerCase() === "study" &&
                          "bg-yellow-500",
                        slot.task.tag.label.toLowerCase() === "work" &&
                          "bg-pink-100 text-pink-500"
                      )}
                    >
                      {slot.task.tag.label}
                    </span>
                  </div>
                </Card>
              </>
            ) : (
              <div className="mt-2 w-2 h-2 rounded-full bg-gray-200 shrink-0 relative top-2 -left-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Example data for demonstration
const exampleSlots: TimeSlot[] = [
  {
    startTime: "11:35",
    endTime: "13:05",
    task: {
      id: "1",
      title: "English (Intermediate)",
      recurrence: "Every Mon, Tue",
      platform: {
        type: "zoom",
        value: "Zoom",
      },
      person: {
        name: "Brooklyn Williamson",
      },
      tag: {
        label: "Study",
        color: "purple",
      },
    },
  },
  {
    startTime: "13:15",
    endTime: "14:45",
    task: {
      id: "2",
      title: "Design Daily Sync",
      recurrence: "Once",
      platform: {
        type: "google_meet",
        value: "Google meet",
      },
      person: {
        name: "Julie Watson",
      },
      tag: {
        label: "Work",
        color: "pink",
      },
    },
  },
  {
    startTime: "15:10",
    endTime: "16:40",
    task: {
      id: "3",
      title: "Ktarget kick off",
      recurrence: "Once",
      platform: {
        type: "room",
        value: "Room 1-403",
      },
      person: {
        name: "Jenny Alexander",
      },
      tag: {
        label: "Work",
        color: "pink",
      },
    },
  },
];

export type { TimeSlot, Task, TimelineProps };
export { exampleSlots };
export default Timeline;
