import Link from "next/link";
import { Button } from "../ui/button";

function EmptyAnalytics() {
  return (
    <div className="flex flex-1 items-center justify-center mb-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no namespace to track
        </h3>
        <p className="text-muted-foreground">
          You can start head over to integrate section for added namspaces
        </p>
        <Button className="mt-4" asChild>
          <Link href={"/dashboard/integrate"}>Integrate</Link>
        </Button>
      </div>
    </div>
  );
}

export default EmptyAnalytics;
