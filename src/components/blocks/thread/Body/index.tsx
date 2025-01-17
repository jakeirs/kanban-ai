"use client";

import { Card } from "@/components/ui/card";
import UpcomingTasks from "./UpcomingTasks";
import ThisWeekTasksCompleted from "./ThisWeekTasksCompleted";
import { Notes } from "./Notes";

export default function Body() {
  return (
    <div className="p-4">
      <h2 className="text-5xl font-semibold mb-4">Thread: Work</h2>
      <div className="grid grid-cols-3 gap-4">
        <UpcomingTasks />

        <ThisWeekTasksCompleted completedTasks={56} totalTasks={64} />
      </div>
      <Notes />
    </div>
  );
}
