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
    domains: ['localhost']
  }
};

export default withPayload(nextConfig);
