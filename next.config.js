/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: [
      "chinatrace.org"
    ]
  },
  experimental: {
    serverActions: true
  },
}

module.exports = nextConfig
