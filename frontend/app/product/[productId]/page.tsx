"use client";

import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductDetails } from "@/components/product/product-page";

const images = [
  "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1170561/RRbWFAHla8-1170561_3.jpg",
  "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1170561/RRbWFAHla8-1170561_3.jpg",
  "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1170561/RRbWFAHla8-1170561_3.jpg",
  "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1170561/RRbWFAHla8-1170561_3.jpg",
  "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1170561/RRbWFAHla8-1170561_3.jpg",
];

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-xs text-gray-500 mb-4">
        HOME / SKIN / SERUMS-AND-ESSENCES
      </div>

      <div className="flex flex-col lg:flex-row -mx-4">
        <ProductImageGallery images={images} />
        <ProductDetails />
      </div>

      <div className="mt-12 p-4 border-t border-gray-200">
        <h3 className="text-2xl font-normal mb-4">Ratings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-5xl font-semibold">
              4.4<span className="text-xl">/5</span>
            </p>
            <p className="text-gray-500 mt-2">From 3129 customers</p>
            <div className="text-sm font-medium text-green-600 mt-4">Good</div>
          </div>

          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className="flex items-center text-sm text-gray-600"
              >
                <span className="w-10">{star}★</span>
                <div className="w-full bg-gray-200 h-2 rounded mx-2">
                  <div
                    className="h-2 rounded"
                    style={{ width: `${star * 18 + 10}%` }}
                  ></div>
                </div>
                <span>{star * 100 + 42}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
