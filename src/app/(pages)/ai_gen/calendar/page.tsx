"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useScheduler } from "./useScheduler"

export default function CalendarPage() {
  const { tasks } = useScheduler()

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4">
            <div className="w-24 flex-shrink-0">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {task.time}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 flex-grow">
              <div className="flex flex-col items-center h-full">
                <div className="w-3 h-3 rounded-full bg-primary" />
                {task.id !== tasks[tasks.length - 1].id && (
                  <Separator orientation="vertical" className="h-24 my-1" />
                )}
              </div>
              
              <Card className="flex-grow p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  {task.participants && (
                    <div className="flex -space-x-2">
                      {task.participants.map((participant) => (
                        <div
                          key={participant}
                          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs"
                        >
                          {participant}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
