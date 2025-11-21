"use client";

import { productData, type Product as ProductType } from "@/lib/data";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";

const productItems: ProductType[] = productData.filter(
  (p) => Number(p.id) >= 101 && Number(p.id) <= 106
);

export function ProductCard({ item }: { item: ProductType }) {
  return (
    <a
      href={`/products/${item.id}`}
      className="relative flex-shrink-0 w-[250px] md:w-[300px] rounded-xl border border-gray-200/80 shadow-xs overflow-hidden group bg-white"
    >
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.details.name}
          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="w-full p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 space-y-2">
        <p className="text-red-600 font-bold text-lg md:text-xl">
          ₹{item.details.price}.00
        </p>

        <div className="flex items-center justify-start space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < item.details.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              stroke="currentColor"
            />
          ))}

          <span className="text-gray-600 text-sm ml-1">
            ({item.details.reviewCount})
          </span>
        </div>

        <p className="text-gray-800 text-sm md:text-lg line-clamp-1">
          {item.details.name}
        </p>
      </div>
    </a>
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
