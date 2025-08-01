const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,  // отключаем turbopack и используем Webpack
  },
  images: {
    domains: [
      'cdn.umnico.com',
      '43baa55b08d805d5.mokky.dev',
      'cdn-icons-png.flaticon.com',
      'images.icon-icons.com',
      'encrypted-tbn0.gstatic.com',
      'avatar.vercel.sh',
      'via.placeholder.com',
      'img.pikbest.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.clipartmax.com',
      },
    ],
  },
  webpack(config: { resolve: { alias: { [x: string]: any; }; }; }) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;