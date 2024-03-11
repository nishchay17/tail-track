import { RequestBody } from "@/lib/schema";
import { retry } from "@/lib/utils";
import { validateAnalyticsBody } from "@/lib/validation";
import { analytics } from "@/util/analytics";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = await validateAnalyticsBody(request);
  } catch (error) {
    return Response.json(
      { error: true, message: (error as Error).message },
      { status: 400 }
    );
  }
  try {
    await retry(async () => await analytics.track(body.namespace, body.meta));
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: true, message: "Something went wrong" },
      { status: 500 }
    );
  }
  return Response.json({ error: false, message: "Successfully tracked" });
}
