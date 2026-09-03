/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🟢 ENABLES TRANSTING DYNAMIC SERVER BUNDLING (SMASHES STATIC EXPORT ERRORS)
  output: 'standalone', 
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
