import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration options for Next.js
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        pathname: "/7znhbjper3u9qqjj/**",
      },
    ],
  },
  // You can add more configuration options here
  reactStrictMode: true, // Optional: Enables React's Strict Mode
  // Add other configurations as needed
};

export default nextConfig;