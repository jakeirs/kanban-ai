"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FormattedEvent } from "../../_dto/formatDashboardDto";
import { MapPin } from "lucide-react";
import EventDetails from "./EventDetails"

const Schedule: React.FC<{ events: FormattedEvent[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<FormattedEvent | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  
  return (
    <>
      {selectedEvent && (
        <EventDetails 
          event={selectedEvent}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
      <h2 className="font-medium mb-4">Upcoming tasks</h2>
      {events.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <div 
              className="mb-4 cursor-pointer" 
              onClick={() => {
                setSelectedEvent(item)
                setIsOpen(true)
              }}
            >
              <p className="text-sm text-gray-600">{item.time.startTime}</p>
              <p className="font-medium">{item.title}</p>
              <div className="flex items-center gap-1 text-blue-600">
                <MapPin className="h-3 w-3" />
                <p className="text-sm text-gray-600">{item.location}</p>
              </div>
            </div>
            {index < events.length - 1 && (
              <Separator className="mb-4 h-[2px]" />
            )}
          </React.Fragment>
        );
      })}
        </CardContent>
      </Card>
    </>
  );
};

export default Schedule;
