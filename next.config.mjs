/** @type {import('next').NextConfig} */
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
  basePath: '/jaden-blog',
  ...(process.env.NODE_ENV === 'development' ? {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/jaden-blog/',
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
