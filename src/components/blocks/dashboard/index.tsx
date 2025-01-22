"use client";

import React from "react";
import Top from "./Top";
import Mid from "./Mid";
import Bottom from "./Bottom";
import type { FormattedDashboardDto } from "./_dto/formatDashboardDto";

const Dashboard: React.FC<FormattedDashboardDto> = ({
  events,
  notes,
  projects,
}) => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <Top name={"Hi Marcin!"} />
      <div className="space-y-6">
        <Mid projects={projects} />
        <Bottom events={events} notes={notes} />
      </div>
    </div>
  );
};

export default Dashboard;
