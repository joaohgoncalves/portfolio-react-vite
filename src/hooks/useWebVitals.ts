import { useEffect, useState } from 'react';
import WebVitalsService from '@/services/webVitals';

interface VitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs improvement' | 'poor';
  delta: number;
}

interface UseVitalsReturn {
  vitals: VitalsData[];
  isLoaded: boolean;
  lcp?: VitalsData;
  inp?: VitalsData;
  cls?: VitalsData;
  fcp?: VitalsData;
  ttfb?: VitalsData;
}

export function useWebVitals(): UseVitalsReturn {
  const [vitals, setVitals] = useState<VitalsData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const service = WebVitalsService.getInstance();

    // Initial load
    setVitals(service.getVitals());
    setIsLoaded(true);

    // Poll for updates every 1 second
    const interval = setInterval(() => {
      const updatedVitals = service.getVitals();
      if (updatedVitals.length > 0) {
        setVitals(updatedVitals);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    vitals,
    isLoaded,
    lcp: vitals.find((v) => v.name === 'LCP'),
    inp: vitals.find((v) => v.name === 'INP') || vitals.find((v) => v.name === 'FID'),
    cls: vitals.find((v) => v.name === 'CLS'),
    fcp: vitals.find((v) => v.name === 'FCP'),
    ttfb: vitals.find((v) => v.name === 'TTFB'),
  };
}

export default useWebVitals;
