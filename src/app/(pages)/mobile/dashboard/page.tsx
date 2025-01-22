"use client";

import Dashboard from "@/components/blocks/dashboard";
import { dashboardData } from "@/components/blocks/dashboard/props";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Page() {
  const dashboardDatas = useQuery(
    api.tables.projects.query.getForDashboard.default
  );

  console.log("dashboardDatas", dashboardDatas);

  // show events for today
  // if not events for today -> show upcoming

  return (
    <Dashboard
      name={dashboardData.name}
      activeSessions={dashboardData.activeSessions}
      scheduleItems={dashboardData.scheduleItems}
    />
  );
}
