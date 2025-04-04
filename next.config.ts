import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false,
  },
  domains: [
    {
      domain: 'i.imgur.com',
      
    }
  ],
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'luxury-villas-two.vercel.app',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: false,
};

export default withPayload(nextConfig);
