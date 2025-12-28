"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export function ProductImageGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = React.useState(images[0] ?? "");
  const [fade, setFade] = React.useState(false);

  const handleImageChange = (img: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveImage(img);
      setFade(false);
    }, 200);
  };

  return (
    <div className="w-full lg:w-1/2 p-4 flex flex-col md:flex-row lg:sticky lg:top-40 h-fit">
      {images.length > 1 && (
        <div className="flex md:flex-col md:space-y-2 space-x-2 md:space-x-0 mb-4 md:mb-0 md:mr-4 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => handleImageChange(img)}
              className={cn(
                "w-20 h-20 flex-shrink-0 border rounded overflow-hidden cursor-pointer transition",
                activeImage === img
                  ? "border-black"
                  : "border-gray-200 hover:border-black"
              )}
            >
              {img ? (
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`thumb ${i}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-50" />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg relative">
          {activeImage ? (
            <Image
              src={activeImage}
              alt="Product"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 500px"
              className={cn(
                "max-w-xs w-full h-auto mx-auto object-contain transition-opacity duration-300",
                fade ? "opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <div className="max-w-xs w-full h-[300px] mx-auto bg-gray-50" />
          )}

          <div className="text-sm md:text-[0.95rem] text-gray-600 bg-gray-100 py-1 px-3 mt-2 rounded-full text-center">
            1000+ units sold in the last month
          </div>
        </div>
      </div>
    </div>
  );
}
