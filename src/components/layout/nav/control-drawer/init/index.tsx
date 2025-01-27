"use client";

import React from "react"
import { Wand2, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTitle } from "@/components/ui/sheet"
import { ControlDrawerTabs } from "@/components/ui/custom/tabs"
import { tabs } from "../props"
import { InputAiMessage } from "./InputAiMessage"

export const Init: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center my-6">
        <SheetTitle className="text-3xl">How can I help you?</SheetTitle>
      </div>
      <ControlDrawerTabs tabs={tabs} />

      <div className="space-y-4 mt-5">
        <InputAiMessage onMessageSubmit={(message) => console.log(message)} />
        <div className="flex justify-between px-2">
          <Button variant="ghost" size="sm">
            <Wand2 className="h-4 w-4 mr-2" />
            Process
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Clarify
          </Button>
          <Button variant="ghost" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Enhance
          </Button>
        </div>
      </div>
    </div>
  );
};
