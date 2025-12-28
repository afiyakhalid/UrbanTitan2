"use client";

import React from "react";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

type MeResponse = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export default function Page() {
  const { user } = useAuthStore();
  const [me, setMe] = React.useState<MeResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const run = async () => {
      try {
        setError(null);
        const res = await apiFetch("/api/v1/users/me", { method: "GET" });
        const data = (await res.json()) as MeResponse;
        setMe(data);
      } catch {
        setError("Failed to load profile");
      }
    };

    run();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>

      {!user && <p className="mt-4 text-gray-600">Redirecting…</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-sm text-gray-600">Signed in as</p>
        <p className="text-lg font-medium text-gray-900">{user?.name}</p>
        <p className="text-gray-700">{user?.email}</p>
        <p className="text-xs text-gray-500 mt-1">ROLE_{user?.role}</p>

        {me && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">Backend /me response</p>
            <pre className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-auto">
              {JSON.stringify(me, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
