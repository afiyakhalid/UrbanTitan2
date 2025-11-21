"use client";

import { productData, type Product as ProductType } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import React from "react";

const productItems: ProductType[] = productData.filter(
  (p) => Number(p.id) >= 101 && Number(p.id) <= 106
);

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
