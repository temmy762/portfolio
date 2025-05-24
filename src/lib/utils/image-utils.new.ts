/**
 * Utility functions for handling images in the portfolio
 */

/**
 * Get a placeholder avatar image with initials
 * 
 * @param name Person's name
 * @returns Placeholder avatar URL as data URI
 */
export function getAvatarPlaceholder(name: string): string {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Create an SVG placeholder with initials
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#22c55e"/>
      <text x="100" y="100" font-family="Arial" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Get a project image placeholder
 * 
 * @param text Text to display in the placeholder
 * @param width Image width (default: 800)
 * @param height Image height (default: 600)
 * @returns Placeholder image URL as data URI
 */
export function getProjectPlaceholder(
  text: string,
  width = 800,
  height = 600
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#22c55e"/>
      <text x="${width/2}" y="${height/2}" font-family="Arial" font-size="36" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
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
    // For profile/avatar images, use getAvatarPlaceholder
    const nameParts = img.alt ? img.alt.split('of ') : [];
    const name = nameParts.length > 1 ? nameParts[1] : 'User';
    img.src = getAvatarPlaceholder(name);
  } else {
    // For other images, create a project placeholder
    const text = img.alt || 'Image';
    img.src = getProjectPlaceholder(text, width, height);
  }
  
  // Add appropriate alt text if missing
  if (!img.alt || img.alt === '') {
    img.alt = 'Image not available';
  }
}

/**
 * Validates if a URL is likely to be a valid image URL
 * 
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is likely a valid image
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Data URIs are valid
  if (url.startsWith('data:image/')) return true;
  
  // Check if URL is well-formed
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if URL ends with common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
}
