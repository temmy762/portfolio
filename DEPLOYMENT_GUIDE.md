# Deployment Guide for Hostinger

This guide will help you deploy your portfolio website to Hostinger.

## Prerequisites

- A Hostinger account with a domain and hosting plan
- Node.js and npm installed on your local machine
- Your portfolio project ready for deployment

## Build Process

1. Prepare your project for production:

```bash
# Install dependencies if you haven't already
npm install

# Build the project for production
npm run build
```

This will generate a static export in the `out` directory.

## Configuration for Hostinger

1. Create a `.env.production` file (if not already created) with your production environment variables:

```
NODE_ENV=production

# Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"

# EmailJS config
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_emailjs_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_emailjs_public_key"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="your_ga_measurement_id"
```

2. Build your project with the production environment:

```bash
npm run build
```

## Uploading to Hostinger

### Method 1: Direct File Upload

1. Log in to your Hostinger account
2. Go to your hosting control panel
3. Navigate to the File Manager
4. Upload the contents of the `out` directory to the `public_html` folder on your Hostinger server

### Method 2: FTP Upload

1. Use an FTP client like FileZilla
2. Connect to your Hostinger hosting using your FTP credentials:
   - Host: Your FTP hostname (usually ftp.yourdomain.com)
   - Username: Your Hostinger username
   - Password: Your Hostinger password
   - Port: 21
3. Navigate to the `public_html` directory on the remote server
4. Upload the contents of your local `out` directory to the remote `public_html` directory

### Method 3: Using Git (Recommended)

If your Hostinger plan supports Git deployment:

1. Set up Git on your Hostinger account
2. Add your Hostinger Git repository as a remote:

```bash
git remote add hostinger git@hostinger:username/repository.git
```

3. Push your code to Hostinger:

```bash
git push hostinger main
```

4. Follow Hostinger's CI/CD instructions to complete the deployment

## Post-Deployment

1. Verify your website is working correctly
2. Test all functionality, especially:
   - Contact form
   - Admin authentication
   - Image loading
   - Responsiveness

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Ensure all environment variables are correctly set
3. Verify that all paths are correct (Next.js uses relative paths in export mode)
4. For image issues, check that all image URLs are accessible

## Maintaining Your Site

To update your deployed website:

1. Make changes to your local repository
2. Build the project again
3. Upload the new contents of the `out` directory to Hostinger

## Important Notes

- The admin section authentication works differently in static export mode
- Firebase functionality will still work as it uses client-side authentication
- File uploads in the admin section require separate storage configuration
- Contact form uses EmailJS which is fully client-side and will work in static export mode
