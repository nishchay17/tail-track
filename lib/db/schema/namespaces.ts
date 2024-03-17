import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { users } from ".";

export const namespace = pgTable(
  "namespace",
  {
    id: serial("pk").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    namespace: text("namespace").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      namespaceIdx: index("namespace_idx").on(table.namespace),
      userIdIdx: index("namespace_user_id_idx").on(table.userId),
    };
  }
);

export type NamespaceType = {
  id: string;
  userId: string;
  namespace: string;
  createdAt: Date;
};
