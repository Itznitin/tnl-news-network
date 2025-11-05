/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','ichef.bbci.co.uk','cdn.cnn.com','static01.nyt.com','media.istockphoto.com'],
    formats: ['image/avif','image/webp']
  }
}
module.exports = nextConfig
