# Visual Guide: Uploading Your Portfolio to Hostinger

This document provides step-by-step visual instructions for uploading your Next.js portfolio to Hostinger's shared hosting.

## 1. Log in to Hostinger Control Panel

![Hostinger Login](https://example.com/placeholder-image.jpg)

- Go to https://hpanel.hostinger.com/
- Enter your email and password
- Click "Log in"

## 2. Navigate to File Manager

![Hostinger Dashboard](https://example.com/placeholder-image.jpg)

- From the dashboard, click on "Hosting" in the left sidebar
- Select your domain/hosting plan
- Click on "File Manager" under the "Files" section

## 3. Access public_html Directory

![File Manager](https://example.com/placeholder-image.jpg)

- In the File Manager, navigate to the `public_html` directory
- This is where all your website files should be uploaded

## 4. Upload Your Build Files

![Upload Files](https://example.com/placeholder-image.jpg)

- Click the "Upload" button in the top menu
- Select all files and folders from your local `out` directory
- Wait for the upload to complete (this may take several minutes)

## 5. Verify File Structure

After uploading, your file structure should look similar to this:

```
public_html/
├── .htaccess
├── 404.html
├── _next/
│   ├── static/
│   │   ├── chunks/
│   │   ├── css/
│   │   └── media/
├── admin/
│   └── index.html
├── blog/
│   └── index.html
├── images/
│   ├── blog/
│   ├── projects/
│   └── testimonials/
├── index.html
├── projects/
│   └── index.html
└── ...other folders and files
```

Ensure that:
- The `.htaccess` file is in the root directory
- All subfolders have their respective `index.html` files
- The `_next` directory contains all JavaScript and CSS assets

## 6. Testing Your Site

![Browser Testing](https://example.com/placeholder-image.jpg)

- Open your site in a web browser using your domain name
- Check that:
  - The homepage loads correctly
  - Navigation between pages works
  - Images display properly
  - The site is responsive on different devices

## 7. Enabling SSL Certificate

![SSL Setup](https://example.com/placeholder-image.jpg)

- Return to your Hostinger hPanel
- Click on "SSL" in the left sidebar
- Click "Setup" next to your domain
- Select "SSL" and choose "Let's Encrypt"
- Wait for the certificate to be issued

## 8. Enabling LiteSpeed Cache (Optional)

![LiteSpeed Cache](https://example.com/placeholder-image.jpg)

- In hPanel, go to "Advanced" → "LiteSpeed Cache"
- Toggle to enable the cache
- Configure settings as recommended:
  - Enable page caching
  - Enable browser caching
  - Enable minification

## Troubleshooting

If you encounter issues after uploading:

### 404 Errors
- Check that the `.htaccess` file was uploaded correctly
- Verify the file permissions (should be 644)

### Missing Images
- Ensure all image paths in the HTML files are correct
- Check that image directories were uploaded completely

### Blank Pages
- Check the browser console for JavaScript errors
- Verify that all files in the `_next` directory were uploaded

---

**Note:** The actual interface may look slightly different depending on Hostinger's current design. If you need additional assistance, contact Hostinger support through your account.

[Back to Main Deployment Guide](./HOSTINGER_DEPLOYMENT_GUIDE.md)
