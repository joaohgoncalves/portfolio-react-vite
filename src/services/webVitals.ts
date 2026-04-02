import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

interface VitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs improvement' | 'poor';
  delta: number;
}

interface AnalyticsEvent {
  name: string;
  params: Record<string, any>;
}

class WebVitalsService {
  private static instance: WebVitalsService;
  private vitalsData: Map<string, VitalsData> = new Map();

  private constructor() {
    this.initWebVitals();
  }

  static getInstance(): WebVitalsService {
    if (!WebVitalsService.instance) {
      WebVitalsService.instance = new WebVitalsService();
    }
    return WebVitalsService.instance;
  }

  private initWebVitals(): void {
    // Dynamically import web-vitals to avoid loading in SSR
    if (typeof window !== 'undefined') {
      try {
        onCLS(this.handleMetric.bind(this));
        onINP(this.handleMetric.bind(this));
        onFCP(this.handleMetric.bind(this));
        onLCP(this.handleMetric.bind(this));
        onTTFB(this.handleMetric.bind(this));
      } catch (err) {
        console.error('Failed to initialize web-vitals:', err);
      }
    }
  }

  private handleMetric(metric: Metric): void {
    const normalizedRating =
      metric.rating === 'needs-improvement'
        ? 'needs improvement'
        : metric.rating ?? 'needs improvement';

    const vitalsData: VitalsData = {
      name: metric.name,
      value: metric.value,
      rating: normalizedRating,
      delta: metric.delta ?? 0,
    };

    this.vitalsData.set(metric.name, vitalsData);

    // Send to analytics
    this.sendAnalytics({
      name: `web_vitals_${metric.name.toLowerCase()}`,
      params: {
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: Math.round(metric.delta ?? 0),
        page: window.location.pathname,
      },
    });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`📊 Web Vitals - ${metric.name}`);
      console.log(`Value: ${metric.value.toFixed(2)}`);
      console.log(`Rating: ${metric.rating}`);
      console.log(`Delta: ${(metric.delta ?? 0).toFixed(2)}`);
      console.groupEnd();
    }
  }

  private sendAnalytics(event: AnalyticsEvent): void {
    // Send to Vercel Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.params);
    }

    // Send to beacon API for reliability
    if (navigator.sendBeacon) {
      const body = JSON.stringify(event);
      navigator.sendBeacon('/api/analytics', body);
    }
  }

  getVitals(): VitalsData[] {
    return Array.from(this.vitalsData.values());
  }

  getVitalByName(name: string): VitalsData | undefined {
    return this.vitalsData.get(name);
  }

  getAllVitalsReport(): string {
    const vitals = this.getVitals();
    if (vitals.length === 0) {
      return 'Web Vitals not yet available';
    }

    return vitals
      .map((vital) => `${vital.name}: ${vital.value.toFixed(2)}ms (${vital.rating})`)
      .join('\n');
  }
}

export default WebVitalsService;
