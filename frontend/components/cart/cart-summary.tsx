"use client";

import { type OrderSummary } from "@/app/cart/page";
import { ChevronRight } from "lucide-react";

export function OrderSummaryCard({ summary }: { summary: OrderSummary }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-xl font-normal mb-6">Order Summary</h2>

      {/* Line Items */}
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm md:text-[1rem]">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold">₹{summary.subtotal}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-sm md:text-[1rem]">
          <span className="text-gray-700">
            Discount (-{summary.discountPercentage}%)
          </span>
          <span className="font-semibold text-green-500">
            -₹{summary.discountAmount}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between text-sm md:text-[1rem]">
          <span className="text-gray-700">Delivery Fee</span>
          <span className="font-semibold">₹{summary.deliveryFee}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4" />

      {/* Total */}
      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Total</span>
        <span>₹{summary.total}</span>
      </div>

      {/* Checkout Button */}
      <button className="flex items-center gap-2 w-full bg-black text-white py-3.5 font-semibold rounded-full text-lg flex items-center justify-center hover:bg-gray-800 hover:cursor-pointer transition duration-150 shadow-lg">
        <span>Go to Checkout</span>
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
