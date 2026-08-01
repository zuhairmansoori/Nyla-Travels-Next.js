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

    sitemap: "https://nylatravels.com/sitemap.xml",

    host: "https://nylatravels.com",
  };
}