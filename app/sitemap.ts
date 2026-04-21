import { MetadataRoute } from 'next'
import entriesData from "../data/entries.json";

// 1. Define the structure so TypeScript understands the JSON data
interface Entry {
  slug: string;
  category: string;
}

const generateCategorySlug = (categoryName: string) => {
  return categoryName
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.journalentrieshub.com';

  // 2. Explicitly cast the imported JSON as an array of Entry
  const entries = entriesData as Entry[];

  // Dynamic Entry URLs
  const entryUrls = entries.map((entry) => ({
    url: `${baseUrl}/entries/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Category Pillar URLs
  const categories = Array.from(new Set(entries.map((e) => e.category)));
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${generateCategorySlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Static Core Hubs
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/suite`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1, 
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
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