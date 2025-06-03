"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getCriticalCSS, minifyCSS, shouldInlineCSS } from '@/lib/critical-css';

/**
 * Dynamic critical CSS injection based on current route
 * This component injects route-specific critical CSS
 */
export function DynamicCriticalCSS() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove existing route-specific critical CSS
    const existingRouteCSS = document.getElementById('route-critical-css');
    if (existingRouteCSS) {
      existingRouteCSS.remove();
    }

    // Don't inject for home route as it's already handled in SSR
    if (pathname === '/') {
      return;
    }

    // Get critical CSS for the current route
    let criticalCSS = getCriticalCSS(pathname);
    criticalCSS = minifyCSS(criticalCSS);

    // Only inject if CSS should be inlined
    if (shouldInlineCSS(criticalCSS)) {
      const style = document.createElement('style');
      style.id = 'route-critical-css';
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    }
  }, [pathname]);

  return null;
}
