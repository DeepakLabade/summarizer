export const runtime = "nodejs";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/utils/db";
import { authConfig } from "@/auth.config";

export const { GET, POST }: any = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  debug: true,
});
