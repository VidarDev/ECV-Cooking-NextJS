/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'api-gastronogeek.vercel.app',
        port: '',
        search: '',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/recette',
        destination: '/recettes',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
