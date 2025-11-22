"use client";

import { allBrands } from "@/lib/constants";
import { useCartStore, type CartItemType } from "@/store/store";
import { Minus, Plus, Scale } from "lucide-react";
import Image from "next/image";

export function CartItemCard({ item }: { item: CartItemType }) {
  const { updateQuantity } = useCartStore();

  const handleCompare = (cat: string) => {
    const allBrandSlugs = allBrands.map((b) => b.slug);

    const params = new URLSearchParams();
    params.set("categories", cat);
    params.set("brands", allBrandSlugs.join(","));

    window.location.href = `/products?${params.toString()}`;
  };

  return (
    <div className="flex bg-white p-3 rounded-sm shadow-xs items-center border border-gray-100">
      {/* Image Container */}
      <div className="flex-shrink-0 w-30 h-30 rounded-md overflow-hidden bg-gray-100 mr-4">
        <Image
          height={80}
          width={80}
          alt={item.details.name}
          src={item.images[0]}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="flex-1 flex flex-grow self-stretch justify-between">
        {/* Item Info */}
        <div className="flex-1 flex flex-col pr-4 space-y-1">
          <p className="font-normal text-[1.1rem] mb-1">{item.details.name}</p>
          <p className="text-md text-gray-500">
            {/* Size: <span className="font-medium">{selectedSize}</span> */}
          </p>
          {/* <p className="text-md text-gray-500">
            Color: <span className="font-medium">{item.color}</span>
          </p> */}

          <div className="mt-auto text-xl lg:text-2xl font-semibold text-gray-900">
            ₹{(item.quantity * item.details.price).toLocaleString()}
            <span className="text-sm md:text-[1rem] font-light text-gray-500 line-through ml-2">
              ₹{(item.quantity * item.details.mrp).toLocaleString()}
            </span>
            <span className="text-green-600 text-base md:text-[1rem] font-semibold ml-2">
              (
              {Math.round(
                ((item.quantity * item.details.mrp -
                  item.quantity * item.details.price) /
                  (item.quantity * item.details.mrp)) *
                  100
              )}
              % Off)
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-end justify-between self-stretch">
          {/* Compare  */}
          <button
            onClick={() => handleCompare(item.details.category.slug)}
            className="cursor-pointer py-1 px-3 flex items-center gap-2 border border-gray-400 text-md text-gray-800 rounded-md font-semibold hover:bg-gray-50 transition"
          >
            <Scale className="w-5 h-5" />
            Compare
          </button>

          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(0, item.quantity - 1))
              }
              className="cursor-pointer p-1 px-3 text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="px-3 border-l border-r border-gray-300 text-sm font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(0, item.quantity + 1))
              }
              className="cursor-pointer p-1 px-3 text-gray-600 hover:bg-gray-100 rounded-r-md"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
