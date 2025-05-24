import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { handleImageError, isPlaceholderImage } from '@/lib/utils/image-utils';
import { imageAnalytics } from '@/lib/utils/image-analytics';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  component?: string;
}

/**
 * OptimizedImage component with built-in error handling, analytics, and performance tracking
 */
export function OptimizedImage({ 
  src, 
  alt,
  fallbackSrc,
  component,
  ...props 
}: OptimizedImageProps) {
  const [loadStartTime] = useState<number>(Date.now());
  
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
  
  return (
    <Image
      src={src}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      {...componentDataAttr}
      {...props}
    />
  );
}
