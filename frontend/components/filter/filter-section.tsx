"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="border-b pb-2 mb-2">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex cursor-pointer w-full justify-between items-center transition-all duration-300 ease-in-out",
          open ? "mb-2" : "mb-0.5"
        )}
      >
        <h3 className="font-medium text-[1.1rem]">{title}</h3>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`
          transition-all duration-300 overflow-hidden
          ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
