/**
 * Utility functions for handling images in the portfolio
 */

import { getBrowserCompatiblePlaceholder } from './browser-compat';
import { imageAnalytics } from './image-analytics';

/**
 * Generate a placeholder image URL using Unsplash's source API
 * 
 * @param width Image width
 * @param height Image height
 * @param category Category for the placeholder image (optional)
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(
  width = 1200, 
  height = 800, 
  category?: 'technology' | 'business' | 'design' | 'mobile' | 'website'
): string {
  // Keywords for different project categories
  const categoryKeywords = {
    technology: 'technology,code,programming',
    business: 'business,office,meeting',
    design: 'design,art,creative',
    mobile: 'mobile,app,smartphone',
    website: 'website,web,computer',
  };

  // Base URL for Unsplash Source API
  const baseUrl = 'https://source.unsplash.com/random';

  // If a category is provided, use its keywords
  const keywordParam = category && categoryKeywords[category] 
    ? `?${categoryKeywords[category]}` 
    : '';

  // Return the complete URL with dimensions and optional keywords
  return `${baseUrl}/${width}x${height}${keywordParam}`;
}

/**
 * Get a placeholder avatar image with initials
 * 
 * @param name Person's name
 * @param bgColor Background color (hex code with or without #)
 * @param textColor Text color (hex code with or without #)
 * @returns Placeholder avatar URL
 */
export function getAvatarPlaceholder(
  name: string, 
  bgColor = '#22c55e', 
  textColor = '#ffffff'
): string {
  // Check for browser compatibility
  const fallbackUrl = getBrowserCompatiblePlaceholder('avatar');
  if (fallbackUrl) {
    return fallbackUrl;
  }

  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Ensure color codes are properly formatted
  const bg = bgColor.startsWith('#') ? bgColor : `#${bgColor}`;
  const text = textColor.startsWith('#') ? textColor : `#${textColor}`;

  // Create an SVG placeholder with initials
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${bg}"/>
      <text 
        x="100" 
        y="100" 
        font-family="Arial" 
        font-size="72" 
        fill="${text}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${initials}</text>
    </svg>
  `)}`;
}

/**
 * Get a project image placeholder based on project type or category
 * 
 * @param type Project type or category
 * @returns Placeholder image URL
 */
export function getProjectPlaceholder(
  type: 'web' | 'mobile' | 'design' | 'backend' | 'other' = 'other'
): string {
  // Use static SVG files for better performance and compatibility
  const placeholders = {
    web: `/images/projects/web-project-placeholder.svg`,
    mobile: `/images/projects/mobile-app-placeholder.svg`,
    design: `/images/projects/design-project-placeholder.svg`,
    backend: `/images/projects/backend-project-placeholder.svg`,
    other: `/images/projects/default-project-placeholder.svg`,
  };

  // Check if the key exists, otherwise use default
  return type in placeholders ? placeholders[type] : placeholders.other;
}

/**
 * Utility to handle image loading errors by replacing with a placeholder
 * 
 * @param event Image error event
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  const originalSrc = img.src;
  const widthAttr = img.getAttribute('width');
  const heightAttr = img.getAttribute('height');
  const width = widthAttr ? parseInt(widthAttr, 10) : img.width || 800;
  const height = heightAttr ? parseInt(heightAttr, 10) : img.height || 600;
  
  // Track the error in analytics
  imageAnalytics.trackFailure(
    originalSrc, 
    'Image load error', 
    img.closest('[data-component]')?.getAttribute('data-component') || undefined
  );
  
  // Check if this is a person's image (avatar)
  const isAvatar = img.classList.contains('rounded-full') || 
                   img.alt?.toLowerCase().includes('profile') ||
                   img.alt?.toLowerCase().includes('avatar');
  
  if (isAvatar) {
    // For profile/avatar images, use getAvatarPlaceholder
    const nameParts = img.alt ? img.alt.split('of ') : [];
    const name = nameParts.length > 1 ? nameParts[1] : 'User';
    img.src = getAvatarPlaceholder(name);
    
    // Track the fallback usage
    imageAnalytics.trackSuccess(img.src, 0, 'avatar', true);
  } else {
    // For other images, determine the type based on class or alt text
    let type: 'web' | 'mobile' | 'design' | 'backend' | 'other' = 'other';
    const altText = img.alt?.toLowerCase() || '';
    
    if (altText.includes('web') || altText.includes('website')) {
      type = 'web';
    } else if (altText.includes('mobile') || altText.includes('app')) {
      type = 'mobile';
    } else if (altText.includes('design')) {
      type = 'design';
    } else if (altText.includes('backend') || altText.includes('server')) {
      type = 'backend';
    }

    // Use project placeholder
    img.src = getProjectPlaceholder(type);
    
    // Track the fallback usage
    imageAnalytics.trackSuccess(img.src, 0, 'project', true);
  }
  
  // Add appropriate alt text if missing
  if (!img.alt || img.alt === '') {
    img.alt = 'Image not available';
  }

  // Set explicit dimensions if missing
  if (!widthAttr) {
    img.setAttribute('width', String(width));
  }
  if (!heightAttr) {
    img.setAttribute('height', String(height));
  }
}

/**
 * Check if an image URL is a placeholder
 * 
 * @param url Image URL
 * @returns True if the URL is a placeholder
 */
export function isPlaceholderImage(url: string): boolean {
  if (!url) return false;

  return (
    // External placeholder services
    url.includes('source.unsplash.com') || 
    url.includes('ui-avatars.com') || 
    url.includes('placeholder.com') ||
    // Local project placeholders
    url.includes('/images/projects/') && url.includes('-placeholder') ||
    // SVG placeholder
    (url.startsWith('data:image/svg+xml,') && 
     (url.includes('fill="#22c55e"') || url.includes('fill=%2322c55e')))
  );
}

/**
 * Validates if a URL is likely to be a valid image URL
 * 
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is likely a valid image
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check if it's a local image path
  if (url.startsWith('/images/')) {
    return true;
  }
  
  // Check if URL is well-formed
  try {
    new URL(url);
  } catch {
    // If it's not a valid URL but starts with /, assume it's a local path
    if (url.startsWith('/')) {
      return true;
    }
    return false;
  }
  
  // Check if URL ends with common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().endsWith(ext)
  );
  
  // Check if URL is from common image hosting services
  const imageHosts = [
    'unsplash.com', 
    'imgur.com', 
    'cloudinary.com',
    'githubusercontent.com',
    'pexels.com',
    'pixabay.com',
    'placeholder.com',
    'ui-avatars.com'
  ];
  const isFromImageHost = imageHosts.some(host => 
    url.toLowerCase().includes(host)
  );
  
  return hasImageExtension || isFromImageHost || url.includes('data:image/');
}

/**
 * Get the appropriate image URL for a project, falling back to a placeholder if needed
 * 
 * @param imageUrl The original image URL
 * @param type The type of project for placeholder selection
 * @returns The final image URL to use
 */
export function getProjectImageUrl(
  imageUrl: string | undefined,
  type: 'web' | 'mobile' | 'design' | 'backend' | 'other' = 'other'
): string {
  if (!imageUrl || !isValidImageUrl(imageUrl)) {
    return getProjectPlaceholder(type);
  }
  return imageUrl;
}

/**
 * Get the appropriate image URL for a blog post, falling back to a placeholder if needed
 * 
 * @param imageUrl The original image URL
 * @returns The final image URL to use
 */
export function getBlogImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl || !isValidImageUrl(imageUrl)) {
    return '/images/blog/default-blog-placeholder.svg';
  }
  return imageUrl;
}
