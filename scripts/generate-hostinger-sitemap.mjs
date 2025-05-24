// scripts/generate-hostinger-sitemap.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const domain = process.env.SITE_URL || 'https://yourdomain.com'; // Update with your actual domain
const outDir = path.resolve(__dirname, '../out'); // Static export directory
const ignoredPaths = [
  '/_next',
  '/api',
  '/404',
  '/500',
  '/favicon.ico',
  '/.htaccess',
  '/robots.txt',
  '/sitemap.xml',
];

// Priority settings
const pagePriorities = {
  '/': 1.0,
  '/projects/': 0.9,
  '/blog/': 0.8,
  '/about/': 0.7,
  '/contact/': 0.7,
  '/services/': 0.7,
  '/admin/': 0.3,
};

// Frequency settings
const pageFrequencies = {
  '/': 'daily',
  '/projects/': 'weekly',
  '/blog/': 'weekly',
  '/about/': 'monthly',
  '/contact/': 'monthly',
  '/services/': 'monthly',
  '/admin/': 'monthly',
};

// Get default values for pages not explicitly configured
const getDefaultPriority = (path) => {
  if (path.includes('/blog/') && !path.endsWith('/blog/')) return 0.7;
  if (path.includes('/projects/') && !path.endsWith('/projects/')) return 0.8;
  return 0.5;
};

const getDefaultFrequency = (path) => {
  if (path.includes('/blog/') && !path.endsWith('/blog/')) return 'monthly';
  if (path.includes('/projects/') && !path.endsWith('/projects/')) return 'monthly';
  return 'monthly';
};

// Function to generate last modified date
const getLastModified = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (err) {
    return new Date().toISOString().split('T')[0];
  }
};

// Generate sitemap
async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // Check if the out directory exists
  if (!fs.existsSync(outDir)) {
    console.error('Error: The "out" directory does not exist. Run the build command first.');
    process.exit(1);
  }

  // Find all HTML files recursively
  const pages = [];
  
  function scanDirectory(directory, basePath = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(entryPath, relativePath);
      } else if (entry.name === 'index.html') {
        // Convert Windows backslashes to forward slashes for URLs
        let urlPath = ('/' + basePath).replace(/\\/g, '/');
        
        // Skip ignored paths
        if (ignoredPaths.some(ignoredPath => urlPath.startsWith(ignoredPath))) {
          continue;
        }
        
        // Ensure trailing slash
        if (urlPath !== '/' && !urlPath.endsWith('/')) {
          urlPath += '/';
        }
        
        pages.push({
          path: urlPath,
          priority: pagePriorities[urlPath] || getDefaultPriority(urlPath),
          frequency: pageFrequencies[urlPath] || getDefaultFrequency(urlPath),
          lastModified: getLastModified(entryPath),
        });
      }
    }
  }
  
  scanDirectory(outDir);
  
  // Sort pages by priority (highest first)
  pages.sort((a, b) => b.priority - a.priority);
  
  // Generate XML
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const page of pages) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${domain}${page.path}</loc>\n`;
    sitemap += `    <lastmod>${page.lastModified}</lastmod>\n`;
    sitemap += `    <changefreq>${page.frequency}</changefreq>\n`;
    sitemap += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
    sitemap += '  </url>\n';
  }
  
  sitemap += '</urlset>';
  
  // Write sitemap to file
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${pages.length} URLs`);
  
  // Generate robots.txt if it doesn't exist
  const robotsPath = path.join(outDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    const robotsTxt = `# robots.txt
User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
    fs.writeFileSync(robotsPath, robotsTxt);
    console.log('robots.txt created');
  }
}

// Run the generator
generateSitemap().catch(console.error);
