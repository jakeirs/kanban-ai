"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Trash } from "lucide-react";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { BaseDateCard } from "../_base";
import { EventDetails } from "./EventDetails";

interface EventToAddDateCardProps {
  event: EventFromLLMGenUI;
}

export const EventToAddDateCard = ({ event }: EventToAddDateCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-2">
        <EventDetails event={event} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Trash className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </Sheet>
      </div>
      <BaseDateCard event={event} />
    </div>
  );
};
