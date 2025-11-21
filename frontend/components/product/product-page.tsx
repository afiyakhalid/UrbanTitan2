"use client";

import React from "react";

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

const InfoIcon = () => (
  <svg
    className="w-4 h-4 ml-1 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

interface ProductData {
  brand: string;
  name: string;
  volume: string;
  rating: number;
  reviewCount: number;
  price: number;
  mrp: number;
  couponOffer: number;
  deliveryDate: string;
  treatsPoints: number;
  sizes: string[];
  productCode: string;
}

const initialProductData: ProductData = {
  brand: "SKIN1004",
  name: "SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule",
  volume: "50 ml",
  rating: 4.4,
  reviewCount: 3129,
  price: 1377,
  mrp: 1450,
  couponOffer: 923,
  deliveryDate: "Mon, 24 Nov",
  treatsPoints: 138,
  sizes: ["30 ml", "50 ml", "100 ml"],
  productCode: "400013",
};

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
        <span>{isOpen ? "—" : "+"}</span>
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-600">{children}</div>}
    </div>
  );
}

export function ProductDetails() {
  const [selectedSize, setSelectedSize] = React.useState(
    initialProductData.sizes[1]
  );

  const data = initialProductData;
  const offPercentage = Math.round(((data.mrp - data.price) / data.mrp) * 100);

  return (
    <div className="w-full lg:w-1/2 p-4">
      <h1 className="text-xs md:text-sm font-light uppercase tracking-wider text-gray-500">
        {data.brand}
      </h1>
      <h2 className="text-xl md:text-2xl font-normal text-gray-900 leading-snug my-1">
        {data.name} ({data.volume})
      </h2>
      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
        <span className="font-semibold text-gray-900 mr-2">{data.rating}</span>

        <span className="text-yellow-500 mr-2">
          {"★".repeat(Math.round(data.rating))}
        </span>

        <span className="text-gray-500 border-r border-gray-300 pr-2">
          {data.reviewCount} Ratings
        </span>

        <a
          href="#"
          className="ml-2 text-gray-500 hover:text-red-600 whitespace-nowrap"
        >
          Rate this product
        </a>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        ₹{data.price.toLocaleString()}
        <span className="text-sm md:text-lg font-light text-gray-500 line-through ml-2">
          ₹{data.mrp.toLocaleString()}
        </span>
        <span className="text-red-600 text-base md:text-lg font-semibold ml-2">
          ({offPercentage}% Off)
        </span>
        <span className="block md:inline text-xs font-light text-gray-500 md:ml-2">
          Inclusive Of All Taxes
        </span>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-3 mb-6 rounded-lg cursor-pointer hover:bg-gray-200 transition text-sm md:text-base">
        <p className="font-semibold text-gray-900">
          Get for ₹{data.couponOffer} with coupon + offers
        </p>
        <span className="text-lg font-medium text-gray-700">&gt;</span>
      </div>
      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Select Size</p>

        <div className="flex flex-wrap gap-3">
          {data.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-4 border rounded-md text-sm font-medium transition ${
                selectedSize === size
                  ? "text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-6">
        <button className="flex-1 py-3 bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-800 transition">
          Add To Bag
        </button>

        <button className="py-3 px-6 border border-gray-400 text-gray-800 rounded-md font-semibold hover:bg-gray-50 transition">
          Save to Wishlist
        </button>
      </div>
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-gray-800">
            Delivery Options{" "}
            <span className="text-sm font-normal text-gray-500">
              ({data.productCode})
            </span>
          </p>
          <button className="text-red-600 font-medium hover:text-red-700">
            Change
          </button>
        </div>

        <p className="flex items-center text-sm font-semibold text-green-600">
          <CheckIcon />
          Free Delivery - Get it by {data.deliveryDate}
        </p>
      </div>
      <p className="flex items-center text-sm font-medium text-gray-700 mb-6">
        Earn{" "}
        <span className="font-semibold text-red-600 mx-1">
          {data.treatsPoints} Treats points
        </span>{" "}
        with this purchase
        <InfoIcon />
      </p>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center p-3 border border-gray-300 rounded-lg text-sm font-medium w-fit">
          <CheckIcon />
          Authentic Products
        </div>

        <div className="flex items-center p-3 border border-gray-300 rounded-lg text-sm font-medium w-fit">
          <ReturnIcon />
          Easy Returns
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-8">
        Sold by{" "}
        <span className="font-semibold text-gray-900">
          RELIANCE RETAIL LIMITED
        </span>
      </p>
      <div className="mb-10">
        <AccordionItem title="Special Features">
          <p>Details about product's special features.</p>
        </AccordionItem>

        <AccordionItem title="Super Ingredients">
          <p>A list of key ingredients and benefits.</p>
        </AccordionItem>

        <AccordionItem title="Product Description">
          <p>Full user guide and product description.</p>
        </AccordionItem>
      </div>
      <div className="border-t border-gray-200 pt-6 mb-6">
        <p className="font-medium text-gray-800 mb-4">Rate this product</p>

        <div className="flex text-2xl text-gray-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="cursor-pointer hover:text-yellow-500 transition"
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-4">
          Gallery
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-full h-20 bg-gray-200 rounded overflow-hidden"
            >
              <img
                src={`/path/to/gallery-image-${i + 1}.jpg`}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="w-full h-20 bg-gray-300 rounded flex items-center justify-center text-sm font-medium text-gray-700">
            +1695 MORE
          </div>
        </div>
      </div>
    </div>
  );
}
