/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  allowedDevOrigins: ['epixylous-chromatographic-linda.ngrok-free.dev','192.168.1.11'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      }
    ],
  },
};

export default nextConfig;
