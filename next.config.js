/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 🟢 CRITICAL BYPASS: Disables the broken disk caching loop entirely [1]
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // Forces Webpack to compile straight into RAM memory [1]
    }
    return config;
  },
};

module.exports = nextConfig;
