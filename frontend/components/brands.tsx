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
    <div className="cursor-pointer w-full max-w-sm h-92 bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="w-full h-56 md:h-64 overflow-hidden">
        <img
          src={brand.imageUrl}
          alt={brand.altText}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-3 text-left border-t border-gray-200">
        <p className="text-lg md:text-xl font-normal text-gray-800 line-clamp-2">
          {brand.description}
        </p>

        <a
          href={brand.shopLink}
          className="mt-auto inline-flex items-center text-red-600 font-medium text-md md:text-[1rem] hover:text-red-700 transition duration-300"
        >
          Shop Now
          <span className="text-lg group-hover:translate-x-1 transition-transform duration-300 ease-in-out">
            <ChevronRight className="w-5 h-5" />
          </span>
        </a>
      </div>
    </div>
  );
}

export function Brands() {
  return (
    <section className="max-w-8xl mx-auto bg-gray-50 mt-8 py-8 px-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center text-gray-900 mb-10">
        Brands To Know
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {brandsData.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>
    </section>
  );
}
