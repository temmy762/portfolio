# Deploying Your Portfolio to Netlify

This guide walks you through deploying your Next.js portfolio to Netlify, which offers several advantages:
- Automatic deployments from Git
- SSL certificates included
- CDN distribution
- Form handling
- Continuous deployment

## Prerequisites

1. A GitHub account
2. Your portfolio code pushed to a GitHub repository
3. A Netlify account (free tier is sufficient)

## Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub:
```powershell
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your portfolio repository

## Step 3: Configure Build Settings

Use these settings in the Netlify deploy configuration:

- Build command: `npm run build`
- Publish directory: `out`
- Node version: 18.x (or your preferred version)

## Step 4: Environment Variables

Add these environment variables in Netlify (Site settings → Environment variables):

```
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
```

## Step 5: Domain Setup

1. Go to "Domain settings" in your site's dashboard
2. Choose either:
   - Use a custom domain you own
   - Use the free Netlify subdomain

If using a custom domain:
1. Click "Add custom domain"
2. Enter your domain name
3. Follow DNS configuration instructions
4. Netlify will automatically provision an SSL certificate

## Step 6: Optional Optimizations

Enable these features in your site settings:

1. **Asset Optimization:**
   - Go to "Build & Deploy" → "Post processing"
   - Enable asset optimization
   - Enable bundle splitting
   - Enable CSS minification

2. **Forms:**
   - Enable Netlify Forms if you're using the contact form
   - Add `data-netlify="true"` to your form elements

3. **Headers:**
   - Security headers are already configured in `netlify.toml`
   - Additional headers can be added as needed

## Deployment Features Available

Your portfolio on Netlify includes:

1. **Continuous Deployment:**
   - Automatic builds when you push to GitHub
   - Preview deployments for pull requests
   - Branch deploys for testing

2. **SSL/TLS:**
   - Free SSL certificate
   - Automatic renewal
   - HTTPS enforcement

3. **CDN & Caching:**
   - Global CDN distribution
   - Asset optimization
   - Automatic cache invalidation

4. **Forms & Functions:**
   - Form handling without server
   - Serverless functions if needed
   - API proxying capabilities

## Post-Deployment Checklist

After deploying, verify:

1. **Functionality**
   - [ ] All pages load correctly
   - [ ] Navigation works
   - [ ] Images display properly
   - [ ] Contact form submits successfully
   - [ ] Admin login works
   - [ ] GitHub integration functions

2. **Performance**
   - [ ] Run Lighthouse audit
   - [ ] Check page load times
   - [ ] Verify image optimization
   - [ ] Test mobile responsiveness

3. **Security**
   - [ ] HTTPS works correctly
   - [ ] Security headers are active
   - [ ] Authentication flows work

## Monitoring & Maintenance

Netlify provides:

1. **Analytics & Monitoring:**
   - Deploy logs
   - Form submissions
   - Basic analytics
   - Error tracking

2. **Rollbacks:**
   - Easy deployment rollbacks
   - Deploy previews
   - Split testing capability

## Troubleshooting Common Issues

1. **Build Failures:**
   - Check build logs in Netlify dashboard
   - Verify environment variables
   - Ensure dependencies are correctly listed

2. **404 Errors:**
   - Check redirects in `netlify.toml`
   - Verify file paths
   - Check dynamic route handling

3. **Form Issues:**
   - Verify form attributes
   - Check for JavaScript errors
   - Test form submission handling

## Development Workflow

1. Make changes locally
2. Test using `npm run dev`
3. Push to GitHub
4. Netlify automatically builds and deploys

## Local Testing

Test your build locally before pushing:

```powershell
# Build the site
npm run build

# Test the build locally
npx serve out
```

## Support & Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrate/frameworks/next-js/overview/)
- [Netlify Community Forums](https://answers.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)