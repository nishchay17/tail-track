import { analytics } from "@/util/analytics";
import { getNamespaces } from "@/actions/namespace";
import AnalyticsDashboardWrapper from "@/components/dashboard/analytics-dashboard-wrapper";
import EmptyAnalytics from "@/components/dashboard/empty-analytics";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const TRACKING_DAYS = 7;
  const namespaces = await getNamespaces();
  if (namespaces.error) {
    return <p>{namespaces.message}</p>;
  }
  if (namespaces.data.length === 0) {
    return <EmptyAnalytics />;
  }
  const tracks = await analytics.retrieveDays(
    namespaces.data[0],
    TRACKING_DAYS
  );

  return (
    <AnalyticsDashboardWrapper
      namespaces={namespaces.data}
      tracks={tracks}
      trackingDays={TRACKING_DAYS}
    />
  );
}
