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
  const tracks = await analytics.retrieveDays(
    "59cbe83c-f547-48a9-b820-b6d7d743f94f",
    "test",
    TRACKING_DAYS
  );
  return <AnalyticsDashboard tracks={tracks} trackingDays={TRACKING_DAYS} />;
}
