"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Video, CircleDot, ChevronRight, ListTodo, Loader } from "lucide-react";
import Link from "next/link";

// Types
interface ActiveSessionProps {
  title: string;
  duration: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface ScheduleItemProps {
  time: string;
  title: string;
}

interface DashboardProps {
  name: string;
  activeSessions: {
    title: string;
    duration: string;
    type: "video" | "info";
  }[];
  scheduleItems: ScheduleItemProps[];
}

// Active Session Item Component
const ActiveSessionItem: React.FC<ActiveSessionProps> = ({
  title,
  duration,
  icon,
  onClick,
}) => (
  <div
    className="cursor-pointer hover:rounded-3xl rounded-3xl hover:bg-gray-900 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400">Starting: since {duration}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

// Active Sessions Container Component
const ActiveSessions: React.FC<{
  sessions: DashboardProps["activeSessions"];
}> = ({ sessions }) => (
  <Card className="bg-black text-white rounded-3xl">
    <CardContent className="p-0">
      {sessions.map((session, index) => (
        <React.Fragment key={index}>
          <Link href="/mobile/thread">
            <ActiveSessionItem
              title={session.title}
              duration={session.duration}
              icon={
                session.type === "video" ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <CircleDot className="w-5 h-5" />
                )
              }
              onClick={() =>
                console.log(`Navigating to session: ${session.title}`)
              }
            />
            {index < sessions.length - 1 && (
              <div className="px-4">
                <Separator className="bg-gray-800" />
              </div>
            )}
          </Link>
        </React.Fragment>
      ))}
    </CardContent>
  </Card>
);

// Schedule Component
const Schedule: React.FC<{ items: ScheduleItemProps[] }> = ({ items }) => (
  <Card className="bg-blue-50">
    <CardContent className="p-4">
      <h2 className="font-medium mb-4">Today</h2>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="mb-4">
            <p className="text-sm text-gray-600">{item.time}</p>
            <p className="font-medium">{item.title}</p>
          </div>
          {index < items.length - 1 && <Separator className="mb-4 h-[2px]" />}
        </React.Fragment>
      ))}
    </CardContent>
  </Card>
);

// Quick Access Cards
const QuickAccessCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  onClick?: () => void;
}> = ({ title, icon, bgColor, onClick }) => (
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
);

// Main Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({
  name,
  activeSessions,
  scheduleItems,
}) => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-4xl font-light mb-8">
        Hello,
        <br />
        <span className="font-medium">{name}</span>
      </h1>

      <div className="space-y-6">
        {/* Active Sessions */}
        <ActiveSessions sessions={activeSessions} />

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Schedule items={scheduleItems} />
          </div>
          <div className="col-span-1 space-y-4">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
