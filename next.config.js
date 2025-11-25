/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This tells Next.js which external domains are allowed to serve images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        port: '', 
        pathname: '/**', 
      },
    ],
  },

//   env: {
//     NEXT_PUBLIC_API_BASE_URL: 'http://localhost:5000',
//   },
};

module.exports = nextConfig;