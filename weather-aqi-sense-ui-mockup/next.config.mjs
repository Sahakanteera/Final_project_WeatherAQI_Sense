/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Final_project_WeatherAQI_Sense',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
