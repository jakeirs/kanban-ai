"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddEventCard } from "@/components/ui/dialogue-ui/calendar/add/AddEventCard"
import { useFilterBar } from "./hooks"

export const FilterBar = () => {
  const {
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
    isLoading
  } = useFilterBar()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Filter by Project"
          />
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by Location"
          />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Filter by Title"
          />
        </div>
        <div className="flex justify-end">
        <Button 
          onClick={handleSearch}
          disabled={isLoading}
        >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {formattedEvents && (
        <div className="space-y-4">
          {formattedEvents.map((event) => (
            <AddEventCard key={event.id} event={event} />
          ))}
          {formattedEvents.length === 0 && (
            <p className="text-center text-gray-500">No events found</p>
          )}
        </div>
      )}
    </div>
  )
}
