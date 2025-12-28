"use client";

import { Construction, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-gray-50 px-4 py-20">
      <div className="bg-white shadow-md rounded-full p-6 mb-6 animate-bounce">
        <Construction className="w-14 h-14 text-yellow-600" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        Feature Coming Soon
      </h1>

      <p className="mt-4 text-gray-600 text-center max-w-md text-base md:text-lg">
        This section is currently under development. We&apos;re working hard to bring
        this feature live as soon as possible.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="cursor-pointer mt-8 flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back Home
      </button>
    </div>
  );
}
