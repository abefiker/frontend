import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration options for Next.js
  images: {
    // Specify the allowed domains for external images
    domains: ['files.edgestore.dev'],
  },
  // You can add more configuration options here
  reactStrictMode: true, // Optional: Enables React's Strict Mode
  // Add other configurations as needed
};

export default nextConfig;