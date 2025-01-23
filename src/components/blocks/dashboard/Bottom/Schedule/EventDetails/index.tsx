"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MoveRight, CalendarClock, MapPin, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { FormattedEvent } from "../../../_dto/formatDashboardDto";
import { BeanDays } from "@/components/blocks/scheduler/BeanDays";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface EventDetailsProps {
  event: FormattedEvent;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[80vh]">
        <BeanDays />

        <Card className="bg-white shadow-sm mt-4">
          <CardContent className="p-4">
            <h3 className="text-3xl font-light tracking-tight mb-4">
              {event.title}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">
                    {format(event.time.startTime, "p")}
                  </span>
                  <span className="text-xs text-gray-500">Start</span>
                </div>
                <MoveRight className="h-6 w-6 text-blue-600" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">
                    {format(event.time.endTime, "p")}
                  </span>
                  <span className="text-xs text-gray-500">End</span>
                </div>
              </div>

              {event.subtitle && (
                <div className="pt-4">
                  <Separator />
                  <p className="text-xs text-gray-500 mt-4">Description</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {event.subtitle}
                  </p>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-2 pt-6">
                  <MapPin className="h-8 w-8 text-gray-600" />
                  <span className="text-2xl font-light">{event.location}</span>
                </div>
              )}

              {event.status && (
                <div className="mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      event.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : event.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : event.status === "needs_attention"
                            ? "bg-yellow-100 text-yellow-700"
                            : event.status === "forgotten"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {event.status.replace("_", " ")}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default EventDetails;
