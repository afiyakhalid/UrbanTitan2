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

interface CategoryLink {
  name: string;
  href: string;
  children?: CategoryLink[];
}

const categoryLinks: CategoryLink[] = [
  {
    name: "Cement",
    href: "/cement",
    children: [
      { name: "OPC-53 Grade Cement", href: "/cement/opc-53-grade-cement" },
      { name: "PPC Cement", href: "/cement/ppc-cement" },
    ],
  },
  {
    name: "Sand & Aggregates",
    href: "/sand-aggregates",
    children: [],
  },
  {
    name: "TMT Steel Bars",
    href: "/tmt-steel-bars",
    children: [
      {
        name: "Fe-500 Grade TMT Bars",
        href: "/tmt-steel-bars/fe-500-grade-tmt-bars",
      },
      {
        name: "Fe-550 Grade TMT Bars",
        href: "/tmt-steel-bars/fe-550-grade-tmt-bars",
      },
      { name: "TMT Binding Wire", href: "/tmt-steel-bars/tmt-binding-wire" },
      { name: "Rebar Couplers", href: "/tmt-steel-bars/rebar-couplers" },
    ],
  },
  {
    name: "Bricks & Blocks",
    href: "/bricks-blocks",
    children: [
      {
        name: "Concrete Solid Blocks",
        href: "/bricks-blocks/concrete-solid-blocks",
      },
      { name: "Flyash Bricks", href: "/bricks-blocks/flyash-bricks" },
      {
        name: "Autoclaved Aerated Concrete (AAC) Blocks",
        href: "/bricks-blocks/autoclaved-aerated-concrete-aac-blocks",
      },
      { name: "Red Bricks", href: "/bricks-blocks/red-bricks" },
    ],
  },
  {
    name: "Electrical",
    href: "/electrical",
    children: [
      {
        name: "Conduit Pipes and Fittings",
        href: "/electrical/conduit-pipes-fittings",
      },
      { name: "Wires and Cables", href: "/electrical/wires-cables" },
      {
        name: "Modular Switches and Sockets",
        href: "/electrical/modular-switches-sockets",
      },
      { name: "Electric Panels", href: "/electrical/electric-panels" },
      { name: "Others", href: "/electrical/others" },
      {
        name: "Switch Gear (DB/MCB/RCCB etc.)",
        href: "/electrical/switch-gear",
      },
    ],
  },
  {
    name: "Plumbing",
    href: "/plumbing",
    children: [
      {
        name: "CPVC Pipes and Fittings",
        href: "/plumbing/cpvc-pipes-fittings",
      },
      {
        name: "UPVC Pipes and Fittings",
        href: "/plumbing/upvc-pipes-fittings",
      },
      { name: "SWR Pipes and Fittings", href: "/plumbing/swr-pipes-fittings" },
      { name: "SWG Pipes", href: "/plumbing/swg-pipes" },
      {
        name: "Specials and Accessories",
        href: "/plumbing/specials-accessories",
      },
    ],
  },
  {
    name: "Wooden Products",
    href: "/wooden-products",
    children: [
      { name: "Plywood", href: "/wooden-products/plywood" },
      { name: "Block Boards", href: "/wooden-products/block-boards" },
      {
        name: "Decorative Laminates",
        href: "/wooden-products/decorative-laminates",
      },
      { name: "Veneers", href: "/wooden-products/veneers" },
    ],
  },
  {
    name: "Tiles",
    href: "/tiles",
    children: [
      { name: "Floor Tiles", href: "/tiles/floor-tiles" },
      { name: "Wall Tiles", href: "/tiles/wall-tiles" },
      { name: "Parking Tiles", href: "/tiles/parking-tiles" },
      { name: "Vitrified Tiles", href: "/tiles/vitrified-tiles" },
    ],
  },
  {
    name: "Bathroom Accessories",
    href: "/bathroom-accessories",
    children: [
      { name: "Faucets", href: "/bathroom-accessories/faucets" },
      { name: "Showers", href: "/bathroom-accessories/showers" },
      { name: "Sanitaryware", href: "/bathroom-accessories/sanitaryware" },
      {
        name: "Other Accessories",
        href: "/bathroom-accessories/other-accessories",
      },
    ],
  },
  {
    name: "Hardware Fixtures",
    href: "/hardware-fixtures",
    children: [
      { name: "Luxury Handles", href: "/hardware-fixtures/luxury-handles" },
      { name: "Premium Handles", href: "/hardware-fixtures/premium-handles" },
      {
        name: "Stainless Steel Handles",
        href: "/hardware-fixtures/stainless-steel-handles",
      },
      {
        name: "Stainless Steel Pull Handles",
        href: "/hardware-fixtures/stainless-steel-pull-handles",
      },
      { name: "Mortise Locks", href: "/hardware-fixtures/mortise-locks" },
      { name: "Latches and Hinges", href: "/hardware-fixtures/latches-hinges" },
      {
        name: "Drawer and Cabinet Hardware",
        href: "/hardware-fixtures/drawer-cabinet-hardware",
      },
      {
        name: "Euro Profile Cylinders",
        href: "/hardware-fixtures/euro-profile-cylinders",
      },
    ],
  },
  {
    name: "Paints & Finishes",
    href: "/paints-finishes",
    children: [
      { name: "Wall Care Putty", href: "/paints-finishes/wall-care-putty" },
      {
        name: "Decorative Paint Coating",
        href: "/paints-finishes/decorative-paint-coating",
      },
      {
        name: "Texture & Wall Care Finishes",
        href: "/paints-finishes/texture-wall-care-finishes",
      },
    ],
  },
  {
    name: "Lighting & Fixtures",
    href: "/lighting-fixtures",
    children: [
      {
        name: "Indoor Luminaires",
        href: "/lighting-fixtures/indoor-luminaires",
      },
      { name: "Office Lighting", href: "/lighting-fixtures/office-lighting" },
      {
        name: "Outdoor Luminaires",
        href: "/lighting-fixtures/outdoor-luminaires",
      },
      {
        name: "Roadway LED Lighting",
        href: "/lighting-fixtures/roadway-led-lighting",
      },
      {
        name: "Lighting Electronics and Controls",
        href: "/lighting-fixtures/electronics-controls",
      },
    ],
  },
  {
    name: "Natural Stones",
    href: "/natural-stones",
    children: [
      { name: "Granites", href: "/natural-stones/granites" },
      { name: "Marbles", href: "/natural-stones/marbles" },
    ],
  },
  {
    name: "RMC (Ready Mix Concrete)",
    href: "/rmc-ready-mix-concrete",
    children: [],
  },
  {
    name: "Roofing Solutions",
    href: "/roofing-solutions",
    children: [],
  },
  {
    name: "UPVC Doors & Windows",
    href: "/upvc-doors-windows",
    children: [
      { name: "UPVC Doors", href: "/upvc-doors-windows/upvc-doors" },
      { name: "UPVC Windows", href: "/upvc-doors-windows/upvc-windows" },
    ],
  },
  {
    name: "Home Automation",
    href: "/home-automation",
    children: [],
  },
  {
    name: "Home Decor",
    href: "/home-decor",
    children: [
      { name: "Interior/Exterior", href: "/home-decor/interior-exterior" },
      { name: "Home Accessories", href: "/home-decor/home-accessories" },
      { name: "Writing Boards", href: "/home-decor/writing-boards" },
    ],
  },
  {
    name: "Modular Kitchen",
    href: "/modular-kitchen",
    children: [
      { name: "RO System", href: "/modular-kitchen/ro-system" },
      { name: "Accessories", href: "/modular-kitchen/accessories" },
    ],
  },
  {
    name: "Construction Chemicals",
    href: "/construction-chemicals",
    children: [
      { name: "Adhesive", href: "/construction-chemicals/adhesive" },
      { name: "Dry Mix", href: "/construction-chemicals/dry-mix" },
      { name: "Solvents", href: "/construction-chemicals/solvents" },
    ],
  },
  {
    name: "Glass Hardware",
    href: "/glass-hardware",
    children: [{ name: "Mirrors", href: "/glass-hardware/mirrors" }],
  },
];

