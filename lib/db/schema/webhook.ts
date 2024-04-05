import {
  index,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { namespace, users } from ".";

export const webhookTypes = pgEnum("webhook_types", ["HTTP", "slack"]);

export const webhook = pgTable(
  "webhook",
  {
    id: serial("pk").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    namespace: text("namespace")
      .notNull()
      .references(() => namespace.namespace, { onDelete: "cascade" }),
    type: webhookTypes("webhook_types").notNull(),
    url: text("url").notNull(),
    method: text("method").notNull().default("POST"),
    additionalHeaders: text("headers"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("webhook_user_id_idx").on(table.userId),
      namespaceIdx: index("webhook_namespace_idx").on(table.namespace),
    };
  }
);

export type WebhookGetType = {
  id: number;
  type: "HTTP" | "slack";
  namespace: string;
  url: string;
  additionalHeaders: string | null;
  method: string;
};

export type WebhookCreateType = {
  type: "HTTP" | "slack";
  namespace: string;
  url: string;
  additionalHeaders: string | null;
  method: string;
};
