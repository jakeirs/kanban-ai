"use client";

import Dashboard from "@/components/blocks/dashboard";
import { formatDates } from "@/components/blocks/dashboard/_dto/formatDashboardDto";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Page() {
  const dashboardDatas = useQuery(
    api.tables.projects.query.getForDashboard.default
  );

  const dashboardDataFormatted = formatDates(dashboardDatas);

  if (!dashboardDatas) {
    return <div>... Loading</div>;
  }

  return <Dashboard {...dashboardDataFormatted} />;
}
