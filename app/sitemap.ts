import { MetadataRoute } from 'next'
import entries from "../data/entries.json";

// NEW: The exact same SEO slug generator used in your pages
const generateCategorySlug = (categoryName: string) => {
  return categoryName
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.journalentrieshub.com';

  // 1. Dynamic Entry URLs (The high-volume pages)
  const entryUrls = entries.map((entry) => ({
    url: `${baseUrl}/entries/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 2. Dynamic Category Pillar URLs (The authority hubs)
  const categories = Array.from(new Set(entries.map((e) => e.category)));
  const categoryUrls = categories.map((cat) => ({
    // FIX: Using the slug generator instead of encodeURIComponent
    url: `${baseUrl}/categories/${generateCategorySlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority than entries because they are "Pillars"
  }));

  // 3. Static Core Hubs
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1, // Homepage is King
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Freshness signal
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...categoryUrls, ...entryUrls];
}