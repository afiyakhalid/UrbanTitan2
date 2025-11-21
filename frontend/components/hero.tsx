"use client";

import React from "react";

const carouselData = [
  {
    image:
      "https://cdn-media.buildersmart.in/media/bannerslider/bannerslider/cement_tmt_price_drop...jpg",
    title: "Cement",
  },
  {
    title: "Construction",
    image:
      "https://cdn-media.buildersmart.in/media/bannerslider/bannerslider/Lowest_Prices_web.jpg",
  },
  {
    title: "Price",
    image:
      "https://cdn-media.buildersmart.in/media/bannerslider/bannerslider/Check_Price......jpg",
  },
];

export function Hero() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{
          width: `${carouselData.length * 100}%`,
          transform: `translateX(-${current * (100 / carouselData.length)}%)`,
        }}
      >
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{ width: `${100 / carouselData.length}%` }}
          >
            <div className="w-full mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full relative flex justify-center lg:justify-end mt-10 lg:mt-0">
                <div className="relative w-full rounded-md overflow-hidden  ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    style={{
                      objectFit: "contain",
                      objectPosition: "bottom right",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? "w-4 bg-gray-800" : "w-2 bg-gray-400 opacity-60"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
