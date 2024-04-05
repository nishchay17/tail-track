import { getWebhooks } from "@/actions/webhook";
import AddWebhooks from "@/components/webhooks/add-webhooks";
import WebhooksList from "@/components/webhooks/webhooks-list";

async function WebhooksPage() {
  const webhooks = await getWebhooks();
  return (
    <section className="pb-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-semibold ">Webhooks</h2>
          <p className="text-muted-foreground mt-2">
            Sent events to your webhook
          </p>
        </div>
        <AddWebhooks />
      </div>
      {webhooks.error ? (
        <p>{webhooks.message}</p>
      ) : (
        <WebhooksList webhooks={webhooks.data} />
      )}
    </section>
  );
}

export default WebhooksPage;
