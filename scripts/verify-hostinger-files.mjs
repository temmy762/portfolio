// scripts/verify-hostinger-files.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../out');

// ANSI color codes for better output formatting
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
};

console.log(`${colors.cyan}${colors.bold}Hostinger Upload File Verification${colors.reset}\n`);

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error(`${colors.red}❌ ERROR: The "out" directory does not exist.${colors.reset}`);
  console.log(`${colors.yellow}Please run "npm run hostinger:prepare" first.${colors.reset}`);
  process.exit(1);
}

// Essential files that must be present
const essentialFiles = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  '.htaccess',
  '_next/static/chunks',  // Directory
  '_next/static/css',     // Directory
  'images'               // Directory
];

// Important page routes that should have HTML files
const expectedRoutes = [
  '', // root
  'about',
  'projects',
  'blog',
  'contact',
  'admin'
  // Add other important routes as needed
];

// Main verification function
function verifyFiles() {
  const issues = [];
  const warnings = [];
  let allEssentialFiles = true;
  let hasHtaccess = false;

  console.log(`${colors.blue}Checking essential files...${colors.reset}`);
  
  // Check essential files
  essentialFiles.forEach(file => {
    const filePath = path.join(outDir, file);
    
    if (fs.existsSync(filePath)) {
      if (file === '.htaccess') {
        hasHtaccess = true;
      }
      console.log(`${colors.green}✓ ${file} exists${colors.reset}`);
      
      // Check if it's a directory that should have content
      if (file.includes('/') && fs.statSync(filePath).isDirectory()) {
        const items = fs.readdirSync(filePath);
        if (items.length === 0) {
          console.log(`${colors.yellow}⚠ WARNING: ${file} directory is empty${colors.reset}`);
          warnings.push(`${file} directory exists but is empty`);
        } else {
          console.log(`  - Contains ${items.length} items`);
        }
      }
    } else {
      console.log(`${colors.red}❌ MISSING: ${file}${colors.reset}`);
      issues.push(`Missing essential file: ${file}`);
      allEssentialFiles = false;
      
      if (file === '.htaccess') {
        console.log(`${colors.yellow}⚠ WARNING: .htaccess is critical for routing on Hostinger${colors.reset}`);
      }
    }
  });
  
  console.log(`\n${colors.blue}Checking page routes...${colors.reset}`);
  
  // Check expected routes
  expectedRoutes.forEach(route => {
    const routePath = path.join(outDir, route);
    const indexFile = path.join(routePath, 'index.html');
    
    if (fs.existsSync(routePath)) {
      if (fs.existsSync(indexFile)) {
        console.log(`${colors.green}✓ /${route} has index.html${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠ /${route} exists but is missing index.html${colors.reset}`);
        warnings.push(`Route /${route} exists but is missing index.html`);
      }
    } else {
      console.log(`${colors.red}❌ MISSING: /${route} route${colors.reset}`);
      issues.push(`Missing expected route: /${route}`);
    }
  });
  
  // Check .htaccess content if it exists
  if (hasHtaccess) {
    console.log(`\n${colors.blue}Analyzing .htaccess file...${colors.reset}`);
    const htaccessContent = fs.readFileSync(path.join(outDir, '.htaccess'), 'utf8');
    
    if (htaccessContent.includes('RewriteEngine On')) {
      console.log(`${colors.green}✓ .htaccess has URL rewriting enabled${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠ .htaccess may not have proper URL rewriting rules${colors.reset}`);
      warnings.push('.htaccess may not have proper URL rewriting rules');
    }
    
    if (htaccessContent.includes('ExpiresByType') || htaccessContent.includes('ExpiresActive On')) {
      console.log(`${colors.green}✓ .htaccess has browser caching rules${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠ .htaccess may not have browser caching rules${colors.reset}`);
      warnings.push('.htaccess may not have browser caching rules');
    }
  }
  
  // Check for large files that might cause upload issues
  console.log(`\n${colors.blue}Checking for large files...${colors.reset}`);
  const largeFiles = findLargeFiles(outDir, 2 * 1024 * 1024); // 2MB threshold
  
  if (largeFiles.length > 0) {
    console.log(`${colors.yellow}⚠ Found ${largeFiles.length} large files (>2MB) that might slow down upload:${colors.reset}`);
    largeFiles.forEach(file => {
      console.log(`  - ${file.path} (${file.size})`);
    });
    warnings.push(`${largeFiles.length} large files might slow down the upload process`);
  } else {
    console.log(`${colors.green}✓ No large files found${colors.reset}`);
  }
  
  // Estimate total size
  console.log(`\n${colors.blue}Calculating total upload size...${colors.reset}`);
  const totalSize = calculateDirectorySize(outDir);
  console.log(`${colors.white}Total upload size: ${formatBytes(totalSize)}${colors.reset}`);
  
  // Print summary
  console.log(`\n${colors.cyan}${colors.bold}=== Summary ===${colors.reset}`);
  
  if (issues.length === 0 && warnings.length === 0) {
    console.log(`${colors.green}${colors.bold}✓ All checks passed! Your files are ready for upload to Hostinger.${colors.reset}`);
  } else {
    if (issues.length > 0) {
      console.log(`${colors.red}${colors.bold}Critical Issues (${issues.length}):${colors.reset}`);
      issues.forEach(issue => {
        console.log(`${colors.red}- ${issue}${colors.reset}`);
      });
    }
    
    if (warnings.length > 0) {
      console.log(`${colors.yellow}${colors.bold}Warnings (${warnings.length}):${colors.reset}`);
      warnings.forEach(warning => {
        console.log(`${colors.yellow}- ${warning}${colors.reset}`);
      });
    }
    
    if (issues.length > 0) {
      console.log(`\n${colors.red}${colors.bold}Please fix these issues before uploading to Hostinger.${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}${colors.bold}Please review the warnings, but you can proceed with upload.${colors.reset}`);
    }
  }
  
  // Create a checklist for upload
  createUploadChecklist(issues, warnings, totalSize);
}

