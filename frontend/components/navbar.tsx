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
import { type CategoryLink, categoryLinks } from "@/lib/constants";

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

            <div className="text-2xl md:text-3xl font-semibold flex justify-center items-end bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
              UrbanTitan
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
