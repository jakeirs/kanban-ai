"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Trash } from "lucide-react";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { BaseDateCard } from "../_base";

interface EventToAddDateCardProps {
  event: EventFromLLMGenUI;
}

export const AddEventCard = ({ event }: EventToAddDateCardProps) => {
  return <BaseDateCard event={event} />;
};
