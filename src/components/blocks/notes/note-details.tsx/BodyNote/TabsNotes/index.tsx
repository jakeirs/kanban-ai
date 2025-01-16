"use client";

import { Markdown } from "@/components/blocks/kanban/KanbanContent/Markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNotesProps {
  description: string;
  onClick?: () => void;
  className?: string;
}

export function TabsNotes({ description }: TabsNotesProps) {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="">
        <div className="flex">
          <TabsTrigger value="account">View</TabsTrigger>
          <TabsTrigger value="password">Adjust</TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4">
          <div className="mt-2 text-sm ">
            <Markdown content={description} className="text-white" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">
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
