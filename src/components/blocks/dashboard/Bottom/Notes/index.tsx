"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { FormattedNote } from "../../_dto/formatDashboardDto";

const QuickAccessCard: React.FC<FormattedNote> = ({
  title,
  icon,
  color,
  shortDescription,
}) => (
  <Card
    className={`${color} cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
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
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <QuickAccessCard {...note} />
      ))}
    </div>
  );
};

export default Notes;
