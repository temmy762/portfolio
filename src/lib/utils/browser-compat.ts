/**
 * Browser compatibility utilities for image handling
 */

/**
 * Check if the current browser properly supports SVG data URIs
 * Some older browsers have issues with SVG data URIs
 */
export function supportsSvgDataUri(): boolean {
  // If we're on the server during SSR, assume modern browser support
  if (typeof window === 'undefined') {
    return true;
  }
  
  // IE11 and older browsers detection
  const isIE11OrOlder = (navigator.userAgent.indexOf('MSIE') !== -1) || 
                         (navigator.userAgent.indexOf('Trident/') !== -1);
  
  // Some very old mobile browsers also have issues
  const isVeryOldMobile = /Android 4\.[0-3]/.test(navigator.userAgent) ||
                           /iPhone OS [4-8]_/.test(navigator.userAgent);
  
  return !isIE11OrOlder && !isVeryOldMobile;
}

/**
 * Get a fallback image URL that works across browsers
 * For browsers that don't support SVG data URIs well
 */
export function getBrowserCompatiblePlaceholder(
  type: 'avatar' | 'blog' | 'project' = 'project'
): string {
  // If SVG data URIs are supported, use the regular placeholder
  if (supportsSvgDataUri()) {
    return '';  // Return empty to use the default SVG placeholder
  }
  
  // Otherwise return static file paths for older browsers
  switch (type) {
    case 'avatar':
      return '/images/testimonials/default-avatar.svg';
    case 'blog':
      return '/images/blog/default-blog-placeholder.svg';
    case 'project':
    default:
      return '/images/projects/default-project-placeholder.svg';
  }
}
