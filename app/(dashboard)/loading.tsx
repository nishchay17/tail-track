import { NavBar } from "@/components/nav/dashboard-nav";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="container">
      <NavBar user={{}} items={[]} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] mt-8">
        <Skeleton className="w-full h-[300px] rounded" />
        <Skeleton className="w-full h-[300px] rounded" />
      </div>
    </div>
  );
}

export default Loading;
