"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ScheduleItemProps {
  time: string
  title: string
}

const Schedule: React.FC<{ items: ScheduleItemProps[] }> = ({ items }) => (
  <Card className="bg-blue-50">
    <CardContent className="p-4">
      <h2 className="font-medium mb-4">Today</h2>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="mb-4">
            <p className="text-sm text-gray-600">{item.time}</p>
            <p className="font-medium">{item.title}</p>
          </div>
          {index < items.length - 1 && <Separator className="mb-4 h-[2px]" />}
        </React.Fragment>
      ))}
    </CardContent>
  </Card>
)

export default Schedule
export type { ScheduleItemProps }
