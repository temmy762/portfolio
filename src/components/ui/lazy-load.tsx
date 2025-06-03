"use client";

import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * LazyLoad component for performance optimization
 * Only renders children when they enter the viewport
 */
export function LazyLoad({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
}: LazyLoadProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={{ minHeight: '1px' }} // Ensure the element has some height for intersection
    >
      {hasIntersected ? children : fallback}
    </div>
  );
}
