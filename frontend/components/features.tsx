"use client";

import React from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Sample Data ---
const featuresData: Feature[] = [
  {
    icon: (
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    title: "100% Authentic",
    description: "All our products are directly sourced from brands",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v5m-1 6h1m-1-1h1m-7.5-6h7.5m-7.5 3h7.5m-9 0L9 9m-5 7V13a2 2 0 012-2h4l4-4h4a2 2 0 012 2v7l-4-4h-4a2 2 0 00-2 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        ></path>
      </svg>
    ),
    title: "Free Shipping",
    description: "On all orders above ₹299",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        ></path>
      </svg>
    ),
    title: "Certified Advisors",
    description: "Get expert consultations",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    ),
    title: "Easy Returns",
    description: "Hassle-free pick-ups and refunds",
  },
];

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left p-3 space-y-3">
      <div className="text-xl">{feature.icon}</div>

      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
        {feature.title}
      </h3>

      <p className="text-sm md:text-[1rem] text-gray-700 leading-relaxed max-w-xs">
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureHighlights() {
  return (
    <section className="max-w-7xl mx-auto bg-orange-50/70 my-12 px-4 py-12 rounded-sm border border-black/10 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
}
