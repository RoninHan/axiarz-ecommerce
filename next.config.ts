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
    ],
  },
};

export default nextConfig;
