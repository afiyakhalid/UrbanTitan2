"use client";

import React from "react";

export function Login() {
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [isAgreed, setIsAgreed] = React.useState<boolean>(false);

  const handleSendOtp = () => {
    if (isAgreed && phoneNumber.length >= 10) {
      alert(`Sending OTP to +91 ${phoneNumber}`);
    } else {
      alert("Please enter a valid phone number and accept the terms.");
    }
  };

  const isButtonEnabled = isAgreed && phoneNumber.length >= 10;

  return (
    <div className="fixed bg-white inset-0 bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl relative overflow-hidden animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
          onClick={() => console.log("Modal closed")}
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
          <div className="text-5xl font-bold text-red-600 mb-2">tira</div>
          <p className="text-sm text-gray-700 font-light text-center">
            Personalised beauty recommendations
          </p>

          <div className="h-32 w-full mt-4 flex justify-center items-center" />
        </div>

        <div className="p-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
            Log In or Sign Up
          </h3>

          <div className="mb-6">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="p-3 text-gray-700 bg-gray-100 border-r border-gray-300 font-medium">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                maxLength={10}
              />
            </div>
          </div>

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
              By continuing, you agree to Tira’s
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
            disabled={!isButtonEnabled}
            className={`w-full py-3 rounded-md text-white font-medium transition duration-300 text-sm ${
              isButtonEnabled
                ? "bg-red-600 hover:bg-red-700 shadow-md"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Send OTP
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={() => alert("Continue with Google clicked")}
            className="w-full py-2.5 border border-gray-300 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm font-medium"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
