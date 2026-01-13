"use client";

import React from "react";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { allCategories, Category } from "@/lib/constants";
import { redirect, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { fetchProducts } from "@/lib/catalog";
import { useCartStore } from "@/store/store";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import Link from "next/link";
import { getApiBaseUrl } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

interface UserLink {
  name: string;
  href: string;
  separator?: boolean;
  color?: string;
}

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Top Brands", href: "/top-brands" },
  { name: "Local Brands", href: "/local-brands" },
  { name: "Contractors", href: "/contractors" },
];

const userLinks: UserLink[] = [
  { name: "Personal Details", href: "/profile" },
  { name: "Orders", href: "/orders" },
  { name: "Addresses", href: "/addresses", separator: true },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Help & Support", href: "/support", separator: true },
  { name: "Logout", href: "/logout", color: "text-red-400" },
];

export interface CategoryLink {
  name: string;
  href: string;
  slug: string;
  children?: CategoryLink[];
  imageUrl?: string;
}

function BuildCategoryTree({
  categories,
}: {
  categories: Category[];
}): CategoryLink[] {
  const map = new Map<string, CategoryLink>();
  const result: CategoryLink[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, {
      name: cat.name,
      slug: cat.slug,
      href: `/${cat.slug}`,
      imageUrl: cat.imageUrl,
      children: [],
    });
  });

  categories.forEach((cat) => {
    const node = map.get(cat.id) as CategoryLink;

    if (cat.parent_id) {
      const parent = map.get(cat.parent_id);
      if (parent) {
        parent.children?.push(node);
      }
    } else {
      result.push(node);
    }
  });

  return result;
}

function DesktopCategory() {
  const [openMenu, setOpenMenu] = React.useState<number | null>(null);
  const [categories, setCategories] = React.useState<CategoryLink[] | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/v1/categories/`);
        const data: Category[] = await res.json();
        const updatedData = BuildCategoryTree({ categories: data });
        setCategories(updatedData);
      } catch (error) {
        console.error("Error occured while fetching categories", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden sm:block bg-white relative z-40">
      <nav className="overflow-x-auto scrollbar-hide px-10 py-3">
        <ul className="flex flex-nowrap text-sm text-gray-700 whitespace-nowrap space-x-3">
          {(categories ?? allCategories).map((category, index) => (
            <li
              key={category.name}
              className="relative"
              onMouseEnter={() => setOpenMenu(index)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {category.children && category.children.length > 0 ? (
                <DropdownMenu
                  modal={false}
                  open={openMenu === index}
                  onOpenChange={(isOpen) => setOpenMenu(isOpen ? index : null)}
                >
                  <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <button className="cursor-pointer hover:text-red-600 text-sm md:text-md lg:text-[1.02rem] transition p-2 focus:outline-none focus:ring-0 data-[state=open]:outline-none data-[state=open]:ring-0">
                      {category.name}
                    </button>
                  </DropdownMenuTrigger>

                  {category.children && category.children.length > 0 && (
                    <DropdownMenuContent
                      className="w-max shadow-xs rounded-none rounded-b-lg mt-2"
                      align="center"
                      side="bottom"
                    >
                      {category.children.map((child) => (
                        <div key={child.name}>
                          {child.children && child.children.length > 0 ? (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger className="cursor-pointer ">
                                {child.name}
                              </DropdownMenuSubTrigger>

                              <DropdownMenuSubContent className="w-56">
                                {child.children.map((sub) => (
                                  <DropdownMenuItem
                                    key={sub.name}
                                    onClick={() =>
                                      (window.location.href = sub.href)
                                    }
                                  >
                                    {sub.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          ) : (
                            <DropdownMenuItem
                              className="cursor-pointer text-sm md:text-[1.02rem] px-3"
                              onClick={() =>
                                (window.location.href = child.href)
                              }
                            >
                              {child.name}
                            </DropdownMenuItem>
                          )}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => (window.location.href = category.href)}
                  className="cursor-pointer hover:text-red-600 text-sm md:text-md lg:text-[1rem] transition p-2"
                >
                  {category.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileCategoryItem({
  item,
  level,
}: {
  item: CategoryLink;
  level: number;
}) {
  const [open, setOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="select-none">
      {/* Category Row */}
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className={`flex items-center justify-between w-full py-2 rounded 
          ${hasChildren ? "hover:bg-gray-100" : ""}`}
      >
        <span className="text-gray-700">{item.name}</span>

        {hasChildren && (
          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Children */}
      {hasChildren && (
        <ul
          className={cn(
            "mt-1 space-y-2 transition-all duration-300 overflow-hidden bg-gray-50 rounded-md",
            open ? "max-h-[1000px]" : "max-h-0"
          )}
        >
          {item.children &&
            item.children.map((child, idx) => (
              <MobileCategoryItem key={idx} item={child} level={level + 1} />
            ))}
        </ul>
      )}
    </li>
  );
}

function MobileCategory() {
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  return (
    <li>
      <button
        onClick={() => setCategoryOpen(!categoryOpen)}
        className="px-4 py-1 w-full flex items-center justify-between text-gray-800 hover:bg-gray-100 rounded"
      >
        Categories
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            categoryOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <ul
        className={`px-4 py-2 space-y-2 transition-all duration-300 overflow-hidden ${
          categoryOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {allCategories.map((cat, idx) => (
          <MobileCategoryItem key={idx} item={cat} level={1} />
        ))}
      </ul>
    </li>
  );
}

