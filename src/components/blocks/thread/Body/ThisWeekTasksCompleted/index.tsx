"use client"

import { Card } from "@/components/ui/card"

interface ThisWeekTasksCompletedProps {
  completedTasks: number
  totalTasks: number
}

export default function ThisWeekTasksCompleted({ completedTasks, totalTasks }: ThisWeekTasksCompletedProps) {
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <Card className="p-4 bg-zinc-950 text-white border border-zinc-800">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-green-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-500 rounded-full border-r-transparent rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">{completionPercentage}%</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="font-semibold">Completed</div>
          <div className="text-lg">{completedTasks}/{totalTasks} Task</div>
        </div>
      </div>
    </Card>
  )
}
