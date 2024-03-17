import { NextResponse } from "next/server";

import { RequestBody } from "@/lib/schema";
import { retry, verifyAPIToken } from "@/lib/utils";
import { validateAnalyticsBody } from "@/lib/validation";
import { analytics } from "@/util/analytics";
import { APIKeyType } from "@/lib/db/schema/api-key";
import { createNamespace, isNamespaceExists } from "@/actions/namespace";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiToken = request.headers.get("App-token");
  if (!apiToken) {
    return NextResponse.json(
      { error: true, message: "API token not present" },
      { status: 401 }
    );
  }
  let token!: APIKeyType[];
  try {
    token = await verifyAPIToken(apiToken);
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong" },
      { status: 500 }
    );
  }
  if (!token || token.length === 0) {
    return NextResponse.json(
      { error: true, message: "Invalid API token" },
      { status: 401 }
    );
  }
  let body: RequestBody;
  try {
    body = await validateAnalyticsBody(request);
  } catch (error) {
    return NextResponse.json(
      { error: true, message: (error as Error).message },
      { status: 400 }
    );
  }

  const exists = await isNamespaceExists(body.namespace, token[0].userId);
  if (!exists) {
    const namespace = await createNamespace(body.namespace, token[0].userId);
    if (namespace.error) {
      return NextResponse.json(
        { error: true, message: namespace.message },
        { status: 200 }
      );
    }
  }

  try {
    await retry(
      async () =>
        await analytics.track(token[0].userId, body.namespace, body.meta)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: true, message: "Something went wrong" },
      { status: 500 }
    );
  }
  return NextResponse.json({ error: false, message: "Successfully tracked" });
}
