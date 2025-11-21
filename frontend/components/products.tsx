"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";

interface ProductItem {
  name: string;
  imageUrl: string;
  href: string;
  altText: string;
  reviews: number;
  rating: number;
  price: number;
}

const productItems: ProductItem[] = [
  {
    name: "Greenstone's AAC Brick - 600mmX200mmX100mm (4)",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/200x200/9df78eab33525d08d6e5fb8d27136e95/b/r/brick_image.png",
    href: "/1",
    altText: "Greenstone's AAC Brick",
    price: 79,
    rating: 4.5,
    reviews: 128,
  },
  {
    name: "Local Red Brick - 8-10 x 3.8 x 2.9",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/vijayawadaredbrick_2.jpg",
    href: "/2",
    altText: "Local Red Brick",
    price: 12,
    rating: 4.0,
    reviews: 256,
  },
  {
    name: "CCI OPC Cement",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/c/cci_opc.jpg",
    href: "/3",
    altText: "CCI OPC Cement",
    price: 410,
    rating: 4.7,
    reviews: 342,
  },
  {
    name: "Birla.A1 StrongCrete",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/e/ceba1cre0002_2.png",
    href: "/4",
    altText: "Birla.A1 StrongCrete",
    price: 435,
    rating: 4.8,
    reviews: 512,
  },
  {
    name: "Sugna TMT Fe-550 Grade - 16mm",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/200x200/9df78eab33525d08d6e5fb8d27136e95/s/u/sugna_tmt_image_3.jpg",
    href: "/5",
    altText: "Sugna TMT Fe-550 Grade - 16mm",
    price: 53800,
    rating: 3.8,
    reviews: 1024,
  },
  {
    name: "ACC Suraksha Cement",
    imageUrl:
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/e/ceppcgacc0001.png",
    href: "/6",
    altText: "ACC Suraksha Cement",
    price: 290,
    rating: 2.7,
    reviews: 724,
  },
];

export function ProductCard({ item }: { item: ProductItem }) {
  return (
    <a
      href={item.href}
      className="relative flex-shrink-0 w-[250px] md:w-[300px] rounded-xl border border-gray-200/80 shadow-xs overflow-hidden group bg-white"
    >
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.altText}
          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="w-full p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 space-y-2">
        <p className="text-red-600 font-bold text-lg md:text-xl">
          ₹{item.price}.00
        </p>

        <div className="flex items-center justify-start space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < item.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              stroke="currentColor"
            />
          ))}

          <span className="text-gray-600 text-sm ml-1">({item.reviews})</span>
        </div>

        <p className="text-gray-800 text-sm md:text-lg line-clamp-1">
          {item.name}
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
          {productItems.map((product) => (
            <ProductCard key={product.name} item={product} />
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
