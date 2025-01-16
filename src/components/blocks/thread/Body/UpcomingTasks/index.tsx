"use client";

import { Card } from "@/components/ui/card";

const tasks = [
  { id: 1, title: "Design Logo", completed: true },
  { id: 2, title: "Daily Meeting", completed: false },
  { id: 3, title: "Design Homepage", completed: false },
  { id: 4, title: "Design About Page", completed: false },
];

export default function UpcomingTasks() {
  return (
    <Card className="col-span-2 p-4 bg-zinc-950 text-white border border-zinc-800">
      <h3 className="text-xl mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 rounded-full border-2 ${task.completed ? "bg-green-500 border-green-500" : "border-zinc-600"}`}
            >
              {task.completed && (
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-white">{task.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
