import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, LineChart, MoreVertical } from 'lucide-react'

interface TaskCardProps {
  status: "ongoing" | "future"
  title: string
  createdBy: {
    name: string
    image: string
  }
  variant?: "purple" | "light" | "dark"
  iconUrl?: string
}

export default function TaskCard({
  status,
  title,
  createdBy,
  variant = "light",
  iconUrl,
}: TaskCardProps) {
  const variants = {
    purple: "bg-purple-500 text-white",
    light: "bg-gray-100",
    dark: "bg-gray-900 text-white",
  }

  return (
    <Card className={`relative overflow-hidden w-full max-w-md ${variants[variant]}`}>
      <div className="p-4 pb-6">
        {/* Top section with status and chart */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Badge
            variant="outline"
            className={`
              flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
              ${variant === "light" ? "bg-white" : "bg-opacity-20 backdrop-blur-sm"}
            `}
          >
            <Clock className="w-4 h-4" />
            {status === "ongoing" ? "Ongoing" : "Future"}
          </Badge>
          <div className={`rounded-full p-2 ${
            variant === "light" ? "bg-gray-200" : "bg-white/10"
          }`}>
            <LineChart className="w-4 h-4" />
          </div>
        </div>

        {/* Task content */}
        <div className="flex items-center gap-4">
          {iconUrl ? (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={iconUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl font-semibold">{title.charAt(0)}</span>
            </div>
          )}
          <h3 className="text-lg font-semibold flex-1">{title}</h3>
        </div>

        {/* Created by section with wave effect */}
        <div className="absolute top-0 right-0 h-16 flex items-center">
          <div
            className="h-full relative flex items-center pr-3 pl-8 
            before:absolute before:inset-0 before:bg-gray-100 before:rounded-l-full"
          >
            <div className="relative flex items-center gap-2">
              <span className="text-gray-600 text-sm">Created by {createdBy.name}</span>
              <Avatar className="w-8 h-8">
                <AvatarImage src={createdBy.image} />
                <AvatarFallback>{createdBy.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-gray-400 text-lg font-medium">+</span>
            </div>
          </div>
          <button className="p-2">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

