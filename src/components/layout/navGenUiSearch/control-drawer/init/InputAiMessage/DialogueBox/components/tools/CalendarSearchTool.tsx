"use client"

import { Card } from "@/components/ui/card"
import { CalendarSearchResponse } from "@/app/api/search/chat/tools/calendarSearch/types"

interface CalendarSearchToolProps {
  args: CalendarSearchResponse
}

export const CalendarSearchTool = ({ args }: CalendarSearchToolProps) => {
  if (!("matches" in args)) return null

  return (
    <div className="my-2">
      <Card className="p-4 mb-4">
        <p className="text-sm text-muted-foreground">{args.searchSummary}</p>
      </Card>

      {args.matches.map((match, index) => (
        <Card key={index} className="p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium">Event ID: {match.eventId}</div>
            <div className="text-sm text-muted-foreground">
              Match Confidence: {Math.round(match.matchConfidence * 100)}%
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{match.reasoning}</p>
        </Card>
      ))}
    </div>
  )
}
