/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  

  
  allowedDevOrigins: ['epixylous-chromatographic-linda.ngrok-free.dev','192.168.1.10'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      },
      {
        protocol:'https',
        hostname: 'www.gstatic.com'
      }
    ],
  },
  experimental:{
    serverActions:{
      bodySizeLimit:'20mb'
    }
  }
};

export default nextConfig;
