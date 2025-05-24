/**
 * Analytics utilities for tracking image loading performance
 */

type ImageLoadEvent = {
  src: string;
  success: boolean;
  error?: string;
  loadTime?: number;
  timestamp: number;
  component?: string;
  isFallback: boolean;
};

class ImageAnalytics {
  private events: ImageLoadEvent[] = [];
  private maxEvents: number = 100; // Keep only the most recent events
  private isEnabled: boolean = process.env.NODE_ENV === 'production';
  
  /**
   * Track an image load success event
   */
  trackSuccess(src: string, loadTime: number, component?: string, isFallback: boolean = false) {
    if (!this.isEnabled) return;
    
    this.addEvent({
      src,
      success: true,
      loadTime,
      timestamp: Date.now(),
      component,
      isFallback
    });
    
    // Send to analytics if we have accumulated 10 events
    if (this.events.filter(e => e.success).length % 10 === 0) {
      this.sendAnalytics();
    }
  }
  
  /**
   * Track an image load failure event
   */
  trackFailure(src: string, error: string, component?: string) {
    if (!this.isEnabled) return;
    
    this.addEvent({
      src,
      success: false,
      error,
      timestamp: Date.now(),
      component,
      isFallback: false
    });
    
    // Always send failures immediately to detect issues
    this.sendAnalytics();
  }
  
  /**
   * Add event to the queue and maintain max size
   */
  private addEvent(event: ImageLoadEvent) {
    this.events.push(event);
    
    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }
  }
    /**
   * Send analytics data to the server or service
   * This could be connected to Google Analytics, custom endpoint, etc.
   */
  private sendAnalytics() {
    // Only proceed if we're in the browser and gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Example: send to Google Analytics
      const failureCount = this.events.filter(e => !e.success).length;
      const successCount = this.events.filter(e => e.success).length;
      
      if (failureCount > 0) {
        window.gtag('event', 'image_load_failures', {
          event_category: 'Images',
          event_label: 'Image Load Failures',
          value: failureCount
        });
      }
      
      // Log performance metrics
      if (successCount > 0) {
        const avgLoadTime = this.events
          .filter(e => e.success && e.loadTime)
          .reduce((sum, event) => sum + (event.loadTime || 0), 0) / successCount;
        
        window.gtag('event', 'image_load_performance', {
          event_category: 'Performance',
          event_label: 'Average Image Load Time',
          value: Math.round(avgLoadTime)
        });
      }
    }
    
    console.debug('Image analytics:', {
      totalEvents: this.events.length,
      successCount: this.events.filter(e => e.success).length,
      failureCount: this.events.filter(e => !e.success).length
    });
  }
  
  /**
   * Get analytics data for debugging
   */
  getAnalyticsData() {
    return {
      events: this.events,
      summary: {
        total: this.events.length,
        success: this.events.filter(e => e.success).length,
        failures: this.events.filter(e => !e.success).length,
        fallbacksUsed: this.events.filter(e => e.isFallback).length
      }
    };
  }
}

// Create a singleton instance
export const imageAnalytics = new ImageAnalytics();

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params: Record<string, string | number | boolean>) => void;
  }
}