const navLinks: NavLink[] = [
  { name: "Top Brands", href: "/top-brands" },
  { name: "Local Brands", href: "/local-brands" },
];

const userLinks: UserLink[] = [
  { name: "Personal Details", href: "/profile" },
  { name: "Orders", href: "/orders" },
  { name: "Addresses", href: "/addresses", separator: true },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Help & Support", href: "/support", separator: true },
  { name: "Logout", href: "/logout", color: "text-red-400" },
];

function DesktopCategory() {
  const [openMenu, setOpenMenu] = React.useState<number | null>(null);

  return (
    <div className="hidden sm:block border-t border-gray-200 bg-white relative z-40">
      <nav className="overflow-x-auto scrollbar-hide px-10 py-3">
        <ul className="flex flex-nowrap text-sm text-gray-700 whitespace-nowrap space-x-3">
          {categoryLinks.map((link, index) => (
            <li
              key={link.name}
              className="relative"
              onMouseEnter={() => setOpenMenu(index)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {link.children && link.children.length > 0 ? (
                <DropdownMenu
                  modal={false}
                  open={openMenu === index}
                  onOpenChange={(isOpen) => setOpenMenu(isOpen ? index : null)}
                >
                  <DropdownMenuTrigger className="cursor-pointer" asChild>
                    <button className="cursor-pointer hover:text-red-600 text-sm md:text-md lg:text-[1.02rem] transition p-2 focus:outline-none focus:ring-0 data-[state=open]:outline-none data-[state=open]:ring-0">
                      {link.name}
                    </button>
                  </DropdownMenuTrigger>

                  {link.children && link.children.length > 0 && (
                    <DropdownMenuContent
                      className="w-max shadow-xs rounded-none rounded-b-lg mt-2"
                      align="center"
                      side="bottom"
                    >
                      {link.children.map((child) => (
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
                  onClick={() => (window.location.href = link.href)}
                  className="cursor-pointer hover:text-red-600 text-sm md:text-md lg:text-[1rem] transition p-2"
                >
                  {link.name}
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
        {categoryLinks.map((cat, idx) => (
          <MobileCategoryItem key={idx} item={cat} level={1} />
        ))}
      </ul>
    </li>
  );
}

export function Header() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-12 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-end space-x-6 flex-shrink-0">
            <button
              className="sm:hidden p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            <div className="text-2xl font-normal text-red-600 flex justify-center items-end">
              Urban Titan
            </div>

            <div className="hidden sm:flex flex-col cursor-pointer group">
              <p className="text-sm text-gray-700">Welcome</p>
              <p className="font-medium text-gray-900 flex items-center">
                Login/Sign Up
                <span className="transition-transform group-hover:translate-x-0.5">
                  &gt;
                </span>
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
                placeholder="Search"
                className="w-full text-black py-3 pl-10 pr-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            <div className="p-3 border rounded-full cursor-pointer hover:bg-gray-50">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
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

              {userLinks.length > 0 && (
                <DropdownMenuContent
                  className="w-max shadow-xs rounded-none rounded-b-lg mt-2"
                  align="end"
                  side="bottom"
                >
                  {userLinks.map((link) => (
                    <div key={link.name}>
                      <DropdownMenuItem
                        className={cn(
                          "cursor-pointer text-sm md:text-[1rem] px-4",
                          link.color
                        )}
                        onClick={() => (window.location.href = link.href)}
                      >
                        {link.name}
                      </DropdownMenuItem>

                      {link.separator && <DropdownMenuSeparator />}
                    </div>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Category Links */}
        <DesktopCategory />
      </header>

      {/* Hamburger Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

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

        <ul className="space-y-3">
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
