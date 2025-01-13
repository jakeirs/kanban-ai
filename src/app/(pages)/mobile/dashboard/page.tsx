import Dashboard from "@/components/blocks/dashboard";
import { dashboardData } from "@/components/blocks/dashboard/props";

export default function Page() {
  return (
    <Dashboard
      name={dashboardData.name}
      activeSessions={dashboardData.activeSessions}
      scheduleItems={dashboardData.scheduleItems}
    />
  );
}
