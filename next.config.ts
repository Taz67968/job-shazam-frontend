import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/jobsDetailspage/:id",
        destination: "/jobs-details/:id",
        permanent: true,
      },
      {
        source: "/find-jobs",
        destination: "/jobs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
