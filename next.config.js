/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
    },
    images: {
        domains: ["unsplash.com", "images.unsplash.com", "source.unsplash.com"],
    },
}

module.exports = nextConfig