// ...existing code...
export function Header() {
  const { cart } = useCartStore();
  const { user, logout } = useAuthStore();
  const router = useRouter(); 
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<
    { type: string; label: string; slug: string; score?: number }[]
  >([]);
  // REMOVED: allSearchData state is no longer needed
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // CHANGED: Use effect handles debounced API call instead of fetching all products
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const res = await fetch(
            `${getApiBaseUrl()}/api/v1/search/suggest?q=${encodeURIComponent(
              searchQuery
            )}&limit=5&types=product,category`
          );

          console.log("[Navbar] Fetching suggestions for:", searchQuery); 

          if (res.ok) {
            const data = await res.json();
            console.log("[Navbar] Raw backend response:", data); 

            const formatted = (Array.isArray(data) ? data : [])
              .map((item: any) => ({
                type: String(item.type ?? ""),
                label: String(item.label ?? item.text ?? item.name ?? item.title ?? ""),
                slug: String(item.slug ?? ""),
                score:
                  item.score === null || item.score === undefined
                    ? undefined
                    : Number(item.score),
              }))
              .filter((item: any) => item.label.trim() && item.type.trim());

            setSuggestions(formatted);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Wait 300ms after typing stops

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Just update the query, let useEffect handle the fetching
    setSearchQuery(e.target.value);
  };

  const handleSelectSuggestion = (id: string) => {
    router.push(`/products/${id}`);
    setShowSuggestions(false);
    setSearchQuery("");
  }
// ...existing code...

  const handleSelectSearchSuggestion = async (item: {
    type: string;
    label: string;
    slug: string;
  }) => {
    setShowSuggestions(false);
    setSearchQuery("");

    if (item.type === "category" && item.slug) {
      router.push(`/products?categories=${encodeURIComponent(item.slug)}`);
      return;
    }

    // If backend only gives slug for products, try to resolve to an ID so we can go to /products/[productId]
    if (item.type === "product" && item.slug) {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/v1/products/`);
        if (res.ok) {
          const products = (await res.json()) as Array<{
            id: string;
            slug?: string;
            productCode?: string | null;
          }>;

          const hit = products.find(
            (p) =>
              String(p.slug ?? "").toLowerCase() === item.slug.toLowerCase() ||
              String(p.productCode ?? "").toLowerCase() === item.slug.toLowerCase()
          );

          if (hit?.id) {
            router.push(`/products/${hit.id}`);
            return;
          }
        }
      } catch {
        // ignore and fall back
      }
    }

    // Fallback: use the search results page
    router.push(`/products?search=${encodeURIComponent(item.label || item.slug)}`);
  };

  const resolveAndNavigateSearch = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setShowSuggestions(false);

    try {
      // Always ask backend on Enter (don’t rely on debounced state)
      const res = await fetch(
        `${getApiBaseUrl()}/api/v1/search/suggest?q=${encodeURIComponent(
          trimmed
        )}&limit=10&buffer=2&types=product,category`
      );

      if (!res.ok) {
        router.push(`/products?search=${encodeURIComponent(trimmed)}`);
        return;
      }

      const data = await res.json();
      const formatted = (Array.isArray(data) ? data : [])
        .map((item: any) => ({
          type: String(item.type ?? ""),
          label: String(item.label ?? item.text ?? item.name ?? item.title ?? ""),
          slug: String(item.slug ?? ""),
          score:
            item.score === null || item.score === undefined
              ? undefined
              : Number(item.score),
        }))
        .filter((item: any) => item.label.trim() && item.type.trim());

      // Prefer category on Enter if backend suggests one.
      const bestCategory = formatted
        .filter((s: any) => s.type === "category" && s.slug)
        .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))[0];

      if (bestCategory?.slug) {
        // Replace (not push) so Enter doesn't feel like it "waited".
        router.replace(
          `/products?categories=${encodeURIComponent(bestCategory.slug)}`
        );
        return;
      }
      // If no category match, keep the search results page.
    } catch {
      // If backend suggest fails, keep the search results page.
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      // Fast path: navigate immediately so UI updates right away.
      const q = searchQuery.trim();
      setShowSuggestions(false);
      router.push(`/products?search=${encodeURIComponent(q)}`);

      // Background: if backend suggests a category (e.g. Cement), replace URL to category listing.
      void resolveAndNavigateSearch(q);
    }
  };

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 md:px-12 py-2 md:py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-end space-x-6 flex-shrink-0">
            <button
              className="md:hidden p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            <Link href="/" className="hover:cursor-pointer flex items-end">
              <Image
                src={Logo}
                alt="UrbanTitan Logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />

              <span className="text-xl md:text-2xl font-semibold text-black">
                UrbanTitan
              </span>
            </Link>

            <div
              className="hidden sm:flex flex-col cursor-pointer group"
              onClick={() => {
                if (!user) window.location.href = "/login";
              }}
            >
              <p className="text-sm text-gray-700">Welcome</p>
              <p className="font-medium text-gray-900 flex items-center">
                {user ? user.name : "Login/Sign Up"}
                {!user && (
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &gt;
                  </span>
                )}
              </p>
            </div>
          </div>

          <nav className="hidden sm:block">
            <ul className="flex flex-nowrap text-sm text-gray-700 whitespace-nowrap space-x-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-red-600 text-sm md:text-md lg:text-[1.1rem] transition p-2 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-grow max-w-xl mx-0 sm:mx-8 w-full sm:w-auto mt-3 sm:mt-0">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => {
                   if(searchQuery.length >= 2) setShowSuggestions(true);
                }}
                className="w-full text-black py-3 pl-10 pr-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-gray-200 mt-1 z-50 overflow-hidden">
                  {suggestions.map((item, idx) => (
                    <div
                      key={`${item.type}:${item.slug || item.label}:${idx}`}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur event before click
                        handleSelectSearchSuggestion(item);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate">{item.label}</span>
                        <span className="text-[11px] uppercase tracking-wide text-gray-500">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <div
              onClick={() => redirect("/cart")}
              className="relative p-3 border rounded-full cursor-pointer hover:bg-gray-50"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700" />

              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 rounded-full px-2 py-0 text-xs h-5 min-w-[20px] flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </div>

            <DropdownMenu
              open={profile}
              onOpenChange={(value) => setProfile(value)}
            >
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50">
                  <User className="w-6 h-6 text-gray-700" />
                </div>
              </DropdownMenuTrigger>

              {user ? (
                <DropdownMenuContent
                  className="w-max shadow-xs rounded-none rounded-b-lg mt-2"
                  align="end"
                  side="bottom"
                >
                  <div className="px-4 py-2 text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-500 text-xs mt-0.5">ROLE_{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {userLinks.map((link) => (
                    <div key={link.name}>
                      <DropdownMenuItem
                        className={cn(
                          "cursor-pointer text-sm md:text-[1rem] px-4",
                          link.color
                        )}
                        onClick={() => {
                          if (link.name === "Logout") {
                            logout();
                            window.location.href = "/";
                            return;
                          }
                          window.location.href = link.href;
                        }}
                      >
                        {link.name}
                      </DropdownMenuItem>

                      {link.separator && <DropdownMenuSeparator />}
                    </div>
                  ))}
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent
                  className="w-max shadow-xs rounded-none rounded-b-lg mt-2"
                  align="end"
                  side="bottom"
                >
                  <DropdownMenuItem
                    className="cursor-pointer text-sm md:text-[1rem] px-4"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login / Sign Up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Category Links */}
        <div className="border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <DesktopCategory />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-xl py-2 transition-transform duration-300 overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between pb-6 pt-3 px-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block px-4 py-1 text-gray-800 rounded"
              >
                {link.name}
              </a>
            </li>
          ))}

          {/* Mobile Category */}
          <MobileCategory />
        </ul>
      </aside>
    </>
  );
}
