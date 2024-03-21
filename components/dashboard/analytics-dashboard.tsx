import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { RetrieveDaysReturnType } from "@/util/analytics";
import AnalyticsGraphCard from "./analytics-graph-card";

type dataPoint = {
  date: string;
  count: number;
  value?: string;
};

function AnalyticsDashboard({
  tracks,
  trackingDays,
}: {
  tracks: RetrieveDaysReturnType;
  trackingDays: number;
}) {
  const tracksByDate: dataPoint[] = tracks.reduce((acc: dataPoint[], curr) => {
    return [
      ...acc,
      {
        date: curr.date,
        count: curr.events.reduce((ac, cur) => {
          return ac + Object.values(cur)[0]!;
        }, 0),
      },
    ];
  }, []);
  const totalTracks = tracksByDate.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
  const avgTrackersPerDay = (totalTracks / trackingDays).toFixed(1);

  const [points, customGraphs, customGraphsCount] = useMemo(() => {
    const _customGraphs: Record<string, Set<string>> = {};
    const _customGraphsCount: Record<string, number> = {};
    const _points: Record<string, any>[] = [];
    tracks.forEach((it) => {
      let point: Record<string, string> = {
        date: it.date,
      };
      it.events.forEach((event) => {
        const key = Object.keys(event)[0];
        const parsedKey = JSON.parse(key);
        Object.keys(parsedKey).forEach((i) => {
          if (!_customGraphs[i]) _customGraphs[i] = new Set();
          _customGraphs[i].add(parsedKey[i]);
          if (!_customGraphsCount[i]) _customGraphsCount[i] = 0;
          _customGraphsCount[i] += event[key];
          point = {
            ...point,
            [parsedKey[i]]: event[key] + (point[parsedKey[i]] ?? 0),
          };
        });
      });
      _points.push(point);
    });
    return [_points, _customGraphs, _customGraphsCount];
  }, [tracks]);

  const cardData = Object.keys(customGraphs).map((it) => {
    return {
      name: it,
      lines: Array.from(customGraphs[it]),
      custom: true,
      count: customGraphsCount[it],
    };
  });
  const statsData = [
    {
      name: "Average Trackers Per Day",
      count: avgTrackersPerDay,
      custom: false,
    },
  ];

  return (
    <>
      <section className="pb-10">
        <div className="flex gap-4">
          {statsData.map((it) => (
            <div
              key={it.name}
              className={cn(
                "rounded-lg border-2 min-w-[200px] border-white/30 px-9 py-5",
                it.custom ? "border-violet-500" : ""
              )}
            >
              <p className="text-lg mb-2 capitalize">{it.name}</p>
              <p className="text-4xl font-semibold">{it.count}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-10">
        <div className="mt-4 grid grid-cols-2 gap-4">
          <AnalyticsGraphCard
            lines={["count"]}
            points={tracksByDate}
            name="Total Trackers"
            custom={false}
            count={totalTracks}
          />
          {cardData.map((it) => (
            <AnalyticsGraphCard key={it.name} {...it} points={points} />
          ))}
        </div>
      </section>
    </>
  );
}

export default AnalyticsDashboard;
