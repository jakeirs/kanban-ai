"use client";

import React from "react";
import { format } from "date-fns";
import { api } from "@/convex/_generated/api";
import { DialogueBox } from "./layout/DialogueBox";
import { UserInputZone } from "./layout/UserInputZone/UserInputZone";
import { useChat } from "./hooks/useChat";
import { useQuery } from "convex/react";
import { convertToLocalTime } from "@/app/api/schedule/chat/tools/afterConfirmationTool/utils/convertTimeToLocalTime";
import { sortEvents } from "@/app/(pages)/mobile/scheduler/get/_utils/sortEvents";

export const ChatScreen: React.FC = () => {
  const eventsData = useQuery(
    api.tables.events.queries.getCurrentUserEvents.default
  );

  const userCalendarObject = eventsData
    ? convertToLocalTime(sortEvents(eventsData.currectEvents))
    : [];

  const chatMethods = useChat({
    api: "/api/search/chat",
    currentTime: format(new Date(), "EEE MMM dd yyyy HH:mm:ss xxx"),
    userCalendarObject,
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <DialogueBox {...chatMethods} />
      <UserInputZone {...chatMethods} />
    </div>
  );
};
