"use client";

import React from "react";
import { SheetTitle } from "@/components/ui/sheet";
import { InputAiMessage } from "./InputAiMessage";

export const Init: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <SheetTitle className="text-3xl">How can I help you?</SheetTitle>
        </div>
      </div>
      <div className="mt-auto pb-6">
        <InputAiMessage onMessageSubmit={(message) => console.log(message)} />
      </div>
    </div>
  );
};
