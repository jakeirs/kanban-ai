"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { FormattedNote } from "../../_dto/formatDashboardDto";
import NotesDetails from "./NotesDetails";

const QuickAccessCard: React.FC<FormattedNote & { onClick: () => void }> = ({
  title,
  icon,
  color,
  shortDescription,
  onClick,
}) => (
  <Card
    className={`${color} cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
    onClick={onClick}
  >
    <CardContent className="p-4 flex items-center gap-2 relative">
      {icon}
      <span className="font-medium">{title}</span>
      <span className="text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap">
        {shortDescription}
      </span>
      <div className="absolute right-4 bottom-2 opacity-30 transform scale-[2.5] rotate-12">
        {icon}
      </div>
    </CardContent>
  </Card>
);

const Notes: React.FC<{ notes: FormattedNote[] }> = ({ notes }) => {
  const [selectedNote, setSelectedNote] = useState<FormattedNote | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {selectedNote && (
        <NotesDetails 
          note={selectedNote}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
      <div className="space-y-4">
        {notes.map((note) => (
          <QuickAccessCard 
            key={note.title} 
            {...note} 
            onClick={() => {
              setSelectedNote(note)
              setIsOpen(true)
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
