// scripts/check-hostinger-compatibility.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../out');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

console.log(`${colors.cyan}=== Hostinger Compatibility Check ===${colors.reset}\n`);

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error(`${colors.red}❌ The "out" directory does not exist. Run the build command first.${colors.reset}`);
  process.exit(1);
}

const checkResults = {
  pass: 0,
  warn: 0,
  fail: 0,
};

// Helper functions
function pass(message) {
  console.log(`${colors.green}✓ PASS: ${message}${colors.reset}`);
  checkResults.pass++;
}

function warn(message) {
  console.log(`${colors.yellow}⚠ WARNING: ${message}${colors.reset}`);
  checkResults.warn++;
}

function fail(message) {
  console.log(`${colors.red}❌ FAIL: ${message}${colors.reset}`);
  checkResults.fail++;
}

// Check for .htaccess file
function checkHtaccess() {
  console.log(`\n${colors.cyan}Checking .htaccess configuration...${colors.reset}`);
  
  const htaccessPath = path.join(outDir, '.htaccess');
  if (fs.existsSync(htaccessPath)) {
    const content = fs.readFileSync(htaccessPath, 'utf8');
    
    pass('.htaccess file exists');
    
    if (content.includes('RewriteEngine On')) {
      pass('.htaccess contains URL rewriting rules');
    } else {
      warn('.htaccess does not contain URL rewriting rules. This may cause issues with routing.');
    }
    
    if (content.includes('ExpiresByType')) {
      pass('.htaccess contains browser caching rules');
    } else {
      warn('.htaccess does not contain browser caching rules. This may affect performance.');
    }
    
    if (content.includes('DEFLATE')) {
      pass('.htaccess contains GZIP compression');
    } else {
      warn('.htaccess does not enable GZIP compression. This may affect performance.');
    }
  } else {
    fail('.htaccess file is missing. This will cause routing issues on Hostinger.');
    warn('Copy the .htaccess file from public/ to out/ directory before uploading.');
  }
}

// Check for index.html
function checkIndexHtml() {
  console.log(`\n${colors.cyan}Checking main HTML files...${colors.reset}`);
  
  const indexPath = path.join(outDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    pass('index.html exists');
    
    // Check content
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('<link rel="stylesheet"') || content.includes('<style')) {
      pass('index.html contains styles');
    } else {
      warn('index.html might be missing styles');
    }
    
    if (content.includes('<script')) {
      pass('index.html contains scripts');
    } else {
      warn('index.html might be missing scripts');
    }
  } else {
    fail('index.html is missing. Build process may have failed.');
  }
  
  // Check 404 page
  const notFoundPath = path.join(outDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    pass('404.html exists');
  } else {
    warn('404.html is missing. Custom error pages may not work.');
  }
}

// Check static assets
function checkStaticAssets() {
  console.log(`\n${colors.cyan}Checking static assets...${colors.reset}`);
  
  // Check _next directory
  const nextDir = path.join(outDir, '_next');
  if (fs.existsSync(nextDir)) {
    pass('_next directory exists');
    
    // Check for static chunks
    const staticDir = path.join(nextDir, 'static');
    if (fs.existsSync(staticDir)) {
      pass('_next/static directory exists');
      
      // Check for JS chunks
      const chunksDir = path.join(staticDir, 'chunks');
      if (fs.existsSync(chunksDir)) {
        const jsFiles = fs.readdirSync(chunksDir).filter(file => file.endsWith('.js'));
        if (jsFiles.length > 0) {
          pass(`Found ${jsFiles.length} JavaScript chunks`);
        } else {
          warn('No JavaScript chunks found. This is unusual.');
        }
      } else {
        warn('chunks directory is missing');
      }
      
      // Check for CSS
      const cssDir = path.join(staticDir, 'css');
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        if (cssFiles.length > 0) {
          pass(`Found ${cssFiles.length} CSS files`);
        } else {
          warn('No CSS files found. This is unusual.');
        }
      } else {
        warn('css directory is missing');
      }
    } else {
      fail('_next/static directory is missing');
    }
  } else {
    fail('_next directory is missing. Build process may have failed.');
  }
  
  // Check images
  const imagesDir = path.join(outDir, 'images');
  if (fs.existsSync(imagesDir)) {
    pass('images directory exists');
  } else {
    warn('images directory is missing. Check if images are included in another location.');
  }
}

