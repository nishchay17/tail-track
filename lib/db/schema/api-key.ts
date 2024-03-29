import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from ".";

export const apiKey = pgTable(
  "api-key",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      tokenIdx: index("token_idx").on(table.token),
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  }
);

export type APIKeyType = {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
};
