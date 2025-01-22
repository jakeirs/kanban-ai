"use client";

import React from "react";
import Schedule from "./Schedule";
import Notes from "./Notes";
import type { FormattedEvent, FormattedNote } from "../_dto/formatDashboardDto";

const Bottom: React.FC<{
  events: FormattedEvent[];
  notes: FormattedNote[];
}> = ({ events, notes }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <Schedule events={events} />
      </div>
      <div className="col-span-1">
        <Notes notes={notes} />
      </div>
    </div>
  );
};

export default Bottom;
