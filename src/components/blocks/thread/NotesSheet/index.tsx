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

interface MenuItem {
  icon: React.ReactNode;
  label: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <User2 className="w-5 h-5" />,
    label: "View profile",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Track disease",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "Go doctors",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Appointment",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Learning",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Quiz",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Messages",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    label: "FAQ",
  },
  {
    icon: <User2 className="w-5 h-5" />,
    label: "View profile",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Track disease",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "Go doctors",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Appointment",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Learning",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Quiz",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Messages",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    label: "FAQ",
  },
  {
    icon: <User2 className="w-5 h-5" />,
    label: "View profile",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Track disease",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "Go doctors",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Appointment",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Learning",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Quiz",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Messages",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    label: "FAQ",
  },
  {
    icon: <User2 className="w-5 h-5" />,
    label: "View profile",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    label: "Track disease",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "Go doctors",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Appointment",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Learning",
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    label: "Quiz",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Messages",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    label: "FAQ",
  },
];

export function NotesSheet({ isOpen, onClose }: MenuSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[280px] p-0 overflow-auto">
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

          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
                onClick={onClose}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
