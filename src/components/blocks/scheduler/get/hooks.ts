import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { formatEvent } from "@/components/ui/dialogue-ui/calendar/_base/utils/formatEvents";
import type { EventFromLLMGenUI } from "@/app/api/schedule/chat/tools/calendarTool/types";

export const useFilterBar = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [project, setProject] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useQuery(
    api.tables.events.experimental.search.searchEventsByDateRange,
    isSearching
      ? {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(project && { project }),
          ...(location && { location }),
          ...(title && { title }),
        }
      : "skip"
  );

  const handleSearch = () => {
    setIsSearching(true);
  };

  const formattedEvents = searchResults?.events?.map((event) => {
    // First format the event for display formatting
    const formatted = formatEvent(event);

    // Then adapt it to match EventFromLLMGenUI type
    const adaptedEvent: EventFromLLMGenUI & { project?: string } = {
      id: event.id,
      title: event.title,
      description: event.description || "",
      updatedAt: new Date(event.time.startTime).toUTCString(),
      project: event.project,
      time: {
        startTime: new Date(event.time.startTime).toUTCString(),
        endTime: new Date(event.time.endTime).toUTCString(),
      },
    };

    return adaptedEvent;
  });

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    project,
    setProject,
    location,
    setLocation,
    title,
    setTitle,
    handleSearch,
    formattedEvents,
    isLoading: searchResults === undefined && isSearching,
  };
};
