"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Activity,
  Calendar,
  FileQuestion,
  MessageSquare,
  ScrollText,
  Stethoscope,
  User2,
} from "lucide-react";

interface MenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NoteTile {
  icon: React.ReactNode;
  title: string;
  description: string;
  subtext: string;
}

const noteTiles: NoteTile[] = [
  {
    icon: <ScrollText className="w-6 h-6 text-blue-500" />,
    title: "Daily Notes",
    description: "Track your daily thoughts and ideas",
    subtext: "Last updated 2 hours ago",
  },
  {
    icon: <Activity className="w-6 h-6 text-green-500" />,
    title: "Project Tasks",
    description: "Manage your ongoing projects",
    subtext: "5 tasks pending",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
    title: "Meeting Notes",
    description: "Keep track of important discussions",
    subtext: "Next meeting in 3 days",
  },
  {
    icon: <Calendar className="w-6 h-6 text-orange-500" />,
    title: "Schedule",
    description: "Plan your upcoming activities",
    subtext: "2 events today",
  },
];

export function MenuSheet({ isOpen, onClose }: MenuSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="flex flex-col py-4">
          <div className="px-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
              <img
                src="https://placekitten.com/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-center text-lg font-medium">Bradon Lee</h2>
            <p className="text-center text-sm text-muted-foreground">
              View profile
            </p>
          </div>

          <div className="flex flex-col gap-3 px-4">
            {noteTiles.map((tile, index) => (
              <div></div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
