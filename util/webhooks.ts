import { getWebhooksByNamespace } from "@/actions/webhook";
import { webhookTypes } from "@/lib/db/schema/webhook";

export async function sendWebhooks(
  namespace: string,
  userId: string,
  meta: any
) {
  const webhooks = await getWebhooksByNamespace(namespace, userId);
  if (webhooks.error || webhooks.data.length === 0) return;
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
            event: namespace,
            metadata: meta ?? {},
          });
          break;
        case webhookTypes.enumValues[1]:
          webhookBody = JSON.stringify({
            text: namespace,
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: namespace,
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
                    text: `*Metadata: *\n${JSON.stringify(meta ?? {})}`,
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
}
