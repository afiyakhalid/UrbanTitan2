"use client";

import React from "react";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { NavigationOptions } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  name: string;
  imageUrl: string;
  href: string;
}

const topCategories: CategoryItem[] = [
  {
    name: "Cement",
    imageUrl:
      "https://imgs.search.brave.com/qvgwQeBcrJWqi5THp15opr2pel0qU2FPYgHYWPeeyNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDc2/MTk5NzU2L3Bob3Rv/L2NlbWVudC1iYWdz/LXBpbGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUdDM1Ru/X2wxcHlRVWhLSlpQ/Q0J6d0JyTlB1T1RV/WGZkemhLRElNRG1Q/RVk9",
    href: "/cement",
  },
  {
    name: "Electrical",
    imageUrl:
      "https://imgs.search.brave.com/5BGfar-qyCYHm559LwTbSMI7WJxupZ-ybkYD8q1s2IA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/aWZmZXJlbnQtZWxl/Y3RyaWNhbC10b29s/cy13b29kZW4tYmFj/a2dyb3VuZC1mbGF0/LWxheV8xNjkwMTYt/MjQ2MDQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",
    href: "/electrical",
  },
  {
    name: "Wooden Products",
    imageUrl:
      "https://imgs.search.brave.com/HPtP6foGSjtm_evQ-xkSEOhglf1WMRKphrvhCLve4E4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcx/LmV4cG9ydGVyc2lu/ZGlhLmNvbS9wcm9k/dWN0X2ltYWdlcy9i/Yy1zbWFsbC9kaXJf/MTg0LzU0OTY3NzMv/aGFuZGNyYWZ0ZWQt/d29vZGVuLXByb2R1/Y3RzLTE1MTgxNTYx/NjYtMzYzNjA2NS5q/cGVn",
    href: "/wooden-products",
  },
  {
    name: "Sand & Aggregates",
    imageUrl:
      "https://imgs.search.brave.com/7hV68pUDm4icGsWsP39QyNu5J_0QNrrg-9sgqNYty3M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bHp6Z2NoaW5hLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OS8wMi9zYW5kLWFn/Z3JlZ2F0ZS5qcGc",
    href: "/sand-aggregates",
  },
  {
    name: "Bricks & Blocks",
    imageUrl:
      "https://imgs.search.brave.com/qPFroWe-e2itv251NVbvltwupSrBLVUcG-2MrtnCkDM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/NC8yNS8xMi8wMC9i/cmljay0yMjU5NTEx/XzY0MC5qcGc",
    href: "/brick-blocks",
  },
  {
    name: "Hardware Fixtures",
    imageUrl:
      "https://imgs.search.brave.com/bn82am1v4UeFhYHiF_-nvR1dVD90atMyYxxtBmcxaIA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGlhdHQtaGFyZHdh/cmUuY29tL21lZGlh/L21lZ2FtZW51X2hp/YXR0L2dhdGUtaGFy/ZHdhcmUuanBn",
    href: "/hardware-furnitures",
  },
];

function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <a
      href={item.href}
      className="flex-shrink-0 w-[200px] md:w-[240px] text-center group"
    >
      <div className="w-full h-[200px] overflow-hidden rounded-md transition duration-300 border border-gray-200 shadow-xs group-hover:shadow-lg">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <p className="mt-3 text-sm md:text-[1.02rem] text-gray-800 font-medium">
        {item.name}
      </p>
    </a>
  );
}

export function Categories() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-8 pt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="px-1 text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900">
          Top Categories
        </h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 overflow-x-scroll scrollbar-hide pb-2 scroll-smooth"
        >
          {topCategories.map((category) => (
            <CategoryCard key={category.name} item={category} />
          ))}
        </div>

        <button
          onClick={scrollPrev}
          className="
            hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2
            w-12 h-12 bg-white rounded-full shadow-lg border cursor-pointer
            items-center justify-center hover:shadow-xl transition duration-200 z-10
          "
          aria-label="Previous Product"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollNext}
          className="
            hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2
            w-12 h-12 bg-white rounded-full shadow-lg border cursor-pointer
            items-center justify-center hover:shadow-xl transition duration-200 z-10
          "
          aria-label="Next Product"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
