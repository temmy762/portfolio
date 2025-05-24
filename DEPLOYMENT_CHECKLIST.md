# Deployment Checklist for Hostinger

This checklist ensures that your portfolio website is ready for deployment to Hostinger. Follow these steps in order before uploading your files.

## Pre-Deployment Checks

- [ ] **ESLint Fixes**
  - Fix remaining ESLint errors in `github-section.tsx`
  - Fix type error in `image-analytics.ts`
  - Remove unused imports in `image-utils.ts`

- [ ] **Environment Variables**
  - Ensure all necessary environment variables are set in `.env.local`
  - Verify GitHub username and token are configured

- [ ] **Image Optimization**
  - Confirm all placeholder images are included in the build
  - Verify image domains in `next.config.ts` are correct

- [ ] **Authentication**
  - Test admin login functionality
  - Verify redirect behavior works correctly

## Build Process

- [ ] **Clean Build**
  - Run `npm run build` without errors
  - Check that static export is generated in the `out` directory

- [ ] **Test Build Locally**
  - Serve the build locally with `npx serve out`
  - Test all pages and functionality

## Deployment to Hostinger

- [ ] **Prepare Hostinger**
  - Log in to Hostinger control panel
  - Navigate to file manager or FTP settings

- [ ] **Upload Files**
  - Upload all files from the `out` directory to your Hostinger public_html folder
  - Ensure all subdirectories are included

- [ ] **Configure Domain**
  - Set up your domain in Hostinger if not already done
  - Configure DNS settings if necessary

- [ ] **SSL Setup**
  - Enable SSL certificate for your domain
  - Ensure all resources load over HTTPS

## Post-Deployment Verification

- [ ] **Test All Pages**
  - Visit all pages of your website
  - Verify links work correctly
  - Check responsive design on mobile devices

- [ ] **Image Loading**
  - Verify images load correctly
  - Test fallback images by temporarily disconnecting from the internet

- [ ] **Performance**
  - Run performance tests (Lighthouse, PageSpeed Insights)
  - Check for any rendering issues

- [ ] **Analytics**
  - Verify analytics tracking is working
  - Test image analytics if implemented

## Troubleshooting Common Issues

- If you encounter 404 errors for pages, check `.htaccess` configuration
- If images fail to load, verify image paths and fallback mechanisms
- If the site seems slow, consider enabling Hostinger's caching features

## Maintenance Plan

- Schedule regular updates to your portfolio content
- Monitor analytics data for performance issues
- Plan for periodic dependency updates

---

Once all items on this checklist are complete, your portfolio website should be successfully deployed and functioning correctly on Hostinger.
