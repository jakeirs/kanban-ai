"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { EventDetailsSheetContent } from "./EventDetailsSheetContent";

interface EventDetailsSheetProps {
  event: EventFromLLMGenUI;
}

export const EventDetails = ({ event }: EventDetailsSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <EventDetailsSheetContent event={event} />
    </Sheet>
  );
};
