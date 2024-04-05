import { createNamespace, isNamespaceExists } from "@/actions/namespace";
import { inngest } from "./client";
import { retry } from "../utils";
import { analytics } from "@/util/analytics";
import { sendWebhooks } from "@/util/webhooks";

export const trackEvent = inngest.createFunction(
  { id: "track-event" },
  { event: "tail-track/track" },
  async ({ event }) => {
    const body = event.data;
    const exists = await isNamespaceExists(body.namespace, body.userId);
    if (!exists) {
      await createNamespace(body.namespace, body.userId);
    }

    await retry(
      async () => await analytics.track(body.userId, body.namespace, body.meta)
    );

    await sendWebhooks(body.namespace, body.userId, body.meta).catch((err) => {
      console.error(err);
    });
  }
);
