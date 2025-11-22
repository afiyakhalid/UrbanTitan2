import { CategoryLink } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import React from "react";

export function CategoryDropdown({
  category,
  selected,
  onSubCategoryChange,
}: {
  category: CategoryLink;
  selected: string[];
  onSubCategoryChange: (slug: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const hasChildren = category.children && category.children.length > 0;
  const childrenSlugs = hasChildren
    ? category.children!.map((c) => c.slug)
    : [];

  return (
    <div className="border rounded-md p-2">
      {/* MAIN HEADER */}
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex w-full justify-between items-center"
      >
        {/* Parent Label */}
        <div className="flex items-center gap-2">
          {/* ❗ NO CHECKBOX IF HAS CHILDREN */}
          {!hasChildren && (
            <input
              type="checkbox"
              checked={selected.includes(category.slug)}
              onChange={() => onSubCategoryChange(category.slug)}
            />
          )}

          <span className="text-md">{category.name}</span>
        </div>

        {/* Show dropdown only if children exist */}
        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* SUBCATEGORY LIST */}
      {hasChildren && (
        <div
          className={`transition-all overflow-hidden ${
            open ? "max-h-[400px] mt-2" : "max-h-0"
          }`}
        >
          <ul className="ml-6 space-y-1">
            {category.children!.map((sub) => (
              <li key={sub.slug}>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(sub.slug)}
                    onChange={() => onSubCategoryChange(sub.slug)}
                  />
                  {sub.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
