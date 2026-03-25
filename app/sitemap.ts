import { MetadataRoute } from 'next'
import entries from '../data/entries.json'

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your actual domain once you buy it
  const baseUrl = 'https://www.journalentrieshub.com'

  // This part auto-generates the list from your JSON
  const entryUrls = entries.map((entry) => ({
    url: `${baseUrl}/entries/${entry.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Entries are important
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0, // Homepage is most important
    },
    ...entryUrls,
  ]
}