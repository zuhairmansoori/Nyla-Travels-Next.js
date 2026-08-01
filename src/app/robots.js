// app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin*",
          "/api*",
        ],
      },
    ],

    sitemap: "https://www.nylatravels.com/sitemap.xml",

    host: "https://www.nylatravels.com",
  };
}