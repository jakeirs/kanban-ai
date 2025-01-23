"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { FormattedNote } from "../../../_dto/formatDashboardDto";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Maximize2, Network } from "lucide-react";
import { format } from "date-fns";

interface NotesDetailsProps {
  note: FormattedNote;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const NotesDetails: React.FC<NotesDetailsProps> = ({
  note,
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[80vh]">
        <Card className="bg-white shadow-sm mt-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              {note.icon}
              <h3 className="text-3xl font-light tracking-tight">
                {note.title}
              </h3>
            </div>

            <div className="pt-8">
              <Separator />
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center text-center border-r-2 pr-2">
                  <BookOpen className="w-8 h-8 mb-2 text-gray-600" />
                  <span className="text-2xl font-semibold">Idea</span>
                  <span className="text-sm text-gray-500">Type</span>
                </div>

                <div className="flex flex-col items-center text-center border-r-2 pr-2">
                  <Maximize2 className="w-8 h-8 mb-2 text-gray-600" />
                  <span className="text-2xl font-semibold">3</span>
                  <span className="text-sm text-gray-500">connections</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <Network className="w-8 h-8 mb-2 text-gray-600" />
                  <span className="text-2xl font-semibold">
                    {format(note.createdAt!, "p")}
                  </span>
                  <span className="text-sm text-gray-500">created</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {note.shortDescription && (
                <div className="pt-4">
                  <Separator />
                  <p className="text-xs text-gray-500 mt-4">Description</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {note.shortDescription}
                  </p>
                </div>
              )}

              <div className="absolute right-8 bottom-8 opacity-30 transform scale-[4] rotate-12">
                {note.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default NotesDetails;
