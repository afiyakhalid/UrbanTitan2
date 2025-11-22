"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

const policyLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Fees & Payments", href: "/fees-payments" },
  { name: "Cancellation & Refund Policy", href: "/cancellation-refund" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Shipping & Delivery Policy", href: "/shipping" },
  { name: "Rewards Policy", href: "/rewards" },
  { name: "Promotions Terms & Conditions", href: "/promotions-terms" },
];

const onlyOnTiraBrands = [
  "KIKO Milano",
  "Nails Our Way",
  "Muzigae Mansion",
  "Ahava",
  "Augustinus Bader",
  "Patchology",
  "Allies Of Skin",
  "9°Skin",
  "82°E",
  "Tira",
];

const popularBrands = [
  "Beauty of Joseon",
  "SKIN1004",
  "Huda Beauty",
  "FENTY BEAUTY",
  "Laneige",
  "M·A·C",
  "COSRX",
  "TIRTIR",
  "Lakme",
  "Minimalist",
];

const SocialIcon: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-xl text-gray-800 hover:text-red-600 transition duration-200 mx-2"
  >
    {children}
  </a>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col mb-4 md:mb-0">
          <p className="text-sm md:text-[1.1rem] font-semibold text-gray-900 mb-4">
            © {currentYear} Urban Titan. All Rights Reserved.
          </p>

          <div className="flex flex-wrap text-xs md:text-sm text-gray-700 space-x-4 md:space-x-6 space-y-4">
            {policyLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[1rem] hover:text-red-600 whitespace-nowrap mb-1"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex">
            <SocialIcon href="https://facebook.com/urban-titan">
              <Facebook />
            </SocialIcon>

            <SocialIcon href="https://instagram.com/urban-titan">
              <Instagram />
            </SocialIcon>

            <SocialIcon href="https://twitter.com/urban-titan">
              <Twitter />
            </SocialIcon>

            <SocialIcon href="https://youtube.com/urban-titan">
              <Youtube />
            </SocialIcon>
          </div>

          <a
            href="https://play.google.com/store/apps/details?id=com.jio.tira"
            target="_blank"
            rel="noopener noreferrer"
          ></a>

          <a
            href="https://apps.apple.com/in/app/tira/id1612716174"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </footer>
  );
}
