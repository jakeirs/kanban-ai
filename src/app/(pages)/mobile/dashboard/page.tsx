"use client";

import Dashboard from "@/components/blocks/dashboard";
import { formatDates } from "@/components/blocks/dashboard/dto/formatDates";
import { dashboardData } from "@/components/blocks/dashboard/props";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import * as dateFNS from "date-fns";
import * as dateFNSLocale from "date-fns/locale";

(window as any).dateFns = dateFNS;
(window as any).dateFNSLocale = dateFNSLocale;

export default function Page() {
  const dashboardDatas = useQuery(
    api.tables.projects.query.getForDashboard.default
  );

  const dashboardDataFormatted = formatDates(dashboardDatas);

  return (
    <Dashboard
      name={dashboardData.name}
      activeSessions={dashboardData.activeSessions}
      scheduleItems={dashboardData.scheduleItems}
    />
  );
}
