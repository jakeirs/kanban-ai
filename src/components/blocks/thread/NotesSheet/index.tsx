"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
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
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
              <img
                src="https://placekitten.com/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-center text-lg font-medium">Bradon Lee</h2>
            <p className="text-center text-sm text-muted-foreground">
              View profile
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 px-2 pr-4">
            {noteTile.map((item) => (
              <NoteTile
                key={item.id}
                title={item.label}
                icon={item.icon}
                description={item.description}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
