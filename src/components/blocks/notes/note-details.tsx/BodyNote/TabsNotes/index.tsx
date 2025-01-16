"use client";

import { Markdown } from "@/components/blocks/kanban/KanbanContent/Markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabsNotesProps {
  description: string;
  onClick?: () => void;
  className?: string;
}

export function TabsNotes({ description }: TabsNotesProps) {
  return (
    <Tabs defaultValue="view" className="w-[400px]">
      <TabsList className="w-full h-full rounded-full grid grid-cols-2 bg-black text-white backdrop-blur-sm">
        <TabsTrigger
          value="view"
          className={cn(
            "rounded-full data-[state=active]:shadow-none flex flex-col items-center justify-center gap-1",
            "data-[state=active]:bg-white data-[state=active]:text-black"
          )}
        >
          <Eye className="w-5 h-5" />
          <span className="capitalize text-xs">View</span>
        </TabsTrigger>
        <TabsTrigger
          value="adjust"
          className={cn(
            "rounded-full data-[state=active]:shadow-none flex flex-col items-center justify-center gap-1",
            "data-[state=active]:bg-white data-[state=active]:text-black"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="capitalize text-xs">Adjust</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="view">
        <div className="space-y-4">
          <div className="mt-2 text-sm ">
            <Markdown content={description} className="text-white" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="adjust">
        <div className="space-y-4">
          <p className="text-sm text-white text-muted-foreground">
            We will help you adjust your notes...
            <br />
            <br />
            Use our template
            <br />
            <br />
            and additionally you can use your directions to help us
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
