import { cn } from "@/lib/utils";
import { RetrieveDaysReturnType } from "@/util/analytics";
import DashboardGraph from "./dashboard-graph";

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

  const metaData: Record<string, dataPoint[]> = {};
  for (let i = 0; i < tracks.length; i++) {
    const day = tracks[i];
    if (!day) continue;
    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j];
      if (!event) continue;
      const key = Object.keys(event)[0]!;
      const count = Object.values(event)[0]!;

      const parsedKey = JSON.parse(key);
      Object.keys(parsedKey).forEach((key) => {
        metaData[key] = metaData[key] ?? [];
        metaData[key].push({ date: day.date, count, value: parsedKey[key] });
      });
    }
  }
  Object.keys(metaData).map((key) => {
    metaData[key] = metaData[key].reduce((acc: dataPoint[], curr) => {
      const duplicate = acc.findIndex(
        (it) => it.date === curr.date && it.value === curr.value
      );
      if (duplicate === -1) {
        return [...acc, curr];
      }
      acc[duplicate].count += curr.count;
      return acc;
    }, []);
  });

  const cardData = [
    {
      name: "Total Trackers",
      count: totalTracks,
      custom: false,
      data: tracksByDate,
    },
    ...Object.keys(metaData).map((key) => {
      return {
        name: key,
        count: metaData[key].reduce((acc, curr) => acc + curr.count, 0),
        custom: true,
        data: metaData[key],
      };
    }),
  ];
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
          {cardData.map((it) => (
            <div
              key={it.name}
              className={cn(
                "rounded-lg border-2 w-full aspect-[2/1] border-white/30 px-9 py-6 pl-1",
                it.custom ? "border-violet-500" : ""
              )}
            >
              <p className="text-2xl capitalize mb-9 pl-7">
                {it.name}:{" "}
                <span className="font-semibold">
                  {it.count.toLocaleString()}
                </span>
              </p>
              <DashboardGraph
                className="text-left"
                chartData={it.data.map((it) => ({
                  date: it.date,
                  count: it.count,
                }))}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AnalyticsDashboard;
