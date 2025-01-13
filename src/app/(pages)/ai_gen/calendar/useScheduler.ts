import { format } from "date-fns"
import { useCallback, useMemo } from "react"
import { SchedulerDay, SchedulerTask, UseSchedulerReturn } from "./types"

const MOCK_TASKS: SchedulerTask[] = [
  {
    id: "1",
    time: "09:30 AM",
    title: "Website design",
    description: "Website design with responsive layout",
    type: "task",
    participants: ["1", "2", "3", "4"]
  },
  {
    id: "2",
    time: "10:30 AM",
    title: "Mobile wireframing",
    description: "Creating mobile app wireframes",
    type: "task",
    participants: ["1", "2", "3"]
  },
  {
    id: "3",
    time: "12:00 PM",
    title: "Meeting with client",
    description: "Project review and feedback",
    type: "meeting",
    participants: ["1", "2"]
  },
  {
    id: "4",
    time: "01:30 PM",
    title: "Finance Dashboard",
    description: "Working on finance dashboard features",
    type: "task",
    participants: ["1", "2", "3", "4", "5"]
  }
]

export const useScheduler = (): UseSchedulerReturn => {
  const currentDay: SchedulerDay = useMemo(() => ({
    date: format(new Date(), "MM/dd/yyyy"),
    tasks: MOCK_TASKS
  }), [])

  const tasks = useMemo(() => MOCK_TASKS, [])

  return {
    currentDay,
    tasks
  }
}
