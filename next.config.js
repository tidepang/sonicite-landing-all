/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ioprkugnuswfunqkkvfk.supabase.co",
        pathname: "/storage/v1/object/public/experiences/**",
      },
    ],
  },
};

module.exports = nextConfig;
