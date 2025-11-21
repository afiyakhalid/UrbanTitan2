"use client";

import React from "react";

export function ProductImageGallery({ images }: { images: Array<string> }) {
  const [activeImage, setActiveImage] = React.useState(images[0]);
  const [fade, setFade] = React.useState(false);

  const handleImageChange = (img: string) => {
    setFade(true);
    setTimeout(() => {
      setActiveImage(img);
      setFade(false);
    }, 200);
  };

  return (
    <div className="w-full lg:w-1/2 p-4 flex flex-col md:flex-row lg:sticky lg:top-0 h-fit">
      <div className="flex md:flex-col md:space-y-2 space-x-2 md:space-x-0 mb-4 md:mb-0 md:mr-4 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => handleImageChange(img)}
            className={`w-20 h-20 flex-shrink-0 border rounded overflow-hidden cursor-pointer transition
              ${
                activeImage === img
                  ? "border-black"
                  : "border-gray-200 hover:border-black"
              }
            `}
          >
            <img
              src={img}
              alt={`thumb ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="md:hidden flex items-center justify-center text-sm text-gray-500 w-20">
          →
        </div>

        <div className="hidden md:flex w-20 h-5 items-center justify-center text-sm text-gray-500">
          ↓
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg relative">
          <img
            src={activeImage}
            alt="Product"
            className={`w-full h-auto object-contain transition-opacity duration-300 
              ${fade ? "opacity-0" : "opacity-100"}
            `}
          />

          <div className="text-xs text-gray-600 bg-gray-100 py-1 px-3 mt-2 rounded-full text-center">
            1000+ units sold in the last month
          </div>
        </div>
      </div>
    </div>
  );
}
