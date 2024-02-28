/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PAGE_SIZE: "20",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
  redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/',
      //   permanent: true,
      // }
    ];
  },
};

module.exports = nextConfig;
