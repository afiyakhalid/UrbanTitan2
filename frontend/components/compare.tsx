"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Article {
  category: string;
  title: string;
  imageUrl: string;
  href: string;
}

// --- Sample Data ---
const articlesData: Article[] = [
  {
    category: "Electronics",
    title: "Bajaj CUB LED Street Light 25W",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/u/cub_led_street_light-bajaj_2.jpg",
    href: "/",
  },
  {
    category: "Electronics",
    title: "Philips Master LED Bulb",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/8/18w.jpg",
    href: "/article/dessert-bodycare",
  },
  {
    category: "Paints",
    title: "Dulux ICI Duwel Acrylic Wall Putty - 5 Kg",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/f/pfwcptdlx0108.jpg",
    href: "/category/",
  },
  {
    category: "Paints",
    title: "Dulux Dulux Smoothover - Putty - 4 Ltr",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/f/pfwcptdlx0105_1.jpg",
    href: "/category/4",
  },
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-lg overflow-hidden border border-gray-100 shadow-xs group">
      <div className="w-full h-[300px] relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-3 space-y-2 border-t border-gray-100">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">
          {article.category}
        </p>

        <h3 className="text-xl font-normal leading-snug text-gray-900 mb-4 line-clamp-1">
          {article.title}
        </h3>

        <a
          href={article.href}
          className="inline-flex items-center text-sm md:text-[1.02rem] font-medium text-gray-700 hover:text-red-600 transition duration-300"
        >
          Read More
          <span className="ml-1 text-base group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out">
            <ChevronRight className="w-5 h-5" />
          </span>
        </a>
      </div>
    </div>
  );
}

export function Compare() {
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
      <div className="max-w-8xl mx-auto">
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
            {articlesData.map((article, index) => (
              <ArticleCard key={index} article={article} />
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
