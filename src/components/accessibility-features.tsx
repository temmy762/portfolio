'use client';

import { useEffect } from 'react';

/**
 * This component adds keyboard accessibility features to the website
 * - Skip to content link
 * - Keyboard focus outlines
 */
export default function AccessibilityFeatures() {
  // Add keyboard focus styles
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };

    window.addEventListener('keydown', handleFirstTab);

    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <>
      {/* Skip to content link - visible only when focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>
    </>
  );
}
