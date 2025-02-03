"use client";

import React from "react";
import { Init } from "./init";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface VoiceDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const VoiceDrawer: React.FC<VoiceDrawerProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {/* Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="h-[90%] overflow-y-auto rounded-t-3xl"
        >
          <div className="w-full h-full flex flex-col">
            <Tabs defaultValue="init" className="w-full h-full flex flex-col">
              <TabsList className="w-full">
                <TabsTrigger value="init" className="flex-1">
                  Init
                </TabsTrigger>
                <TabsTrigger value="processing" className="flex-1">
                  ... next step
                </TabsTrigger>
              </TabsList>

              <TabsContent value="init" className="flex-1">
                <Init />
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
