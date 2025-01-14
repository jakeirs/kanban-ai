"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Calendar, MessageCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlDrawerTabsProps {
  invert?: boolean;
}

const tabs = [
  { value: "planner", icon: Calendar },
  { value: "search", icon: Search },
  { value: "brain-dump", icon: Brain },
  { value: "conversation", icon: MessageCircle },
];

export function ControlDrawerTabs({ invert = false }: ControlDrawerTabsProps) {
  return (
    <Tabs defaultValue="planner" className="w-full">
      <TabsList
        className={cn(
          "w-full h-full rounded-full grid grid-cols-4",
          invert
            ? "bg-white/10 text-white"
            : "bg-black text-white backdrop-blur-sm"
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "rounded-full data-[state=active]:shadow-none flex flex-col items-center justify-center gap-1",
              invert
                ? "data-[state=active]:bg-white data-[state=active]:text-black"
                : "data-[state=active]:bg-white data-[state=active]:text-black"
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span className="capitalize text-xs">
              {tab.value.replace("-", " ")}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
