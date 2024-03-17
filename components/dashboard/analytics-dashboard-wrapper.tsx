"use client";

import { useState } from "react";

import AnalyticsSelector from "./analytics-selector";
import AnalyticsDashboard from "./analytics-dashboard";
import { RetrieveDaysReturnType, analytics } from "@/util/analytics";
import { getAnalytics } from "@/actions/analytics";
import { useToast } from "../ui/use-toast";

function AnalyticsDashboardWrapper({
  namespaces,
  tracks,
  trackingDays,
}: {
  namespaces: string[];
  tracks: RetrieveDaysReturnType;
  trackingDays: number;
}) {
  const { toast } = useToast();
  const [_tracks, setTracks] = useState(tracks);
  async function onNamespaceChange(value: string) {
    try {
      const res = await getAnalytics({
        namespaceId: value,
        days: trackingDays,
      });
      setTracks(res);
    } catch (error) {
      toast({
        title: "Error while fetching analytics",
      });
    }
  }

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <AnalyticsSelector
        namespaces={namespaces}
        onNamespaceChange={onNamespaceChange}
      />
      <AnalyticsDashboard tracks={_tracks} trackingDays={trackingDays} />
    </>
  );
}

export default AnalyticsDashboardWrapper;
