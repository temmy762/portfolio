# Analytics and SEO Implementation Guide

This document explains how analytics and SEO are implemented in the portfolio website.

## Google Analytics Setup

The website uses Google Analytics 4 (GA4) for tracking visitor behavior and engagement metrics.

### Configuration

1. **Environment Variable**
   - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` to your GA4 Measurement ID (format: G-XXXXXXXXXX)

2. **Implementation**
   - Analytics component: `src/components/analytics.tsx`
   - Loaded conditionally in production environment in the root layout

3. **Page View Tracking**
   - Automatic page view tracking using Next.js navigation hooks
   - Tracks URL parameters for better analysis

### Custom Events

To track additional events beyond page views, use the global `gtag` function:

```typescript
// Example: Track form submission
window.gtag('event', 'form_submission', {
  'form_type': 'contact',
  'submission_time': new Date().toISOString()
});
```

## SEO Implementation

The website uses various SEO techniques to improve search engine visibility:

### Metadata

- Centralized metadata configuration: `src/lib/metadata.ts`
- Page-specific metadata using Next.js metadata API
- OpenGraph and Twitter card optimization

### Structured Data

- JSON-LD implementation for rich search results
- Person schema for personal information
- Website schema for overall site structure
- Project-specific schema for portfolio items

### Technical SEO

- Sitemap generation: `scripts/generate-sitemap.mjs`
- Robots.txt configuration: `public/robots.txt`
- Canonical URLs to prevent duplicate content

## Monitoring and Improvement

### Google Search Console

1. Set up Google Search Console to monitor search performance
2. Submit the sitemap.xml file
3. Monitor for crawling issues and search performance

### Regular SEO Audit Tasks

1. Check PageSpeed Insights for performance issues
2. Review and update metadata periodically
3. Add structured data for new content types
4. Monitor keyword rankings

## Next Steps

1. Implement additional tracking for important user interactions
2. Set up goals in Google Analytics
3. Consider adding schema markup for other content types
4. Link with other analytics tools if needed (e.g., Hotjar for heatmaps)

## Resources

- [Google Analytics Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/) for structured data references
- [Google Rich Results Test](https://search.google.com/test/rich-results) to validate schema markup
