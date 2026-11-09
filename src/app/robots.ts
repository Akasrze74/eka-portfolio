import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * robots.txt — auto-generated
 * Accessible at: /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
