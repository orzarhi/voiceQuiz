/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['uploadthing.com', 'lh3.googleusercontent.com',"avatars.githubusercontent.com"],
    },
    experimental: {
      appDir: true
  },
  headers: () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
}
  
  module.exports = nextConfig
  