export interface SchedulerTask {
  id: string
  time: string
  title: string
  description: string
  participants?: string[]
  type?: "meeting" | "task" | "event"
}

export interface SchedulerDay {
  date: string
  tasks: SchedulerTask[]
}

export interface UseSchedulerReturn {
  currentDay: SchedulerDay
  tasks: SchedulerTask[]
}
