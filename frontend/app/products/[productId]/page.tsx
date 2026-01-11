"use client";

import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductDetails } from "@/components/product/product-details";
import { ProductRatings } from "@/components/product/product-ratings";
import { fetchProductById } from "@/lib/catalog";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = React.use(params);
  const [product, setProduct] = React.useState<Awaited<ReturnType<typeof fetchProductById>>>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetchProductById(productId).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (!product) return null;

  return (
    <div className="max-w-8xl mx-auto px-12 py-8">
      <div className="flex flex-col lg:flex-row -mx-4">
        <ProductImageGallery images={product.images} />
        <ProductDetails product={product} />
      </div>

      <ProductRatings
        rating={product.details.rating}
        reviewCount={product.details.reviewCount}
        ratingBreakdown={product.ratingBreakdown}
      />
    </div>
  );
}
