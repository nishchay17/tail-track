import { NavBar } from "@/components/nav/dashboard-nav";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <>
      <NavBar user={{}} items={[]} />
      <div className="px-4 grid flex-1 gap-12 md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] mt-8">
        <Skeleton className="w-full h-[300px] rounded" />
        <Skeleton className="w-full h-[300px] rounded" />
      </div>
    </>
  );
}

export default Loading;
