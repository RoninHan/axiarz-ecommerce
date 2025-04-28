import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.waveshare.net',
        port: '',
        pathname: '/photo/column/AI/1.jpg',
      },
      {
        protocol: 'https',
        hostname: 'www.waveshare.net',
        port: '',
        pathname: '/photo/column/Arduino-Nucleo/1.jpg',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8081',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8081',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*',
      },
    ];
  },
};

export default nextConfig;
