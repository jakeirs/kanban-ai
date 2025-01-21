"use client"

import React from "react"
import Schedule, { ScheduleItemProps } from "./Schedule"
import Notes from "./Notes"

export interface BottomProps {
  scheduleItems: ScheduleItemProps[]
}

const Bottom: React.FC<BottomProps> = ({ scheduleItems }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <Schedule items={scheduleItems} />
      </div>
      <div className="col-span-1">
        <Notes />
      </div>
    </div>
  )
}

export default Bottom
