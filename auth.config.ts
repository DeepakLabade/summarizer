// auth.config.ts
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: { params: { prompt: "consent" } },
    }),
  ],

  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        // Works for both adapter & JWT
        session.user.id = user?.id ?? (token?.sub as string);
      }
      return session;
    },
  },
};
