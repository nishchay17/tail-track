import { cn } from "@/lib/utils";
import DashboardGraph from "./dashboard-graph";

function AnalyticsGraphCard({
  custom,
  name,
  points,
  lines,
  count,
}: {
  custom?: boolean;
  name: string;
  points: any;
  lines: string[];
  count: number;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 w-full aspect-[2/1] border-white/30 px-9 py-6 pl-1",
        custom ? "border-violet-500" : ""
      )}
    >
      <p className="text-2xl capitalize mb-9 pl-7">
        {name}: <span className="font-semibold">{count.toLocaleString()}</span>
      </p>
      <DashboardGraph className="text-left" chartData={points} lines={lines} />
    </div>
  );
}

export default AnalyticsGraphCard;
