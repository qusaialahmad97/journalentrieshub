import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // This tells ALL search engines (Google, Bing, DuckDuckGo)
      allow: '/',     // They are allowed to crawl your entire site
      disallow: '/private/', // If you ever add an admin area, this keeps it hidden
    },
    // Replace with your actual domain when you buy it
    sitemap: 'https://www.journalentrieshub.com/sitemap.xml', 
  }
}