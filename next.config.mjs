// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other configuration options here
  env: {
    // Add environment variables here if needed
  },
  // Configure webpack if needed
  webpack: (config) => {
    // Add any webpack customizations here
    return config;
  },
};

export default nextConfig;