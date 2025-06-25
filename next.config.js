/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  transpilePackages: [
    '@mui/material', 
    '@mui/system', 
    '@mui/icons-material',
    '@emotion/react', 
    '@emotion/styled'
  ],
  // Make sure we can find the MUI components at build time
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
  // This is optional, but helpful for Material UI styles
  reactStrictMode: true,
}

module.exports = nextConfig
