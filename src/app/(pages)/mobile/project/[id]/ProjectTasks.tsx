// app/project/[id]/(features)/details/components/ProjectTasks.tsx
import { useState } from 'react'
import { 
  CalendarCheck, 
  ChevronRight, 
  Clock, 
  Filter,
  Plus
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  type: 'daily' | 'project' | 'personal'
}

interface ProjectTasksProps {
  id: string
}

export function ProjectTasks({ id }: ProjectTasksProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Example tasks data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Review project timeline',
      dueDate: '2024-01-23',
      status: 'pending',
      priority: 'high',
      type: 'project'
    },
    {
      id: '2',
      title: 'Water the plants',
      dueDate: '2024-01-23',
      status: 'completed',
      priority: 'low',
      type: 'daily'
    },
    {
      id: '3',
      title: 'Read book chapter',
      dueDate: '2024-01-23',
      status: 'in-progress',
      priority: 'medium',
      type: 'personal'
    }
  ]

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50'
      case 'medium': return 'text-yellow-500 bg-yellow-50'
      case 'low': return 'text-green-500 bg-green-50'
    }
  }

  const getTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-700'
      case 'project': return 'bg-purple-100 text-purple-700'
      case 'personal': return 'bg-green-100 text-green-700'
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Tasks</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <Sheet key={task.id}>
              <SheetTrigger asChild>
                <div 
                  className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm 
                           active:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(task.type)}>
                          {task.type}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Due {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Task Details</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Task details content */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(task.type)}>{task.type}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarCheck className="h-4 w-4" />
                    <span>Due {task.dueDate}</span>
                  </div>
                  {/* Add more task details here */}
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}