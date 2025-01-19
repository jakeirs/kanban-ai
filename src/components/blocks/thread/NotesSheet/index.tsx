"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NoteTile } from "./NoteTile";
import { noteTile } from "./props";

interface NoteSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotesSheet({ isOpen, onClose }: NoteSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[280px] p-0 overflow-auto">
        <div className="flex flex-col py-4">
          <div className="px-4 mb-4">
            <h2 className=" text-lg font-medium">All Notes</h2>
            <p className="text-sm text-muted-foreground">In Project Work</p>
            <p className="text-sm text-muted-foreground">
              We can devide them by dates
            </p>
            <p className="text-sm text-white bg-black p-2 rounded-lg">
              We can signilize with small circle if note is linked with: Task or
              other note
            </p>
          </div>

          <div className="px-4 mb-4">
            <Button
              variant="default"
              className="w-full bg-black hover:bg-black/90 rounded-md flex items-center gap-2"
            >
              <Plus className="h-5 w-5 text-white" />
              <span className="text-white">Create a Note</span>
            </Button>
          </div>
          <p className="p-2 text-lg text-muted-foreground">Latest</p>
          <div className="grid grid-cols-2 gap-2 px-2 pr-4">
            {noteTile.map((item) => (
              <NoteTile
                key={item.id}
                title={item.label}
                icon={item.icon}
                description={item.description}
                onClick={() => {}}
                iconColor={item.iconColor}
              />
            ))}
          </div>
          <p className="p-2 mt-10 text-lg text-muted-foreground">
            More than 15 days ago
          </p>
          <div className="grid grid-cols-2 gap-2 px-2 pr-4">
            {noteTile.map((item) => (
              <NoteTile
                key={item.id}
                title={item.label}
                icon={item.icon}
                description={item.description}
                onClick={() => {}}
                iconColor={item.iconColor}
              />
            ))}
          </div>
          <p className="p-2 mt-10 text-lg text-muted-foreground">Archived</p>
          <div className="grid grid-cols-2 gap-2 px-2 pr-4">
            {noteTile.map((item) => (
              <NoteTile
                key={item.id}
                title={item.label}
                icon={item.icon}
                description={item.description}
                onClick={() => {}}
                iconColor={item.iconColor}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
