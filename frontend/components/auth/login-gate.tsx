"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Login } from "@/components/auth/login";

const DISMISSED_KEY = "urbantitan_login_dismissed_v1";

export function LoginGate() {
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);

  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (pathname !== "/") return;
    if (token) {
      setShow(false);
      return;
    }

    const dismissed = window.sessionStorage.getItem(DISMISSED_KEY) === "1";
    if (!dismissed) setShow(true);
  }, [pathname, token]);

  if (!show) return null;

  return (
    <Login
      onDismiss={() => {
        window.sessionStorage.setItem(DISMISSED_KEY, "1");
        setShow(false);
      }}
    />
  );
}
