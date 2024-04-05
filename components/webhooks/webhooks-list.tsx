import { WebhookGetType } from "@/lib/db/schema/webhook";
import WebhooksNodata from "./webhooks-nodata";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteWebhooks from "./delete-webhook";

function WebhooksList({ webhooks }: { webhooks: WebhookGetType[] }) {
  if (webhooks.length === 0) {
    return <WebhooksNodata />;
  }
  return (
    <div className="border border-white/30 p-4 rounded-lg bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Namespace</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>URL</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webhooks.map((it) => (
            <TableRow key={it.id}>
              <TableCell>{it.namespace}</TableCell>
              <TableCell>{it.type}</TableCell>
              <TableCell>{it.method}</TableCell>
              <TableCell>{it.url}</TableCell>
              <TableCell>
                <DeleteWebhooks id={it.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default WebhooksList;
