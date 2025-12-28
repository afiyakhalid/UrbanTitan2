"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

type LoginProps = {
  googleClientId?: string;
  onDismiss?: () => void;
};

export function Login({ googleClientId: googleClientIdProp, onDismiss }: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [otp, setOtp] = React.useState<string>("");
  const [otpRequested, setOtpRequested] = React.useState<boolean>(false);
  const [isAgreed, setIsAgreed] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { setToken } = useAuthStore();

  const googleClientId =
    googleClientIdProp ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const googleButtonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!googleClientId) return;
    if (window.google?.accounts?.id) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          try {
            setError(null);
            setInfo(null);
            setLoading(true);
            const res = await apiFetch("/api/auth/google", {
              method: "POST",
              body: JSON.stringify({ idToken: response.credential }),
            });
            const data = (await res.json()) as { token: string };
            setToken(data.token);
            window.location.href = "/";
          } catch {
            setError("Google sign-in failed");
          } finally {
            setLoading(false);
          }
        },
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        width: 320,
      });
    };

    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [googleClientId, setToken]);

  const handleSendOtp = async () => {
    if (!isAgreed) {
      setError("Please accept the terms to continue.");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      setError(null);
      setInfo(null);
      setLoading(true);
      const res = await apiFetch("/api/auth/otp/request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string; debugOtp?: string };
      setOtpRequested(true);
      if (data.debugOtp) {
        setInfo(`OTP sent (dev): ${data.debugOtp}`);
      } else {
        setInfo(data.message ?? "OTP sent");
      }
    } catch {
      setError("Failed to request OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpRequested) return;
    if (!otp || otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }

    try {
      setError(null);
      setInfo(null);
      setLoading(true);
      const res = await apiFetch("/api/auth/otp/verify", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      });
      const data = (await res.json()) as { token: string };
      setToken(data.token);
      window.location.href = "/";
    } catch {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const isSendOtpEnabled = isAgreed && email.includes("@") && !loading;
  const isVerifyOtpEnabled = otpRequested && otp.length === 6 && !loading;

  const dismiss = () => {
    if (onDismiss) {
      onDismiss();
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="fixed bg-white inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl relative overflow-hidden animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
          onClick={dismiss}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center justify-center p-8 bg-orange-50/60">
          <div className="text-4xl font-bold text-gray-900 mb-2">UrbanTitan</div>
          <p className="text-sm text-gray-700 font-light text-center">
            where skill meets craft
          </p>

          <div className="h-32 w-full mt-4 flex justify-center items-center" />
        </div>

        <div className="p-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
            Log In or Sign Up
          </h3>

          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
          </div>

          {otpRequested && (
            <div className="mb-6">
              <input
                inputMode="numeric"
                placeholder="Enter OTP (6 digits)"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm tracking-widest"
                maxLength={6}
              />
            </div>
          )}

          <div className="mb-6 flex items-start">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 mr-3 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label
              htmlFor="agreement"
              className="text-xs text-gray-600 leading-relaxed"
            >
              By continuing, you agree to UrbanTitan&apos;s
              <a href="/terms" className="text-red-600 hover:underline mx-1">
                Terms of Use
              </a>
              and
              <a href="/privacy" className="text-red-600 hover:underline mx-1">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            onClick={handleSendOtp}
            disabled={!isSendOtpEnabled}
            className={`w-full py-3 rounded-md text-white font-medium transition duration-300 text-sm ${
              isSendOtpEnabled
                ? "bg-red-600 hover:bg-red-700 shadow-md"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Please wait..." : "Send OTP"}
          </button>

          {otpRequested && (
            <button
              onClick={handleVerifyOtp}
              disabled={!isVerifyOtpEnabled}
              className={`w-full mt-3 py-3 rounded-md text-white font-medium transition duration-300 text-sm ${
                isVerifyOtpEnabled
                  ? "bg-black hover:bg-gray-900 shadow-md"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Please wait..." : "Verify OTP"}
            </button>
          )}

          {error && (
            <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
          )}
          {info && (
            <p className="text-sm text-green-700 mt-3 text-center">{info}</p>
          )}

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="w-full flex justify-center">
            {googleClientId ? (
              <div ref={googleButtonRef} />
            ) : (
              <button
                disabled
                className="w-full py-2.5 border border-gray-300 rounded-md text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
              >
                Google sign-in not configured
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
