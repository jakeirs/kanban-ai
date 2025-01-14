"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  CalendarCheckIcon,
  ClipboardList,
  User,
  Search,
} from "lucide-react";
import { MicrophoneButton } from "./MicrophoneButton";

interface NavItem {
  icon: React.ReactNode;
  path: string;
}

const BottomNav = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-6 w-6" />,
      path: "/mobile/dashboard",
    },
    {
      icon: <CalendarCheckIcon className="h-6 w-6" />,
      path: "/mobile/scheduler",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      path: "/mobile/notes",
    },
    {
      icon: <Search className="h-6 w-6" />,
      path: "/mobile/search",
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 flex justify-center">
      <nav className="bg-black rounded-full px-6 py-3 flex justify-between items-center w-full max-w-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                relative p-2 rounded-full transition-all
                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-gray-200"
                }
              `}
            >
              {item.icon}

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-1 right-0 w-2 h-2 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
        <MicrophoneButton
          onClick={() => {}}
          classNames="-right-2 -bottom-10 absolute"
        />
      </nav>
    </div>
  );
};

export default BottomNav;
