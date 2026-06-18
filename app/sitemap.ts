import { MetadataRoute } from 'next'
import entriesData from "../data/entries.json";

// 1. Define the structure so TypeScript understands the JSON data
interface Entry {
  slug: string;
  category: string;
}

// XML escaping helper to prevent sitemap errors
const escapeXml = (unsafe: string) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
};

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

  // Dynamic Entry URLs (wrapped in escapeXml)
  const entryUrls = entries.map((entry) => ({
    url: escapeXml(`${baseUrl}/entries/${entry.slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Category Pillar URLs (wrapped in escapeXml)
  const categories = Array.from(new Set(entries.map((e) => e.category)));
  const categoryUrls = categories.map((cat) => ({
    url: escapeXml(`${baseUrl}/categories/${generateCategorySlug(cat)}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Static Core Hubs (wrapped in escapeXml)
  const staticPages = [
    {
      url: escapeXml(baseUrl),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: escapeXml(`${baseUrl}/suite`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1, 
    },
    {
      url: escapeXml(`${baseUrl}/news`),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: escapeXml(`${baseUrl}/glossary`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: escapeXml(`${baseUrl}/about`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...categoryUrls, ...entryUrls];
}