"use client";

import React, { useEffect, useState } from "react";
import { useCompareStore, type CompareItem } from "@/store/compare";
import { apiFetch } from "@/lib/api";
import { X, ArrowLeft, ShoppingBag, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/store";

interface QuotationData {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  productImage: string;
  dealerId: string;
  dealerName: string;
  unitPrice: number;
  mrp: number;
  discountPercent: number;
  minOrderQty: number | null;
  leadTimeDays: number | null;
  stockAvailable: number | null;
  notes: string | null;
  servicesOffered: string | null;
}

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompareStore();
  const { addToCart } = useCartStore();
  const [quotations, setQuotations] = useState<Record<string, QuotationData[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (compareItems.length === 0) return;

    const fetchQuotations = async () => {
      setLoading(true);
      try {
        const productIds = compareItems.map((item) => item.productId);
        const res = await apiFetch("/api/v1/products/compare", {
          method: "POST",
          body: JSON.stringify(productIds),
        });
        const data = (await res.json()) as QuotationData[];

        const grouped: Record<string, QuotationData[]> = {};
        for (const q of data) {
          if (!grouped[q.productId]) {
            grouped[q.productId] = [];
          }
          grouped[q.productId].push(q);
        }
        setQuotations(grouped);
      } catch (err) {
        console.error("Failed to fetch quotations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, [compareItems]);

  if (compareItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Scale className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No items to compare</h2>
        <p className="text-gray-500 mb-6">Add products from your cart or product pages to compare.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Products
        </Link>
      </div>
    );
  }

  const comparisonRows = [
    { label: "Price", key: "price" },
    { label: "MRP", key: "mrp" },
    { label: "Discount", key: "discount" },
    { label: "Brand", key: "brand" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Compare Products ({compareItems.length})</h1>
        </div>
        <button
          onClick={clearCompare}
          className="text-sm text-red-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-gray-50 border-b w-40">Product</th>
              {compareItems.map((item) => (
                <th key={item.productId} className="p-4 bg-gray-50 border-b min-w-[220px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(item.productId)}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg overflow-hidden mb-2">
                      {item.productImage && (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-xs text-gray-500">{item.brandName}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50 border-b">Price</td>
              {compareItems.map((item) => (
                <td key={item.productId} className="p-4 text-center border-b">
                  <span className="text-lg font-bold text-green-600">₹{item.price.toLocaleString()}</span>
                </td>
              ))}
            </tr>

            {/* MRP Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50 border-b">MRP</td>
              {compareItems.map((item) => (
                <td key={item.productId} className="p-4 text-center border-b">
                  <span className="text-gray-500 line-through">₹{item.mrp.toLocaleString()}</span>
                </td>
              ))}
            </tr>

            {/* Savings Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50 border-b">You Save</td>
              {compareItems.map((item) => {
                const savings = item.mrp - item.price;
                const percent = Math.round((savings / item.mrp) * 100);
                return (
                  <td key={item.productId} className="p-4 text-center border-b">
                    <span className="text-green-600 font-medium">
                      ₹{savings.toLocaleString()} ({percent}%)
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Brand Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50 border-b">Brand</td>
              {compareItems.map((item) => (
                <td key={item.productId} className="p-4 text-center border-b">
                  {item.brandName || "-"}
                </td>
              ))}
            </tr>

            {/* Dealer Quotations Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50 border-b align-top">Seller Offers</td>
              {compareItems.map((item) => {
                const productQuotations = quotations[item.productId] || [];
                return (
                  <td key={item.productId} className="p-4 border-b align-top">
                    {loading ? (
                      <p className="text-sm text-gray-500">Loading...</p>
                    ) : productQuotations.length === 0 ? (
                      <p className="text-sm text-gray-500">No seller offers</p>
                    ) : (
                      <div className="space-y-2">
                        {productQuotations.slice(0, 3).map((q) => (
                          <div key={q.id} className="p-2 bg-gray-50 rounded text-xs">
                            <p className="font-medium">{q.dealerName}</p>
                            <p className="text-green-600 font-bold">₹{q.unitPrice.toLocaleString()}</p>
                            {q.leadTimeDays && (
                              <p className="text-gray-500">{q.leadTimeDays} days delivery</p>
                            )}
                          </div>
                        ))}
                        {productQuotations.length > 3 && (
                          <p className="text-xs text-blue-600">+{productQuotations.length - 3} more</p>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-medium bg-gray-50">Action</td>
              {compareItems.map((item) => (
                <td key={item.productId} className="p-4 text-center">
                  <Link
                    href={`/products/${item.productId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View Product
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Help Text */}
      <p className="text-sm text-gray-500 text-center mt-6">
        Compare up to 4 products at a time. Prices shown are best available offers.
      </p>
    </div>
  );
}
