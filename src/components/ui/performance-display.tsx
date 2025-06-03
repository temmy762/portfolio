"use client";

import { useEffect, useState } from 'react';
import { PerformanceMonitor, isMobileDevice, getConnectionInfo, type PerformanceMetrics } from '@/lib/mobile-performance';

interface PerformanceDisplayProps {
  /** Whether to show performance metrics in development */
  showInDev?: boolean;
  /** Whether to log metrics to console */
  logMetrics?: boolean;
  /** Callback when metrics are available */
  onMetrics?: (metrics: Partial<PerformanceMetrics>) => void;
}

/**
 * Performance monitoring component for real-time metrics tracking
 * Only shows in development or when explicitly enabled
 */
export function PerformanceDisplay({ 
  showInDev = true, 
  logMetrics = true,
  onMetrics 
}: PerformanceDisplayProps) {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});  const [connectionInfo, setConnectionInfo] = useState<ReturnType<typeof getConnectionInfo>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;    // Initialize performance monitoring
    const perfMonitor = new PerformanceMonitor();
    setIsMobile(isMobileDevice());
    setConnectionInfo(getConnectionInfo());

    // Update metrics periodically
    const interval = setInterval(() => {
      const currentMetrics = perfMonitor.getMetrics();
      setMetrics(currentMetrics);
      
      if (logMetrics && Object.keys(currentMetrics).length > 0) {
        console.group('🚀 Performance Metrics');
        console.log('FCP:', currentMetrics.fcp ? `${Math.round(currentMetrics.fcp)}ms` : 'N/A');
        console.log('LCP:', currentMetrics.lcp ? `${Math.round(currentMetrics.lcp)}ms` : 'N/A');
        console.log('CLS:', currentMetrics.cls ? currentMetrics.cls.toFixed(3) : 'N/A');
        console.log('TTFB:', currentMetrics.ttfb ? `${Math.round(currentMetrics.ttfb)}ms` : 'N/A');        console.log('Device:', isMobileDevice() ? 'Mobile' : 'Desktop');
        console.log('Connection:', getConnectionInfo().effectiveType || 'Unknown');
        console.groupEnd();
      }
      
      if (onMetrics) {
        onMetrics(currentMetrics);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      perfMonitor.disconnect();
    };
  }, [logMetrics, onMetrics]);

  // Only show in development mode or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && !showInDev) {
    return null;
  }

  const hasMetrics = Object.keys(metrics).length > 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white text-xs p-3 rounded-lg max-w-xs">
      <div className="font-semibold mb-2 flex items-center gap-2">
        🚀 Performance
        {isMobile && <span className="bg-blue-500 px-1 rounded">Mobile</span>}
        {connectionInfo.effectiveType && (
          <span className="bg-green-500 px-1 rounded">{connectionInfo.effectiveType}</span>
        )}
      </div>
      
      {hasMetrics ? (
        <div className="space-y-1">
          {metrics.fcp && (
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={getMetricColor(metrics.fcp, 'fcp')}>
                {Math.round(metrics.fcp)}ms
              </span>
            </div>
          )}
          {metrics.lcp && (
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getMetricColor(metrics.lcp, 'lcp')}>
                {Math.round(metrics.lcp)}ms
              </span>
            </div>
          )}
          {metrics.cls !== undefined && (
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={getMetricColor(metrics.cls, 'cls')}>
                {metrics.cls.toFixed(3)}
              </span>
            </div>
          )}
          {metrics.ttfb && (
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span className={getMetricColor(metrics.ttfb, 'ttfb')}>
                {Math.round(metrics.ttfb)}ms
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400">Loading metrics...</div>
      )}
    </div>
  );
}

/**
 * Get color class based on metric performance
 */
function getMetricColor(value: number, metric: 'fcp' | 'lcp' | 'cls' | 'ttfb'): string {
  const thresholds = {
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 }
  };

  const threshold = thresholds[metric];
  
  if (value <= threshold.good) {
    return 'text-green-400';
  } else if (value <= threshold.poor) {
    return 'text-yellow-400';
  } else {
    return 'text-red-400';
  }
}
