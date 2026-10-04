import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube video thumbnails
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
