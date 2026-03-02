import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tarot-sigma-wheat.vercel.app/sitemap.xml",
  };
}
