// This file will generate a sitemap.xml file for the website
import { writeFileSync } from 'fs';
import path from 'path';

// Since we can't import TS files in .mjs, we'll hardcode the basic routes
// In a real deployment, you'd want to fetch this data from your API or database

// Base URL of the website
const BASE_URL = 'https://alex-johnson-portfolio.com';

/**
 * Generate sitemap XML content
 * @returns Sitemap XML string
 */
function generateSitemapXml() {
  // Define static routes
  const staticRoutes = [
    '', // home
    '/about',
    '/projects',
    '/blog',
    '/services',
    '/contact',
  ];

  // Create XML header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });
  // Note: Dynamic routes (projects/blog) would be added here in a real deployment
  // For now, we'll just generate the basic sitemap with static routes

  // Close the XML
  sitemap += `
</urlset>`;

  return sitemap;
}

/**
 * Write sitemap to the public directory
 */
function writeSitemap() {
  const sitemap = generateSitemapXml();
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  try {
    writeFileSync(outputPath, sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the sitemap generator
writeSitemap();
