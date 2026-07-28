import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply this to every single page on your site
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.google.com https://*.googleads.g.doubleclick.net https://adsense.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;