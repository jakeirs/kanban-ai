"use client"

import { DateBean } from "../DateBean"

interface Appointment {
  date: Date
  startTime: string
  endTime: string
}

interface DateBeanListProps {
  appointments: Appointment[]
  onTodoClick: (index: number) => void
  onDateClick: (index: number) => void
}

export const DateBeanList = ({
  appointments,
  onTodoClick,
  onDateClick,
}: DateBeanListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {appointments.map((appointment, index) => (
        <DateBean
          key={index}
          date={appointment.date}
          appointment={{
            startTime: appointment.startTime,
            endTime: appointment.endTime
          }}
          onTodoClick={() => onTodoClick(index)}
          onDateClick={() => onDateClick(index)}
        />
      ))}
    </div>
  )
}
