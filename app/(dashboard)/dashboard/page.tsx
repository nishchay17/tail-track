import { analytics } from "@/util/analytics";

import "@/config/mock";
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard";

export const metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  // await generateApiKey("some");
  const TRACKING_DAYS = 7;
  const tracks = await analytics.retrieveDays("test", TRACKING_DAYS);
  return <AnalyticsDashboard tracks={tracks} trackingDays={TRACKING_DAYS} />;
}
