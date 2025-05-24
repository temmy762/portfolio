# Image Guidelines for Portfolio Website

## Adding New Images to the Portfolio

### 1. Image Specifications
- **Project Images**: 1200x800 pixels recommended (16:9 aspect ratio)
- **Blog Cover Images**: 1200x630 pixels recommended (1.91:1 aspect ratio)
- **Profile/Avatar Images**: 400x400 pixels recommended (1:1 aspect ratio)
- **Formats**: WebP preferred, JPEG/PNG acceptable, SVG for icons/illustrations
- **File Size**: Keep below 200KB for optimal performance

### 2. Image Placement
- Store project images in `/public/images/projects/`
- Store blog images in `/public/images/blog/`
- Store avatar/profile images in `/public/images/testimonials/`

### 3. Using the OptimizedImage Component (Recommended)
The preferred way to add images is with our OptimizedImage component which has built-in error handling and analytics:

```tsx
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getProjectPlaceholder } from "@/lib/utils/image-utils";

// For project images
<OptimizedImage
  src={project.imageUrl || getProjectPlaceholder('web')}
  alt={project.title}
  fill
  className="object-cover"
  component="project-card"
  fallbackSrc={getProjectPlaceholder('web')}
  priority={isAboveFold}
  loading={isAboveFold ? "eager" : "lazy"}
/>

// For blog images
<OptimizedImage
  src={post.coverImage || '/images/blog/default-blog-placeholder.svg'}
  alt={post.title}
  fill
  className="object-cover"
  component="blog-card"
  loading="lazy"
/>
```

### 4. Using Utility Functions Directly
If you need to use the standard Next.js Image component:

```typescript
// For project images
import { getProjectImageUrl, handleImageError } from "@/lib/utils/image-utils";

<Image
  src={getProjectImageUrl(project.imageUrl, 'web')} // 'web', 'mobile', 'design', 'backend', or 'other'
  alt={project.title}
  fill
  className="object-cover"
  onError={(e) => handleImageError(e)}
  loading="lazy"
/>

// For blog images
import { getBlogImageUrl, handleImageError } from "@/lib/utils/image-utils";

<Image
  src={getBlogImageUrl(post.coverImage)}
  alt={post.title}
  fill
  className="object-cover"
  onError={(e) => handleImageError(e)}
  loading="lazy"
/>

// For avatars/profile images
import { getAvatarPlaceholder, handleImageError } from "@/lib/utils/image-utils";

<Image
  src={getAvatarPlaceholder(user.name, '#22c55e', '#ffffff')}
  alt={`${user.name}'s profile picture`}
  width={64}
  height={64}
  className="rounded-full"
  onError={(e) => handleImageError(e)}
/>
```

### 5. Image Loading Optimization
- Use `priority` for the main hero image and other above-the-fold critical images
- Use `loading="lazy"` for all below-the-fold images
- Set appropriate `sizes` attribute based on your layout:
  ```
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  ```

### 6. Creating New Placeholder Types
If you need to add a new type of placeholder:

1. Add the SVG file to the appropriate directory
2. Update the utility functions in `src/lib/utils/image-utils.ts`
3. Test with both valid and invalid image URLs

### 7. Testing Image Handling
Always test the following scenarios:
- Missing images
- Slow loading images
- Invalid image URLs
- Different screen sizes (mobile, tablet, desktop)
- Dark mode compatibility for placeholders
- Legacy browser compatibility

### 8. Accessibility Requirements
- Always provide meaningful `alt` text for images
- Avoid text within images where possible
- Ensure sufficient contrast for placeholder text
- Use proper semantic HTML around images

### 9. Analytics and Monitoring
The portfolio includes automatic analytics tracking for images:
- Load successes and failures are tracked
- Performance metrics are collected
- Fallback usage is monitored

You can add component-specific tracking by adding the `component` attribute to the OptimizedImage component.

### 10. Browser Compatibility
The portfolio includes utilities to handle browser compatibility issues:
- SVG data URI fallbacks for older browsers
- Static file fallbacks for browsers without SVG support

## Placeholder SVG Guidelines
When creating new placeholder SVGs, follow these guidelines:

1. Use a green background (#22c55e) to match the theme
2. Include a relevant icon or illustration
3. Add a text label if appropriate
4. Keep file size under 5KB
5. Ensure good visibility in both light and dark modes
6. Use simple, accessible typography
