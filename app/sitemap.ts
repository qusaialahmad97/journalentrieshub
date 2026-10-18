import { MetadataRoute } from 'next'
import entriesData from "../data/entries.json";

// 1. UPDATED INTERFACE: Support BOTH old and new formats
interface Entry {
  slug: string;
  category?: string; // Old format
  core_accounting?: {
    category: string; // New format
  };
}

// 2. HELPER: Safely extract the category regardless of format
const getCategory = (entry: Entry): string => {
  return entry.core_accounting?.category || entry.category || 'Uncategorized';
};

// 3. SLUG GENERATOR: Safely handle missing names
const generateCategorySlug = (categoryName: string) => {
  if (!categoryName) return 'uncategorized';
  return categoryName
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.journalentrieshub.com';
  const entries = entriesData as Entry[];

  const entryUrls = entries.map((entry) => ({
    url: `${baseUrl}/entries/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // FIX: Extract categories using the helper
  const categories = Array.from(new Set(entries.map((e) => getCategory(e))));
  
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${generateCategorySlug(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/suite`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [...staticPages, ...categoryUrls, ...entryUrls];
}