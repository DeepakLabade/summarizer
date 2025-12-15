"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    userId: session?.user?.id ?? null,
    user: session?.user,
    loading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
