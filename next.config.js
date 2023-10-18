/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
    serverActions: true,
  },
  images: {
    domains: ["nnifz1ly0wb4ryzh.public.blob.vercel-storage.com"],
  },
};

module.exports = nextConfig;
