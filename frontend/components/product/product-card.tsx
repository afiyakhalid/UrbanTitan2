"use client";

import Link from "next/link";
import { type Product as ProductType } from "@/lib/data";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ProductCard({
  item,
  widthAutoTake,
}: {
  item: ProductType;
  widthAutoTake?: boolean;
}) {
  return (
    <Link
      href={`/products/${item.id}`}
      className={cn(
        "relative flex flex-col flex-shrink-0 rounded-md border border-gray-200/80 shadow-sm overflow-hidden group bg-white",
        widthAutoTake ? "w-full h-108" : "w-[250px] md:w-[300px] h-108"
      )}
    >
      {/* Image */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        {item.images?.[0] ? (
          <Image
            src={item.images[0]}
            alt={item.details.name}
            fill
            sizes={widthAutoTake ? "100vw" : "(max-width: 768px) 100vw, 300px"}
            className="object-contain p-4 transform group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-50" />
        )}
      </div>

      {/* Content */}
      <div className="w-full flex-1 flex flex-col justify-between p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          {/* Category */}
          <p className="text-[1rem] text-gray-500 font-medium">
            {item.details.category.slug
              ? item.details.category.slug.charAt(0).toUpperCase() +
                item.details.category.slug.slice(1)
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
        <div className="mt-auto text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
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
