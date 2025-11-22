"use client";

import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSection } from "@/components/filter/filter-section";
import {
  allBrands,
  Brand,
  type CategoryLink,
  allCategories,
} from "@/lib/constants";
import { productData, type Product as ProductType } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";
import {
  useQueryState,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import { CategoryDropdown } from "@/components/filter/category-dropdown";

export function PageComponent() {
  const [open, setOpen] = React.useState<boolean>(false);

  const [filteredProducts, setFilteredProducts] = React.useState<
    ProductType[] | null
  >(null);

  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [brands, setBrands] = useQueryState(
    "brands",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [priceRange, setPriceRange] = useQueryState(
    "price",
    parseAsArrayOf(parseAsInteger).withDefault([0, 2000])
  );

  const [discount, setDiscount] = useQueryState(
    "discount",
    parseAsInteger.withDefault(0)
  );

  const handleCategoryChange = (slug: string) => {
    let updated = [...categories];

    if (updated.includes(slug)) {
      updated = updated.filter((c) => c !== slug);
    } else {
      updated.push(slug);
    }

    setCategories([...updated]);
  };

  const handleBrandChange = (brand: string) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setOpen(false);
  };

  React.useEffect(() => {
    const newProducts = productData.filter((p) => {
      const inPriceRange =
        p.details.price >= priceRange[0] && p.details.price <= priceRange[1];

      const meetsDiscount = discount ? p.details.couponOffer >= discount : true;

      const meetsCategory =
        categories.length > 0
          ? categories.includes(p.details.category.slug)
          : true;

      const meetsBrand =
        brands.length > 0 ? brands.includes(p.details.brand.slug) : true;

      return inPriceRange && meetsDiscount && meetsCategory && meetsBrand;
    });

    setFilteredProducts(newProducts);
  }, [priceRange, discount, brands, categories]);

  return (
    <div className="w-full flex flex-col md:flex-row md:gap-6 max-w-8xl mx-auto px-12 py-8">
      <>
        {/* Mobile Filter Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 border px-3 py-2 border rounded-md shadow-xs bg-white w-max flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar (Mobile Drawer + Desktop Static) */}
        <aside
          className={`
            fixed md:static top-0 right-0 z-99 h-full md:h-fit w-72 md:w-64
            bg-white shadow-lg md:shadow-sm border md:rounded-lg p-4
            z-50 md:z-0 transform transition-transform duration-300 overflow-y-auto
            ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}
          `}
        >
          <button
            onClick={() => setOpen(false)}
            className="md:hidden mb-4 flex items-center gap-2"
          >
            <X className="w-5 h-5" /> Close
          </button>

          <h2 className="font-semibold text-lg mb-4">Filters</h2>

          {/* Category Filter */}
          <FilterSection title="Category">
            <div className="space-y-2">
              {allCategories.map((cat: CategoryLink) => (
                <CategoryDropdown
                  key={cat.slug}
                  category={cat}
                  selected={categories}
                  onSubCategoryChange={handleCategoryChange}
                />
              ))}
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection title="Brand">
            <div className="space-y-2">
              {allBrands.map((brand: Brand) => (
                <label
                  key={brand.slug}
                  className="flex items-center gap-2 text-md"
                >
                  <input
                    type="checkbox"
                    checked={brands.includes(brand.slug)}
                    onChange={() => handleBrandChange(brand.slug)}
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </FilterSection>

          {/* PRICE DROPDOWN */}
          <FilterSection title="Price">
            <input
              type="range"
              min={0}
              max={2000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <p className="text-md mt-1">Under ₹{priceRange[1]}</p>
          </FilterSection>

          {/* Discount Filter */}
          <FilterSection title="Discount">
            <div className="space-y-1">
              {[10, 20, 30, 40, 50].map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-2 text-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={Number(discount) === d}
                    onChange={() => {
                      if (Number(discount) === d) {
                        setDiscount(0);
                      } else {
                        setDiscount(d);
                      }
                    }}
                  />
                  {d}% or more
                </label>
              ))}
            </div>
          </FilterSection>
        </aside>
      </>

      {/* RIGHT PRODUCT GRID */}
      <main className="flex-1">
        <h2 className="font-semibold text-xl mb-4">
          Found ({filteredProducts && filteredProducts.length} items)
        </h2>

        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                widthAutoTake={true}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
