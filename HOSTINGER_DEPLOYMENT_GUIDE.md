# Deploying Your Portfolio to Hostinger

This guide walks you through the process of deploying your Next.js portfolio to Hostinger.

## Prerequisites

- A Hostinger hosting account
- Node.js and npm installed on your local machine
- Your portfolio project code

## Deployment Steps

### 1. Build Your Portfolio for Production

```bash
# Install dependencies if you haven't already
npm install

# Build the project for production
npm run build
```

This will create a static export in the `out` directory, as configured in your `next.config.ts` file.

### 2. Prepare Your Hostinger Account

1. Log in to your Hostinger account
2. Navigate to your hosting control panel
3. Identify the directory where your website files should be uploaded (usually `public_html`)

### 3. Upload Your Files to Hostinger

You have several options for uploading your files:

#### Option A: Using Hostinger's File Manager

1. In your Hostinger control panel, open the File Manager
2. Navigate to the `public_html` directory
3. Upload all files and folders from your local `out` directory

#### Option B: Using FTP

1. Get your FTP credentials from Hostinger (usually in the "FTP Accounts" section)
2. Use an FTP client like FileZilla to connect to your server
3. Upload all files and folders from your local `out` directory to the `public_html` directory

#### Option C: Using Git (if supported by your Hostinger plan)

1. Set up Git deployment in your Hostinger panel
2. Connect your repository
3. Configure the build command (e.g., `npm run build`)
4. Deploy using Git

### 4. Configure Custom Domain (if applicable)

1. In your Hostinger control panel, go to the "Domains" section
2. Point your domain to your hosting account
3. Configure DNS settings if necessary

### 5. Verify Your Deployment

1. Visit your website URL to ensure everything is working correctly
2. Test all pages and features
3. Verify that images are loading properly with your new fallback system
4. Test the admin dashboard login

## Troubleshooting Common Issues

### 404 Errors on Page Navigation

If you encounter 404 errors when navigating between pages, check:

1. The `trailingSlash: true` setting is in your `next.config.ts`
2. Your Hostinger server is properly configured to serve the `index.html` files

### API Routes Not Working

Remember that with static export, server-side API routes won't work. Your portfolio has been modified to handle this with client-side fallbacks.

### Image Loading Issues

If images aren't loading properly:

1. Verify that the domains in `next.config.ts` match the sources of your images
2. Check that your image placeholders are properly included in the build
3. Ensure the image paths are correct relative to your domain

## Production Optimizations

Consider these optimizations for your production site:

1. Enable Hostinger's caching features
2. Set up a CDN if available in your plan
3. Enable HTTPS for secure connections
4. Set up proper cache headers for static assets

## Maintenance

After deployment, remember to:

1. Regularly update your portfolio content
2. Monitor analytics data collected by your image tracking system
3. Keep your dependencies updated for security

For questions or issues with your Hostinger hosting, contact their support team directly.
