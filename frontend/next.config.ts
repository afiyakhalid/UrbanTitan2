import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn-media.buildersmart.in",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-media.buildersmart.in",
        port: "",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.lzzgchina.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img1.exportersindia.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.hiatt-hardware.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
