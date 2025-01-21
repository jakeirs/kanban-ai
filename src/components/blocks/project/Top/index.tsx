"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Clock, UserCircle2, Activity, Sprout } from "lucide-react";
import { HoursBadge } from "./Tags";

interface TopProps {
  username?: string;
  handle?: string;
  description?: string;
  posts?: number;
  contributions?: number;
}

export function Top({
  username = "Username",
  handle = "@handle",
  description = "No description provided",
  posts = 0,
  contributions = 0,
}: TopProps) {
  return (
    <Card className="rounded-t-none rounded-bl-full  p-4 pb-10 bg-yellow-300">
      <h1 className="text-5xl font-bold mt-4 mb-4 text-black font-semibold tracking-tighter ">
        Project: Work
      </h1>
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="h-32 w-32 rounded-full bg-yellow-100 flex items-center justify-center">
            <div className="border-8 border-white rounded-full p-1 w-full h-full flex items-center justify-center">
              <UserCircle2 className="w-20 h-20 text-yellow-900" />
            </div>
          </div>
        </div>
        <div className="pl-2 flex flex-col relative top-12">
          <div className="flex gap-2">
            {/* <HoursBadge icon={Activity}> Last Active 3 days ago</HoursBadge> */}
            <HoursBadge icon={Sprout} invert={true}>
              Building Momentum
            </HoursBadge>
          </div>

          <div className="bg-black/5 rounded-lg p-2 mt-3 mx-2 mb-4">
            <p className="text-sm text-black/80">
              You've been active here lately!
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-black/50" />
              <span className="text-xs text-black/50">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
