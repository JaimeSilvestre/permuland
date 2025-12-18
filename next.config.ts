import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // @ts-expect-error - legacy/experimental property might miss type definition
  server: {
    allowedDevOrigins: ["localhost:3000", "192.168.1.43:3000"],
  },
};

export default nextConfig;
