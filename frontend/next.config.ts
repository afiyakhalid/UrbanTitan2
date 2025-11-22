import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-media.buildersmart.in",
        port: "",
      },
    ],
  },
};

export default nextConfig;
