import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductDetails } from "@/components/product/product-details";
import { ProductRatings } from "@/components/product/product-ratings";
import { productData } from "@/lib/data";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = React.use(params);
  const product = productData.find((pdt) => pdt.id === productId);

  if (!product) return;

  return (
    <div className="max-w-8xl mx-auto px-12 py-8">
      <div className="flex flex-col lg:flex-row -mx-4">
        <ProductImageGallery images={product.images} />
        <ProductDetails data={product.details} />
      </div>

      <ProductRatings
        rating={product.details.rating}
        reviewCount={product.details.reviewCount}
        ratingBreakdown={product.ratingBreakdown}
      />
    </div>
  );
}
