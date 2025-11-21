"use client";

import { productData, type Product as ProductType } from "@/lib/data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const productItems: ProductType[] = productData.filter(
  (p) => Number(p.id) >= 101 && Number(p.id) <= 106
);

export function ProductCard({ item }: { item: ProductType }) {
  return (
    <Link
      href={`/products/${item.id}`}
      className="relative flex flex-col flex-shrink-0 w-[250px] md:w-[300px] h-108 rounded-xl border border-gray-200/80 shadow-xs overflow-hidden group bg-white"
    >
      {/* Image */}
      <div className="w-full h-56 md:h-64 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.details.name}
          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="w-full flex-1 flex flex-col justify-between p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          {/* Category */}
          <p className="text-[1rem] text-gray-500 font-medium">
            {item.details.category
              ? item.details.category.charAt(0).toUpperCase() +
                item.details.category.slice(1)
              : "General"}
          </p>

          {/* Rating in number format */}
          <p className="flex items-center justify-center text-gray-700 text-sm font-semibold">
            {item.details.rating.toFixed(1)}{" "}
            <Star className="w-4 h-4 inline-flex mx-0.5 text-yellow-500 fill-yellow-500" />{" "}
            / 5&nbsp;
          </p>
        </div>

        {/* Title: clamp to 3 lines */}
        <p className="flex-1 text-gray-800 text-sm md:text-[1.1rem] line-clamp-3 font-medium">
          {item.details.name}
        </p>

        {/* Price at the bottom */}
        <div className="mt-auto text-xl font-semibold text-gray-900 mb-4">
          ₹{item.details.price.toLocaleString()}
          <span className="text-sm md:text-[1rem] font-light text-gray-500 line-through ml-2">
            ₹{item.details.mrp.toLocaleString()}
          </span>
          <span className="text-green-600 text-base md:text-[1rem] font-semibold ml-2">
            (
            {Math.round(
              ((item.details.mrp - item.details.price) / item.details.mrp) * 100
            )}
            % Off)
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Products() {
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
    <section className="max-w-8xl mx-auto px-8 py-4">
      <h2 className="px-1 text-2xl md:text-3xl lg:text-4xl font-noraml text-gray-900 mb-8">
        Top Selling Products
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
        >
          {productItems &&
            productItems.length > 0 &&
            productItems.map((product) => (
              <ProductCard key={product.id} item={product} />
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
    </section>
  );
}
