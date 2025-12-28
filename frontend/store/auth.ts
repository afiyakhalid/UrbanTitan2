"use client";

import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { decodeJwtUser, isJwtExpired, type JwtUser } from "@/lib/jwt";

type AuthState = {
  token: string | null;
  user: JwtUser | null;

  setToken: (token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,

        setToken: (token) => {
          if (!token) {
            set({ token: null, user: null });
            return;
          }
          if (isJwtExpired(token)) {
            set({ token: null, user: null });
            return;
          }
          const user = decodeJwtUser(token);
          set({ token, user });
        },

        logout: () => set({ token: null, user: null }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ token: state.token }),
        onRehydrateStorage: () => (state) => {
          const token = state?.token;
          if (!token) return;
          if (isJwtExpired(token)) {
            state?.logout();
            return;
          }
          const user = decodeJwtUser(token);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (state as any).user = user;
        },
      }
    )
  )
);

export function requireRole(userRole: string | undefined | null, allowed: string[]) {
  if (!userRole) return false;
  return allowed.includes(userRole);
}
