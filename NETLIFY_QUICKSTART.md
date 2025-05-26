# Netlify Deployment - Quick Start

Follow this quick start guide to deploy your Next.js portfolio to Netlify.

## 1. Push Your Code to GitHub

Ensure your code is pushed to a GitHub repository:

```powershell
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## 2. Connect to Netlify

**Option A: Using the Netlify Website**

1. Go to [Netlify](https://app.netlify.com/) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your portfolio repository
4. Use these build settings:
   - Build command: `npm run netlify:build`
   - Publish directory: `out`
5. Click "Deploy site"

**Option B: Using the Netlify CLI**

```powershell
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Log in to Netlify
netlify login

# Initialize and link your project
netlify init

# Deploy your site
npm run netlify:deploy
```

## 3. Environment Variables

Set up these environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add the following variables:
   - `NEXT_PUBLIC_GITHUB_USERNAME` - Your GitHub username
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID
   - `NEXT_PUBLIC_EMAILJS_USER_ID` - EmailJS user ID

## 4. Custom Domain (Optional)

1. Go to Domain settings
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## 5. Form Handling (Optional)

To use Netlify Forms with your contact form:

1. Add `data-netlify="true"` to your form element
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`

## 6. Verify Deployment

Once deployed, check:
- All pages load correctly
- Navigation works properly
- Contact form submits successfully
- Images display correctly
- Responsive design works on mobile devices

## Common Commands

```powershell
# Run Netlify dev server locally
npm run netlify:dev

# Build for Netlify
npm run netlify:build

# Deploy to Netlify
npm run netlify:deploy

# Deploy with build in one command
npm run netlify:ci
```

For more detailed information, see the complete [NETLIFY_DEPLOYMENT_GUIDE.md](./NETLIFY_DEPLOYMENT_GUIDE.md).