// Find large files that might cause upload issues
function findLargeFiles(directory, threshold) {
  const largeFiles = [];
  
  function scan(dir, baseDir = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = baseDir ? path.join(baseDir, entry.name) : entry.name;
      
      if (entry.isDirectory()) {
        scan(fullPath, relativePath);
      } else {
        const stats = fs.statSync(fullPath);
        if (stats.size > threshold) {
          largeFiles.push({
            path: relativePath,
            size: formatBytes(stats.size)
          });
        }
      }
    }
  }
  
  scan(directory);
  return largeFiles;
}

// Calculate directory size
function calculateDirectorySize(directory) {
  let totalSize = 0;
  
  function scan(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scan(fullPath);
      } else {
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
      }
    }
  }
  
  scan(directory);
  return totalSize;
}

// Format bytes to readable format
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Create a checklist for upload
function createUploadChecklist(issues, warnings, totalSize) {
  const checklist = `# Hostinger Upload Checklist
Generated on: ${new Date().toLocaleString()}

## Files Ready for Upload
- Total Size: ${formatBytes(totalSize)}
- Location: ${outDir}

## Before Uploading
${issues.length > 0 ? '⚠️ Fix the following critical issues:\n' + issues.map(i => `- [ ] ${i}`).join('\n') : '✅ No critical issues found.'}

${warnings.length > 0 ? '⚠️ Consider addressing these warnings:\n' + warnings.map(w => `- [ ] ${w}`).join('\n') : '✅ No warnings found.'}

## Upload Instructions
1. [ ] Log into Hostinger control panel
2. [ ] Navigate to File Manager or FTP
3. [ ] Upload all files from the \`out\` directory to the \`public_html\` folder
4. [ ] Verify all files were uploaded successfully
5. [ ] Check file permissions (644 for files, 755 for directories)

## After Upload
1. [ ] Visit your website to verify it loads correctly
2. [ ] Check all pages and navigation
3. [ ] Verify images load properly
4. [ ] Test mobile responsiveness
5. [ ] Enable SSL if not already enabled

Remember to only upload the contents of the \`out\` directory, not your source code or development files.
`;

  const checklistPath = path.join(__dirname, '../HOSTINGER_UPLOAD_CHECKLIST.md');
  fs.writeFileSync(checklistPath, checklist);
  
  console.log(`\n${colors.blue}Upload checklist created: ${colors.white}HOSTINGER_UPLOAD_CHECKLIST.md${colors.reset}`);
}

// Run the verification
verifyFiles();
