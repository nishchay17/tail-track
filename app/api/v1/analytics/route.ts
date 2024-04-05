import { NextFetchEvent, NextResponse } from "next/server";

import { RequestBody } from "@/lib/schema";
import { retry, verifyAPIToken } from "@/lib/utils";
import { validateAnalyticsBody } from "@/lib/validation";
import { analytics } from "@/util/analytics";
import { APIKeyType } from "@/lib/db/schema/api-key";
import { createNamespace, isNamespaceExists } from "@/actions/namespace";
import { getWebhooksByNamespace } from "@/actions/webhook";
import { webhookTypes } from "@/lib/db/schema/webhook";

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
  const sendWebhooks = async () => {
    const webhooks = await getWebhooksByNamespace(
      body.namespace,
      token[0].userId
    );
    if (webhooks.error) {
      return NextResponse.json(
        { error: true, message: webhooks.message },
        { status: 200 }
      );
    }
    if (webhooks.data.length === 0) {
      return;
    }
    await Promise.all(
      webhooks.data.map(async (wh) => {
        const headers = new Headers({
          "Content-Type": "application/json",
          "User-Agent": "tail-track/1.0",
        });
        if (wh.additionalHeaders) {
          for (const [k, v] of Object.entries(
            JSON.parse(wh.additionalHeaders) as Record<string, string>
          )) {
            headers.set(k, v);
          }
        }
        let webhookBody = "";
        switch (wh.type) {
          case webhookTypes.enumValues[0]:
            webhookBody = JSON.stringify({
              event: body.namespace,
              metadata: body.meta ?? {},
            });
            break;
          case webhookTypes.enumValues[1]:
            webhookBody = JSON.stringify({
              text: body.namespace,
              blocks: [
                {
                  type: "header",
                  text: {
                    type: "plain_text",
                    text: body.namespace,
                  },
                },
                {
                  type: "section",
                  fields: [
                    {
                      type: "mrkdwn",
                      text: `*Time:*\n${new Date(Date.now()).toISOString()}`,
                    },
                    {
                      type: "mrkdwn",
                      text: `*Metadata: *\n${JSON.stringify(body.meta ?? {})}`,
                    },
                  ],
                },
                {
                  type: "section",
                  fields: [
                    {
                      type: "mrkdwn",
                      text: `<https://tail-track.vercel.app/dashboard>`,
                    },
                  ],
                },
              ],
            });
            break;

          default:
            console.error(`Unknown webhook type: ${wh.type}`);
            return;
        }

        const res = await fetch(wh.url, {
          method: wh.method,
          headers,
          body: webhookBody,
        });
        if (!res.ok) {
          throw new Error(
            `Unable to send webhook to ${wh.url}: ${await res.text()}`
          );
        }
      })
    );
  };

  sendWebhooks().catch((err) => {
    console.error(err);
  });

  return NextResponse.json({ error: false, message: "Successfully tracked" });
}
