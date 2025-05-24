# Hostinger Deployment - Complete Steps

This document provides a comprehensive step-by-step guide for deploying your Next.js portfolio to Hostinger.

## Pre-Deployment Checklist

Before proceeding, ensure you have:

1. ✅ Fixed all ESLint errors and warnings
2. ✅ Updated environment variables for production
3. ✅ Tested the application locally
4. ✅ Verified image placeholders work correctly
5. ✅ Ensured the admin dashboard functions properly

## Step 1: Prepare Your Build

```powershell
# Navigate to your project directory
cd c:\Users\user\Desktop\Portfolio\portfolio

# Install dependencies (if needed)
npm install

# Run the Hostinger-specific build process
npm run hostinger:prepare
```

This will:
- Build your Next.js application with static export
- Generate a sitemap optimized for Hostinger
- Copy the `.htaccess` file to the build directory
- Run compatibility checks for Hostinger

Review the generated `HOSTINGER_COMPATIBILITY_REPORT.md` file and address any issues before continuing.

## Step 2: Test Your Build Locally

```powershell
# Install serve if you don't have it
npm install -g serve

# Serve the static build
serve -s out
```

Open your browser to `http://localhost:3000` and verify:
- All pages load correctly
- Navigation works
- Images display properly
- Forms function as expected

## Step 3: Upload to Hostinger

### Option 1: Using Hostinger File Manager

1. Log in to your Hostinger control panel (hPanel)
2. Navigate to "Hosting" → "Manage" for your domain
3. Select "File Manager"
4. Navigate to the `public_html` directory
5. Delete any existing files if this is a new deployment
6. Click "Upload" and select all files from your local `out` directory
7. Wait for the upload to complete

### Option 2: Using FTP (Recommended for Large Sites)

1. Get your FTP credentials from Hostinger's control panel
2. Use an FTP client like FileZilla with the following settings:
   - Host: Your FTP hostname (typically ftp.yourdomain.com)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Connect and upload all files from your local `out` directory to the `public_html` directory

## Step 4: Configure Domain and SSL

1. In Hostinger's control panel, navigate to "Domains"
2. Ensure your domain is properly pointing to your hosting
3. Go to "SSL/TLS" and set up an SSL certificate:
   - Select "SSL" and choose "Let's Encrypt"
   - Wait for the certificate to be issued (usually a few minutes)

## Step 5: Test Your Live Site

1. Visit your website using your domain name
2. Test all pages and functionality:
   - Check all navigation links
   - Verify images load correctly
   - Test contact forms
   - Check responsive design on mobile devices
   - Test admin login if applicable

## Step 6: Enable Performance Optimizations

1. In Hostinger's control panel, go to "Advanced" → "LiteSpeed Cache"
2. Enable LiteSpeed Cache for better performance
3. Configure the cache settings:
   - Enable page caching
   - Enable browser caching
   - Enable GZIP compression

## Step 7: Monitor Your Site

After deployment, use the tools and guides provided to monitor your site:
- Review the `POST_DEPLOYMENT_MONITORING.md` document
- Set up Google Analytics
- Use Hostinger's built-in analytics
- Configure uptime monitoring

## Troubleshooting Common Issues

### 404 Errors on Page Refresh or Direct URL Access

- Check that the `.htaccess` file was uploaded correctly
- Verify that the file has the correct permissions (644)
- Check Hostinger's Apache configuration supports mod_rewrite

### Images Not Loading

- Verify image paths in your code
- Check that all image files were uploaded correctly
- Ensure image domains are properly configured in your Next.js config

### Slow Loading Times

- Enable LiteSpeed Cache in Hostinger
- Optimize images (consider using WebP format)
- Enable GZIP compression
- Consider using a CDN

### SSL Issues

- Ensure SSL certificate is properly installed
- Check for mixed content warnings (HTTP resources on HTTPS pages)

## Ongoing Maintenance

1. Make updates to your local development environment
2. Test changes thoroughly
3. Rebuild using `npm run hostinger:prepare`
4. Upload new files to Hostinger
5. Test the live site after each update

---

## Quick Reference Commands

```powershell
# Build for Hostinger
npm run hostinger:build

# Build + compatibility check
npm run hostinger:prepare

# Check compatibility only
npm run hostinger:check

# Test build locally
serve -s out
```

For detailed information, refer to the following documents:
- `HOSTINGER_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `HOSTINGER_UPLOAD_VISUAL_GUIDE.md` - Visual guide for uploading files
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
- `POST_DEPLOYMENT_MONITORING.md` - Monitoring guide
