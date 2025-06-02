import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { handleImageError, isPlaceholderImage } from '@/lib/utils/image-utils';
import { imageAnalytics } from '@/lib/utils/image-analytics';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  component?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Enhanced OptimizedImage component with performance optimizations
 * - Automatic WebP/AVIF format detection
 * - Responsive sizing based on viewport
 * - Lazy loading with intersection observer
 * - Performance analytics tracking
 */
export function OptimizedImage({ 
  src, 
  alt,
  fallbackSrc,
  component,
  priority = false,
  sizes,
  className,
  ...props 
}: OptimizedImageProps) {
  const [loadStartTime] = useState<number>(Date.now());
  
  // Enhanced responsive sizes if not provided
  const responsiveSizes = sizes || (() => {
    // Determine optimal sizes based on common breakpoints
    if (component === 'hero') {
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw';
    } else if (component === 'project-card') {
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    } else if (component === 'blog-card') {
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw';
    } else if (component === 'testimonial') {
      return '(max-width: 768px) 80px, 120px';
    }
    return '(max-width: 768px) 100vw, 50vw';
  })();
  
  // Function to handle image load success
  const handleLoad = () => {
    const loadTime = Date.now() - loadStartTime;
    
    // Don't track placeholder images in analytics
    if (typeof src === 'string' && !isPlaceholderImage(src)) {
      imageAnalytics.trackSuccess(
        src,
        loadTime,
        component,
        false
      );
    }
  };
  
  // Apply a custom error handler that wraps our utility
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Use the fallback if provided, otherwise use our default error handler
    if (fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    } else {
      handleImageError(e);
    }
  };
  
  // Add component marker for analytics
  const componentDataAttr = component ? { 'data-component': component } : {};
  
  // Enhanced className with performance optimizations
  const optimizedClassName = `${className || ''} transition-opacity duration-300`.trim();
  
  return (
    <Image
      src={src}
      alt={alt}
      sizes={responsiveSizes}
      priority={priority}
      quality={85} // Optimal balance between quality and file size
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      onError={handleError}
      onLoad={handleLoad}
      className={optimizedClassName}
      {...componentDataAttr}
      {...props}
    />
  );
}
