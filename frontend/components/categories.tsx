"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CategoryLink, allCategories } from "@/lib/constants";

function CategoryCard({ item }: { item: CategoryLink }) {
  return (
    <div
      onClick={() => {
        const params = new URLSearchParams();
        params.set("categories", item.slug);

        window.location.href = `/products?${params.toString()}`;
      }}
      className="flex-shrink-0 w-[200px] md:w-[240px] text-center group"
    >
      <div className="w-full h-[200px] overflow-hidden rounded-md transition duration-300 border border-gray-200 shadow-xs group-hover:shadow-lg">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <p className="mt-3 text-sm md:text-[1.02rem] text-gray-800 font-medium">
        {item.name}
      </p>
    </div>
  );
}

export function Categories() {
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
    <section className="max-w-7xl mx-auto px-8 py-8 pt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="px-1 text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900">
          Top Categories
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
        >
          {allCategories.map((category) => (
            <CategoryCard key={category.name} item={category} />
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
