/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Ignore linting errors during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ (Optional) Ignore TypeScript build errors during deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
