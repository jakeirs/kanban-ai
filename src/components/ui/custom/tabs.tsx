"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  icon: React.ElementType;
}

interface ControlDrawerTabsProps {
  tabs: Tab[];
  defaultValue?: string;
}

export function ControlDrawerTabs({
  tabs,
  defaultValue = tabs[0]?.value,
}: ControlDrawerTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="w-full h-full rounded-full grid grid-cols-4 bg-black text-white backdrop-blur-sm">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "rounded-full data-[state=active]:shadow-none flex flex-col items-center justify-center gap-1",
              "data-[state=active]:bg-white data-[state=active]:text-black"
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
