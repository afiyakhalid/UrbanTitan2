import { useAuthStore } from "../store/auth";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL!;
}

export type ApiError = {
  status: number;
  body: unknown;
};

export async function apiFetch(input: string, init?: RequestInit) {
  const baseUrl = getApiBaseUrl();
  const url = input.startsWith("http") ? input : `${baseUrl}${input}`;

  const token = useAuthStore.getState().token;

  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...init,
    headers,
  });

  if (res.ok) return res;

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    try {
      body = await res.text();
    } catch {
      body = null;
    }
  }

  const err: ApiError = { status: res.status, body };
  throw err;
}
