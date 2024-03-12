// import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));

      if (!dbUser[0]) return token;

      token.name = dbUser[0].name ?? "";
      token.email = dbUser[0].email ?? "";
      token.picture = dbUser[0].image ?? "";

      return token;
    },
  },
};

export const { handlers, auth, signOut } = NextAuth(authConfig as any);
