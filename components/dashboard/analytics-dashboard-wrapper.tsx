"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AnalyticsSelector from "./analytics-selector";
import AnalyticsDashboard from "./analytics-dashboard";
import { RetrieveDaysReturnType } from "@/util/analytics";
import { getAnalytics } from "@/actions/analytics";
import { useToast } from "../ui/use-toast";
import { getNamespaces } from "@/actions/namespace";

function AnalyticsDashboardWrapper({
  namespaces,
  tracks,
  trackingDays,
}: {
  namespaces: string[];
  tracks: RetrieveDaysReturnType;
  trackingDays: number;
}) {
  const [selectedNamespace, setSelectedNamespace] = useState(namespaces[0]);
  const { toast } = useToast();

  const namespaceQuery = useQuery({
    queryKey: ["namespace"],
    queryFn: async () => {
      const ns = await getNamespaces();
      if (ns.error) {
        return [];
      }
      return ns.data;
    },
    refetchOnWindowFocus: false,
    initialData: namespaces,
    staleTime: 10_000,
  });

  const trackQuery = useQuery({
    queryKey: ["tracks", selectedNamespace],
    queryFn: async (ctx) => {
      return await getAnalytics({
        namespaceId: ctx.queryKey[1],
        days: trackingDays,
      });
    },
    refetchOnWindowFocus: false,
    initialData: tracks,
    enabled: !!namespaceQuery.data,
  });

  if (trackQuery.error) {
    toast({
      title: "Error while fetching analytics",
    });
  }

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <AnalyticsSelector
        refetching={trackQuery.isRefetching}
        onRefetch={() => trackQuery.refetch()}
        namespaces={namespaceQuery.data}
        onNamespaceChange={(value: string) => setSelectedNamespace(value)}
      />
      <AnalyticsDashboard
        tracks={trackQuery.data}
        trackingDays={trackingDays}
      />
    </>
  );
}

export default AnalyticsDashboardWrapper;
