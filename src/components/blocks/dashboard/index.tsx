"use client"

import React from "react"
import Top from "./Top"
import Mid from "./Mid"
import Bottom from "./Bottom"

interface DashboardProps {
  name: string
  activeSessions: {
    title: string
    duration: string
    type: "video" | "info"
  }[]
  scheduleItems: {
    time: string
    title: string
  }[]
}

const Dashboard: React.FC<DashboardProps> = ({
  name,
  activeSessions,
  scheduleItems,
}) => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <Top name={name} />
      <div className="space-y-6">
        <Mid activeSessions={activeSessions} />
        <Bottom scheduleItems={scheduleItems} />
      </div>
    </div>
  )
}

export default Dashboard
