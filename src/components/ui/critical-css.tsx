"use client";

import { useEffect } from 'react';
import { getCriticalCSS, minifyCSS, shouldInlineCSS } from '@/lib/critical-css';

interface CriticalCSSProps {
  /** Current route path */
  route?: string;
  /** Whether to minify the CSS */
  minify?: boolean;
}

/**
 * Component to inject critical CSS for faster initial page loads
 * This should be used in the document head for above-the-fold styles
 */
export function CriticalCSS({ route = '/', minify = true }: CriticalCSSProps) {
  useEffect(() => {
    // Check if critical CSS is already injected
    const existingCritical = document.getElementById('critical-css');
    if (existingCritical) {
      return;
    }

    // Get critical CSS for the current route
    let criticalCSS = getCriticalCSS(route);
    
    if (minify) {
      criticalCSS = minifyCSS(criticalCSS);
    }

    // Only inject if CSS should be inlined (under threshold)
    if (shouldInlineCSS(criticalCSS)) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    }
  }, [route, minify]);

  return null;
}

/**
 * Server-side critical CSS injection for SSR
 * Use this in _document.tsx or layout components
 */
export function ServerCriticalCSS({ route = '/', minify = true }: CriticalCSSProps) {
  let criticalCSS = getCriticalCSS(route);
  
  if (minify) {
    criticalCSS = minifyCSS(criticalCSS);
  }

  // Only render if CSS should be inlined
  if (!shouldInlineCSS(criticalCSS)) {
    return null;
  }

  return (
    <style
      id="critical-css"
      dangerouslySetInnerHTML={{
        __html: criticalCSS
      }}
    />
  );
}
