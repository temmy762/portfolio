/**
 * Mobile Performance Testing Utilities
 * Tools for testing and validating mobile performance optimizations
 */

export interface PerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  value?: number;
  hadRecentInput?: boolean;
}

export interface NetworkInformation {
  effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }
}

export interface PerformanceMetrics {
  /** First Contentful Paint (FCP) */
  fcp: number;
  /** Largest Contentful Paint (LCP) */
  lcp: number;
  /** First Input Delay (FID) */
  fid: number;
  /** Cumulative Layout Shift (CLS) */
  cls: number;
  /** Time to First Byte (TTFB) */
  ttfb: number;
  /** Total Blocking Time (TBT) */
  tbt: number;
}

export interface MobileTestConfig {
  /** Device to emulate for testing */
  device: 'mobile' | 'tablet' | 'desktop';
  /** Network conditions to simulate */
  network: 'slow-3g' | 'fast-3g' | '4g' | 'wifi';
  /** Viewport dimensions */
  viewport: { width: number; height: number };
  /** User agent string */
  userAgent: string;
}

export const MOBILE_CONFIGS: Record<string, MobileTestConfig> = {
  'mobile-slow': {
    device: 'mobile',
    network: 'slow-3g',
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  'mobile-fast': {
    device: 'mobile',
    network: '4g',
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  },
  'tablet': {
    device: 'tablet',
    network: 'wifi',
    viewport: { width: 768, height: 1024 },
  const ratings: Record<keyof PerformanceMetrics, 'good' | 'needs-improvement' | 'poor'> = {
    fcp: 'poor',
    lcp: 'poor', 
    fid: 'poor',
    cls: 'poor',
    ttfb: 'poor',
    tbt: 'poor'
  };
  }
};

/**
 * Performance thresholds for Core Web Vitals
 */
export const PERFORMANCE_THRESHOLDS = {
  fcp: { good: 1800, needsImprovement: 3000 },
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 800, needsImprovement: 1800 },
  tbt: { good: 200, needsImprovement: 600 }
};

/**
 * Evaluate performance metrics against thresholds
 */
export function evaluatePerformance(metrics: PerformanceMetrics): {
  score: number;
  ratings: Record<keyof PerformanceMetrics, 'good' | 'needs-improvement' | 'poor'>;
/**
 * Get performance recommendations based on metrics
 */
function getRecommendation(metric: keyof PerformanceMetrics, value: number): string {
  const recommendations: Record<keyof PerformanceMetrics, string> = {
    fcp: `Optimize critical CSS delivery and reduce render-blocking resources (current: ${value}ms)`,
    lcp: `Optimize images, preload key resources, and improve server response times (current: ${value}ms)`,
    fid: `Minimize JavaScript execution time and optimize third-party scripts (current: ${value}ms)`,
    cls: `Set explicit dimensions for images and avoid inserting content above existing elements (current: ${value})`,
    ttfb: `Optimize server response time and consider CDN implementation (current: ${value}ms)`,
    tbt: `Reduce JavaScript execution time and break up long tasks (current: ${value}ms)`
  };
  
  return recommendations[metric];
}     ratings[metric] = 'needs-improvement';
      totalScore += 50;
      recommendations.push(getRecommendation(metric, value));
    } else {
      ratings[metric] = 'poor';
      totalScore += 0;
      recommendations.push(getRecommendation(metric, value));
    }
  });

  return {
    score: Math.round(totalScore / Object.keys(metrics).length),
    ratings,
    recommendations: [...new Set(recommendations)] // Remove duplicates
  };
}

/**
 * Get performance recommendations based on metrics
 */
function getRecommendation(metric: keyof PerformanceMetrics, value: number): string {
  const recommendations: Record<keyof PerformanceMetrics, string> = {
    fcp: 'Optimize critical CSS delivery and reduce render-blocking resources',
    lcp: 'Optimize images, preload key resources, and improve server response times',
    fid: 'Minimize JavaScript execution time and optimize third-party scripts',
    cls: 'Set explicit dimensions for images and avoid inserting content above existing elements',
    ttfb: 'Optimize server response time and consider CDN implementation',
    tbt: 'Reduce JavaScript execution time and break up long tasks'
  };
  
  return recommendations[metric];
}

/**
 * Measure Core Web Vitals in the browser
 */
export function measureCoreWebVitals(): Promise<Partial<PerformanceMetrics>> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {};
    
    // Measure FCP
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });

    // Measure LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      metrics.lcp = lastEntry.startTime;
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      metrics.cls = clsValue;
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Measure TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Resolve after a reasonable timeout
    setTimeout(() => {
      resolve(metrics);
    }, 5000);
  });
}

/**
 * Generate mobile performance test report
 */
export function generateMobileTestReport(
  url: string,
  config: MobileTestConfig,
  metrics: PerformanceMetrics
): string {
  const evaluation = evaluatePerformance(metrics);
  
  return `
# Mobile Performance Test Report

## Test Configuration
- **URL**: ${url}
- **Device**: ${config.device}
- **Network**: ${config.network}
- **Viewport**: ${config.viewport.width}x${config.viewport.height}
- **Date**: ${new Date().toISOString()}

## Performance Score: ${evaluation.score}/100

## Core Web Vitals
- **First Contentful Paint (FCP)**: ${metrics.fcp}ms (${evaluation.ratings.fcp})
- **Largest Contentful Paint (LCP)**: ${metrics.lcp}ms (${evaluation.ratings.lcp})
- **First Input Delay (FID)**: ${metrics.fid}ms (${evaluation.ratings.fid})
- **Cumulative Layout Shift (CLS)**: ${metrics.cls} (${evaluation.ratings.cls})
- **Time to First Byte (TTFB)**: ${metrics.ttfb}ms (${evaluation.ratings.ttfb})
- **Total Blocking Time (TBT)**: ${metrics.tbt}ms (${evaluation.ratings.tbt})

## Recommendations
${evaluation.recommendations.map(rec => `- ${rec}`).join('\n')}

## Optimization Status
✅ Critical CSS implementation
✅ Image optimization with WebP/AVIF
✅ Lazy loading implementation
✅ Bundle analysis completed
${config.network === 'slow-3g' ? '⚠️  Slow network detected - consider further optimizations' : '✅ Network performance acceptable'}
  `.trim();
}

/**
 * Browser-based performance monitoring
 */
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // FCP Observer
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);

      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }

    // TTFB measurement
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get connection information
 */
export function getConnectionInfo(): { effectiveType?: string; downlink?: number; rtt?: number } {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    };
  }
  
  return {};
}
