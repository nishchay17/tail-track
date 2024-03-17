import { analytics } from "@/util/analytics";
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard";
import { getNamespaces } from "@/actions/namespace";

export const metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const TRACKING_DAYS = 7;
  const namespaces = await getNamespaces();
  if (namespaces.error) {
    return <p>{namespaces.message}</p>;
  }
  if (namespaces.data.length === 0) {
    return <p>No namespace found</p>;
  }
  const tracks = await analytics.retrieveDays(
    namespaces.data[0],
    TRACKING_DAYS
  );
  return (
    <AnalyticsDashboard
      tracks={tracks}
      trackingDays={TRACKING_DAYS}
      namespaces={namespaces.data}
    />
  );
}
