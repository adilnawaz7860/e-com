/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Option 1: Simple domains array (choose one approach)
    domains: [
      'th.bing.com',
      'www.bhphotovideo.com',
      // Add other domains here
    ],
    
    // Option 2: More controlled remotePatterns (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '/th/id/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bhphotovideo.com',
        pathname: '/images/**',
      },
      // Add more patterns as needed
    ],
    
    // Optional additional image config
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Other Next.js config options can go here
}

// For .mjs files (ES Modules)
export default nextConfig;

// For .js files (CommonJS)
// module.exports = nextConfig;