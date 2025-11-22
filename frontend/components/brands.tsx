"use client";

import { ChevronRight } from "lucide-react";

interface BrandItem {
  imageUrl: string;
  altText: string;
  description: string;
  shopLink: string;
}

// --- Sample Data ---
const brandsData: BrandItem[] = [
  {
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/asian2.jpg",
    altText: "Asian Paints",
    description: "Premium interior and exterior paints for long-lasting beauty",
    shopLink: "/shop/asian-paints",
  },
  {
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/Ambuja-Cement.jpg",
    altText: "Ambuja Cement",
    description: "High-strength cement trusted for durable construction",
    shopLink: "/shop/ambuja-cement",
  },
  {
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/strongcrete.jpg",
    altText: "Birla StrongCrete",
    description: "Engineered for superior bonding and long-lasting strength",
    shopLink: "/shop/birla-strongcrete",
  },
  {
    imageUrl:
      "https://cdn-media.buildersmart.in/media/mobile/bmobilebrands/godrej2.jpg",
    altText: "Godrej",
    description: "Trusted home and construction solutions for modern living",
    shopLink: "/shop/godrej",
  },
];

function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <div className="cursor-pointer w-full max-w-sm bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden group transition-all duration-300 hover:shadow-md">
      {/* Image Section */}
      <div className="w-full h-56 md:h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={brand.imageUrl}
          alt={brand.altText}
          className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 py-4 text-left flex flex-col gap-4">
        {/* Brand Description */}
        <p className="text-lg font-medium text-gray-800 leading-snug line-clamp-2">
          {brand.description}
        </p>

        {/* CTA Button */}
        <a
          href={brand.shopLink}
          className="inline-flex items-center text-red-600 font-semibold text-sm md:text-[1rem] hover:text-red-700 transition-all duration-300"
        >
          Shop Now
          <ChevronRight className="w-5 h-5 ml-1 transform transition-all duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export function Brands() {
  return (
    <section className="bg-gray-50 mt-8 py-12 pb-18 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center text-gray-900 mb-10">
          Brands To Know
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {brandsData.map((brand, index) => (
            <BrandCard key={index} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
