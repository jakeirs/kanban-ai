"use client";

import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";
import { BaseDateCard } from "../_base";

interface EventToAddDateCardProps {
  event: EventFromLLMGenUI & {
    project?: string;
  };
}

export const AddEventCard = ({ event }: EventToAddDateCardProps) => {
  return <BaseDateCard event={event} />;
};