// Check routes
function checkRoutes() {
  console.log(`\n${colors.cyan}Checking routes...${colors.reset}`);
  
  const expectedRoutes = [
    '/',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/admin',
  ];
  
  for (const route of expectedRoutes) {
    const routePath = path.join(outDir, route === '/' ? '' : route);
    if (fs.existsSync(routePath)) {
      const indexFile = path.join(routePath, 'index.html');
      if (fs.existsSync(indexFile)) {
        pass(`Route ${route} exists with index.html`);
      } else {
        warn(`Route ${route} exists but is missing index.html`);
      }
    } else {
      warn(`Route ${route} is missing`);
    }
  }
}

// Check for robots.txt and sitemap.xml
function checkSEO() {
  console.log(`\n${colors.cyan}Checking SEO files...${colors.reset}`);
  
  const robotsPath = path.join(outDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    pass('robots.txt exists');
    
    const content = fs.readFileSync(robotsPath, 'utf8');
    if (content.includes('Sitemap:')) {
      pass('robots.txt references sitemap');
    } else {
      warn('robots.txt does not reference sitemap');
    }
  } else {
    warn('robots.txt is missing');
  }
  
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    pass('sitemap.xml exists');
    
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const urlCount = (content.match(/<url>/g) || []).length;
    pass(`sitemap.xml contains ${urlCount} URLs`);
  } else {
    warn('sitemap.xml is missing');
  }
}

// Check for large files
function checkLargeFiles() {
  console.log(`\n${colors.cyan}Checking for large files...${colors.reset}`);
  
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  let largeFiles = [];
  
  function scanForLargeFiles(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        scanForLargeFiles(fullPath);
      } else {
        const stats = fs.statSync(fullPath);
        if (stats.size > MAX_FILE_SIZE) {
          largeFiles.push({
            path: fullPath.replace(outDir, ''),
            size: (stats.size / 1024 / 1024).toFixed(2) + ' MB'
          });
        }
      }
    }
  }
  
  scanForLargeFiles(outDir);
  
  if (largeFiles.length === 0) {
    pass('No large files (>2MB) found');
  } else {
    warn(`Found ${largeFiles.length} large files that may slow down upload:`);
    largeFiles.forEach(file => {
      console.log(`  - ${file.path} (${file.size})`);
    });
  }
}

// Run all checks
checkHtaccess();
checkIndexHtml();
checkStaticAssets();
checkRoutes();
checkSEO();
checkLargeFiles();

// Print summary
console.log(`\n${colors.cyan}=== Summary ===${colors.reset}`);
console.log(`${colors.green}✓ Passed: ${checkResults.pass}${colors.reset}`);
console.log(`${colors.yellow}⚠ Warnings: ${checkResults.warn}${colors.reset}`);
console.log(`${colors.red}❌ Failed: ${checkResults.fail}${colors.reset}`);

if (checkResults.fail > 0) {
  console.log(`\n${colors.red}⚠ Critical issues found! Fix before deploying to Hostinger.${colors.reset}`);
  process.exit(1);
} else if (checkResults.warn > 0) {
  console.log(`\n${colors.yellow}⚠ Some warnings found. Review before deploying to Hostinger.${colors.reset}`);
} else {
  console.log(`\n${colors.green}✓ All checks passed! Your build is ready for Hostinger deployment.${colors.reset}`);
}

// Create a report file
const reportContent = `# Hostinger Compatibility Report
Generated on: ${new Date().toLocaleString()}

## Summary
- ✓ Passed: ${checkResults.pass}
- ⚠ Warnings: ${checkResults.warn}
- ❌ Failed: ${checkResults.fail}

${checkResults.fail > 0 ? '⚠ Critical issues found! Fix before deploying to Hostinger.' : 
  checkResults.warn > 0 ? '⚠ Some warnings found. Review before deploying to Hostinger.' :
  '✓ All checks passed! Your build is ready for Hostinger deployment.'}

See HOSTINGER_DEPLOYMENT_GUIDE.md and DEPLOYMENT_CHECKLIST.md for more information.
`;

fs.writeFileSync(path.join(__dirname, '../HOSTINGER_COMPATIBILITY_REPORT.md'), reportContent);
console.log(`\n${colors.blue}Report saved to HOSTINGER_COMPATIBILITY_REPORT.md${colors.reset}`);
