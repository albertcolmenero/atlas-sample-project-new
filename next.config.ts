import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of dynamic imports and client components
  experimental: {
    optimizePackageImports: ['@runonatlas/next'],
  },
  
  // Webpack config to handle Atlas SDK properly
  webpack: (config) => {
    config.externals = config.externals || [];
    
    // Only externalize server components, not client components
    if (config.name === 'server') {
      config.externals.push('@runonatlas/next/server');
    }
    
    return config;
  },
  
  // Production optimizations
  reactStrictMode: true,
};

export default nextConfig;
