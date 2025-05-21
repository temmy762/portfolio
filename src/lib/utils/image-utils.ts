/**
 * Utility functions for handling images in the portfolio
 */

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
 * @param bgColor Background color (hex code without #)
 * @param textColor Text color (hex code without #)
 * @returns Placeholder avatar URL
 */
export function getAvatarPlaceholder(
  name: string, 
  bgColor = '22c55e', 
  textColor = 'ffffff'
): string {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Use UI Avatars service for a simple placeholder with initials
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=${textColor}&size=200`;
}

/**
 * Get a project image placeholder based on project type or category
 * 
 * @param type Project type or category
 * @param width Image width (default: 800)
 * @param height Image height (default: 600)
 * @returns Placeholder image URL
 */
export function getProjectPlaceholder(
  type: 'web' | 'mobile' | 'design' | 'backend' | 'other' = 'other',
  width = 800,
  height = 600
): string {
  const placeholders = {
    web: `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Web+Project`,
    mobile: `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Mobile+App`,
    design: `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Design+Project`,
    backend: `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Backend+Project`,
    other: `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Project+Image`,
  };
  
  return placeholders[type];
}

/**
 * Utility to handle image loading errors by replacing with a placeholder
 * 
 * @param event Image error event
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  const width = img.width || 800;
  const height = img.height || 600;
  
  // Check if this is a person's image (avatar)
  const isAvatar = img.classList.contains('rounded-full') || 
                   img.alt?.toLowerCase().includes('profile') ||
                   img.alt?.toLowerCase().includes('avatar');
  
  if (isAvatar) {
    // For profile/avatar images, try to extract a name from alt text
    const nameParts = img.alt ? img.alt.split('of ') : [];
    const name = nameParts.length > 1 ? nameParts[1] : 'User';
    img.src = getAvatarPlaceholder(name);
  } else {
    // For other images, use a more contextual placeholder based on size
    const aspectRatio = width / height;
    
    // Select appropriate placeholder based on aspect ratio
    if (aspectRatio > 1.3) {
      // Landscape/banner image
      img.src = `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Portfolio+Image`;
    } else if (aspectRatio < 0.8) {
      // Portrait image
      img.src = `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Project+Image`;
    } else {
      // Square or near-square image
      img.src = `https://via.placeholder.com/${width}x${height}/22c55e/ffffff?text=Image`;
    }
  }
  
  // Add appropriate alt text
  if (!img.alt || img.alt === '') {
    img.alt = 'Image not available';
  }
}

/**
 * Check if an image URL is a placeholder
 * 
 * @param url Image URL
 * @returns True if the URL is a placeholder
 */
export function isPlaceholderImage(url: string): boolean {
  return url.includes('source.unsplash.com') || 
         url.includes('ui-avatars.com') || 
         url.includes('placeholder.com');
}

/**
 * Validates if a URL is likely to be a valid image URL
 * 
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is likely a valid image
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check if URL is well-formed
  try {
    new URL(url);
  } catch {
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
