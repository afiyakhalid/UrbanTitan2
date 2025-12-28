"use client";

import { CartItemCard } from "@/components/cart/cart-card";
import { OrderSummaryCard } from "@/components/cart/cart-summary";
import { type CartItemType, useCartStore } from "@/store/store";
import Link from "next/link";

export interface OrderSummary {
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
}

function calculateOrderSummary(cart: CartItemType[]) {
  const subtotal = cart.reduce((sum, product) => {
    return sum + product.quantity * product.details.price;
  }, 0);

  const discountAmount = cart.reduce((sum, product) => {
    const price = product.details.price;
    const offer = product.details.couponOffer;

    const discountPerItem = Math.round((price * offer) / 100);

    return sum + discountPerItem * product.quantity;
  }, 0);

  const deliveryFee = 45;

  const total = subtotal - discountAmount + deliveryFee;

  const discountPercentage =
    subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;

  return {
    subtotal,
    discountPercentage,
    discountAmount,
    deliveryFee,
    total,
  };
}

export default function Page() {
  const { cart } = useCartStore();

  if (!cart || cart.length === 0)
    return (
      <div className="h-120 w-full flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-[1.05rem] text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          href="/products"
          className="text-sm md:text-lg px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto px-12 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 lg:w-2/3">
          <h1 className="text-3xl font-bold mb-6 lg:hidden">
            Your Shopping Cart
          </h1>
          {cart.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-4">
            <OrderSummaryCard summary={calculateOrderSummary(cart)} />
          </div>
        </div>
      </div>
    </div>
  );
}
