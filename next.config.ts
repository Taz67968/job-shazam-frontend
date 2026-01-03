import type { NextConfig } from "next";

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
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/lohinPage",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/loginPage",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/ContactUsPage",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Jobspage",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/jobsDetailspage/:id",
        destination: "/jobs/:id",
        permanent: true,
      },
      {
        source: "/find-jobs",
        destination: "/jobs",
        permanent: true,
      },
      {
        source: "/registerPage",
        destination: "/register",
        permanent: true,
      },
      {
        source: "/verifyPage",
        destination: "/verify",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
