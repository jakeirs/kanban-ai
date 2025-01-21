"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ListTodo, Loader } from "lucide-react"

interface QuickAccessCardProps {
  title: string
  icon: React.ReactNode
  bgColor: string
  onClick?: () => void
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, icon, bgColor, onClick }) => (
  <Card
    className={`${bgColor} cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
    onClick={onClick}
  >
    <CardContent className="p-4 flex items-center gap-2 relative">
      {icon}
      <span className="font-medium">{title}</span>
      <div className="absolute right-4 bottom-2 opacity-10 transform scale-[2.5] rotate-12">
        {icon}
      </div>
    </CardContent>
  </Card>
)

const Notes: React.FC = () => {
  return (
    <div className="space-y-4">
      <QuickAccessCard
        title="To Do list"
        icon={<ListTodo className="w-5 h-5" />}
        bgColor="bg-purple-100"
        onClick={() => console.log("Navigate to Todo list")}
      />
      <QuickAccessCard
        title="In progress"
        icon={<Loader className="w-5 h-5" />}
        bgColor="bg-blue-100"
        onClick={() => console.log("Navigate to In Progress")}
      />
    </div>
  )
}

export default Notes
