/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';
const basePath = isVercel ? '' : '/jaden-blog';

const nextConfig = {
  /* config options here */
  turbopack: {
      rules: {
        '*.md': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  reactCompiler: true,
  output: 'export',
  trailingSlash: true,
  basePath: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(process.env.NODE_ENV === 'development' && basePath ? {
    async redirects() {
      return [
        {
          source: '/',
          destination: `${basePath}/`,
          basePath: false,
          permanent: false,
        },
      ];
    }
  } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  devIndicators: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
