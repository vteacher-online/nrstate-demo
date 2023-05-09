/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
