const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
}

module.exports = nextConfig
