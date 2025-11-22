"use client";

import { productData, type Product as ProductType } from "@/lib/data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";

// --- Sample Data ---
const topShelfs: ProductType[] = productData.filter(
  (p) => Number(p.id) >= 107 && Number(p.id) <= 110
);

function TopShelfCard({ product }: { product: ProductType }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-md overflow-hidden border border-gray-100 shadow-xs group">
      <div className="w-full h-[300px] relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.details.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="px-3 py-4 space-y-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Category */}
          <p className="text-[1rem] text-gray-500 font-medium">
            {product.details.category.slug
              ? product.details.category.slug.charAt(0).toUpperCase() +
                product.details.category.slug.slice(1)
              : "General"}
          </p>

          {/* Rating in number format */}
          <p className="flex items-center justify-center text-gray-700 text-sm font-semibold">
            {product.details.rating.toFixed(1)}{" "}
            <Star className="w-4 h-4 inline-flex mx-0.5 fill-yellow-500 text-yellow-500" />{" "}
            / 5&nbsp;
          </p>
        </div>

        <h3 className="text-xl font-normal leading-snug text-gray-900 mb-3 line-clamp-1">
          {product.details.name}
        </h3>

        <a
          href={`/products/${product.id}`}
          className="inline-flex items-center text-sm md:text-[1.02rem] font-medium text-gray-700 hover:text-red-600 transition duration-300"
        >
          Quick View
          <span className="ml-1 text-base group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out">
            <ChevronRight className="w-5 h-5s" />
          </span>
        </a>
      </div>
    </div>
  );
}

export function TopShelf() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-pink-50/70 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl tracking-widest text-gray-900 flex items-center">
            TOP SHELF
            <a
              href="/top-shelf"
              aria-label="Go to Top Shelf"
              className="ml-4 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition duration-300"
            >
              <span className="text-white text-xl font-medium -mt-0.5">
                &rarr;
              </span>
            </a>
          </h2>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-scroll scrollbar-hide pb-4"
          >
            {topShelfs.map((prdt, index) => (
              <TopShelfCard key={index} product={prdt} />
            ))}
          </div>

          <button
            onClick={scrollPrev}
            className="
            hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2
            w-12 h-12 bg-white rounded-full shadow-lg border cursor-pointer
            items-center justify-center hover:shadow-xl transition duration-200 z-10
          "
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            className="
            hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2
            w-12 h-12 bg-white rounded-full shadow-lg border cursor-pointer
            items-center justify-center hover:shadow-xl transition duration-200 z-10
          "
            aria-label="Next Product"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
