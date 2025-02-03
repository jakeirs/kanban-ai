"use client";

import { SheetContent } from "@/components/ui/sheet";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const formatTimeForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toTimeString().slice(0, 5);
};

interface EventDetailsProps {
  event: EventFromLLMGenUI;
}

export const EventDetailsSheetContent = ({ event }: EventDetailsProps) => {
  return (
    <SheetContent side="right">
      <div className="mt-4 space-y-6">
        <h2 className="text-2xl font-semibold">Event Details</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              placeholder="Enter event title"
              defaultValue={event.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              id="eventDate"
              type="date"
              defaultValue={formatDateForInput(event.time.startTime)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                defaultValue={formatTimeForInput(event.time.startTime)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                defaultValue={formatTimeForInput(event.time.endTime)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              defaultValue={event.description}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </SheetContent>
  );
};
