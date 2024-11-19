/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.picsum.photos",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
