# Essential Files for Hostinger Deployment

This guide outlines exactly which files to upload to your Hostinger server and which to exclude.

## Files to Upload

After running `npm run hostinger:prepare`, upload **ONLY** the contents of the `out` directory:

### Required Files and Folders

```
out/
├── .htaccess                  # Critical for URL routing
├── index.html                 # Homepage
├── 404.html                   # Error page
├── robots.txt                 # For search engines
├── sitemap.xml                # For search engines
├── _next/                     # Next.js assets
│   ├── static/                 
│   │   ├── chunks/            # JavaScript files
│   │   ├── css/               # CSS files
│   │   └── media/             # Media assets
├── images/                    # Image assets
│   ├── blog/
│   ├── projects/
│   └── testimonials/
├── about/                     # Route directories with their index.html files
│   └── index.html
├── projects/
│   └── index.html
├── blog/
│   └── index.html
│   └── [post-slug]/
│       └── index.html
├── contact/
│   └── index.html
└── admin/
    └── index.html
```

## Files NOT to Upload

The following files and folders should NOT be uploaded to Hostinger:

```
.gitignore
.env.local                  # Contains sensitive information
.next/                      # Next.js development files
node_modules/              # Dependencies
src/                       # Source code
scripts/                   # Build scripts
*.md                       # Documentation files
package.json               # Package configuration
package-lock.json          # Package lock file
tsconfig.json              # TypeScript configuration
next.config.ts             # Next.js configuration
tailwind.config.js         # Tailwind configuration
postcss.config.js          # PostCSS configuration
```

## Verification Process

Before uploading, run:

```powershell
npm run hostinger:verify
```

This will:
1. Check that all essential files are present
2. Verify that page routes have their HTML files
3. Ensure .htaccess has proper configuration
4. Flag any large files that might cause upload issues
5. Generate an upload checklist

## Upload Method

Uploading to Hostinger can be done via:

1. **File Manager** in Hostinger control panel
   - Good for small sites or quick updates

2. **FTP Client** (recommended)
   - Better for larger sites
   - Provides progress tracking and error recovery
   - Use FileZilla or similar FTP client
   - Connect to your Hostinger FTP server:
     - Host: Your FTP hostname from Hostinger
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: 21
   - Upload the contents of the `out` directory to your `public_html` folder

## After Upload

After uploading, verify:
1. All files are present in the `public_html` directory
2. File permissions are correct:
   - Files: 644 (-rw-r--r--)
   - Directories: 755 (drwxr-xr-x)
3. Visit your site to ensure everything works correctly

## Troubleshooting Upload Issues

If you encounter issues with specific files, try:

1. Uploading in smaller batches
2. Using a different upload method (File Manager vs. FTP)
3. Checking for file permission issues
4. Verifying that `.htaccess` was uploaded and not filtered out

Remember, only the contents of the `out` directory (the static export) should be uploaded to Hostinger, not your source code or development files.
