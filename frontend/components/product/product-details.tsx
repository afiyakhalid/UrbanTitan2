"use client";

import { type Product as ProductType } from "@/lib/data";
import { ChevronRight, Minus, Plus, Scale, Star } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RatingStars } from "@/components/rating/rating-stars";
import { allBrands } from "@/lib/constants";
import { useCartStore } from "@/store/store";
import { redirect } from "next/navigation";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const ReturnIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-gray-700"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 10h18M6 14h2M16 14h2M6 18h2M16 18h2M10 14h4M10 18h4M4 7l2-4h12l2 4M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7H4z"
    ></path>
  </svg>
);

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-800 hover:text-red-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-600">{children}</div>}
    </div>
  );
}

export function ProductDetails({ product }: { product: ProductType }) {
  const { addToCart } = useCartStore();
  const [selectedSize, setSelectedSize] = React.useState(
    product.details.sizes[0]
  );

  const handleCompare = (cat: string) => {
    const allBrandSlugs = allBrands.map((b) => b.slug);

    const params = new URLSearchParams();
    params.set("categories", cat);
    params.set("brands", allBrandSlugs.join(","));

    window.location.href = `/products?${params.toString()}`;
  };

  const offPercentage = Math.round(
    ((product.details.mrp - product.details.price) / product.details.mrp) * 100
  );

  return (
    <div className="w-full lg:w-1/2 p-4">
      <h1 className="text-xs md:text-sm font-light uppercase tracking-wider text-gray-500">
        {product.details.brand.name}
      </h1>

      <h2 className="text-xl md:text-2xl font-normal text-gray-900 leading-snug mb-2">
        {product.details.name} ({product.details.volume})
      </h2>

      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
        <span className="px-1 text-md text-gray-900 font-semibold">
          {Number(product.details.rating).toFixed(1)}
        </span>

        <RatingStars rating={product.details.rating} />

        <span className="px-2 text-sm text-gray-500 border-r border-gray-300">
          {product.details.reviewCount} Ratings
        </span>

        <a
          href="#"
          className="px-2 text-sm text-gray-500 hover:text-red-600 whitespace-nowrap"
        >
          Rate this product
        </a>
      </div>

      <div className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        ₹{product.details.price.toLocaleString()}
        <span className="text-sm md:text-lg font-light text-gray-500 line-through ml-2">
          ₹{product.details.mrp.toLocaleString()}
        </span>
        <span className="text-red-600 text-base md:text-lg font-semibold ml-2">
          ({offPercentage}% Off)
        </span>
        <span className="block md:inline text-sm font-light text-gray-500 md:ml-2">
          Inclusive Of All Taxes
        </span>
      </div>

      <div className="flex justify-between items-center bg-gray-100 px-3 py-3 my-3 rounded-lg cursor-pointer hover:bg-gray-200 transition text-sm md:text-base">
        <p className="font-semibold text-gray-900">
          Get for ₹{product.details.couponOffer} with coupon + offers
        </p>

        <ChevronRight className="w-5 h-5" />
      </div>

      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Select Size</p>

        <Select onValueChange={setSelectedSize} value={selectedSize}>
          <SelectTrigger className="w-full md:w-60 border-gray-300 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Choose Size" />
          </SelectTrigger>

          <SelectContent>
            {product.details.sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-6">
        <button
          onClick={() => handleCompare(product.details.category.slug)}
          className="cursor-pointer py-3 px-6 flex items-center gap-2 border border-gray-400 text-lg text-gray-800 rounded-md font-semibold hover:bg-gray-50 transition"
        >
          <Scale className="w-6 h-6" />
          Compare
        </button>

        <button
          onClick={() => {
            addToCart(product, 1);
            redirect("/cart");
          }}
          className="flex-1 cursor-pointer py-3 bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-800 transition"
        >
          Add To Bag
        </button>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-gray-800">
            Delivery Options{" "}
            <span className="text-sm font-normal text-gray-500">
              ({product.details.productCode})
            </span>
          </p>
          <button className="text-red-600 font-medium hover:text-red-700">
            Change
          </button>
        </div>

        <p className="flex items-center text-sm md:text-md font-semibold text-green-600">
          <CheckIcon />
          Free Delivery - Get it by {product.details.deliveryDate}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex items-center p-3 border border-gray-300 rounded-lg text-sm font-medium w-fit">
          <CheckIcon />
          Authentic Products
        </div>

        <div className="flex items-center p-3 border border-gray-300 rounded-lg text-sm font-medium w-fit">
          <ReturnIcon />
          Easy Returns
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Sold by{" "}
        <span className="font-semibold text-gray-900">
          RELIANCE RETAIL LIMITED
        </span>
      </p>

      <div className="my-6">
        <AccordionItem title="Special Features">
          <p className="text-[1rem]">
            Details about product&apos;s special features.
          </p>
        </AccordionItem>

        <AccordionItem title="Super Ingredients">
          <p className="text-[1rem]">A list of key ingredients and benefits.</p>
        </AccordionItem>

        <AccordionItem title="Product Description">
          <p className="text-[1rem]">
            Full user guide and product description.
          </p>
        </AccordionItem>
      </div>

      <p className="text-lg text-gray-800 mb-3">Rate this product</p>

      <div className="flex text-2xl text-gray-300">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-6 h-6 cursor-pointer hover:text-yellow-500 transition mr-1"
            fill="currentColor"
            stroke="currentColor"
          />
        ))}
      </div>
    </div>
  );
}
