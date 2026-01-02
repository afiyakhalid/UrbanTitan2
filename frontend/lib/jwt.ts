export type JwtUser = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  // Add padding
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);
  if (typeof window === "undefined") {
    // Not expected to run on server.
    return Buffer.from(base64, "base64").toString("utf8");
  }
  const binary = atob(base64);
  // Decode UTF-8 safely
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

export function decodeJwtUser(token: string): JwtUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as {
      sub?: string;
      uid?: string;
      role?: string;
      name?: string;
      exp?: number;
    };

    if (!payload.sub || !payload.uid || !payload.role) return null;

    return {
      userId: payload.uid,
      email: payload.sub,
      name: payload.name ?? payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (!payload.exp) return false;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowSeconds;
  } catch {
    return true;
  }
}
