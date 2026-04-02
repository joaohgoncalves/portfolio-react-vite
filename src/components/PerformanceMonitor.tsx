import React, { useState } from 'react';
import useWebVitals from '@/hooks/useWebVitals';

const PerformanceMonitor: React.FC = () => {
  const { vitals, isLoaded } = useWebVitals();
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-400';
      case 'needs improvement':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-brand-accent text-brand-dark font-medium px-4 py-2 rounded-sm hover:opacity-90 transition-opacity text-sm"
        title="Toggle Performance Monitor"
      >
        📊 Vitals
      </button>

      {/* Monitor Panel */}
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-brand-dark border border-white/20 rounded-sm p-4 min-w-[300px] shadow-2xl">
          <div className="text-white text-sm mb-4 font-mono">
            <div className="font-bold mb-3 text-brand-accent">Core Web Vitals</div>

            {isLoaded && vitals.length > 0 ? (
              <ul className="space-y-2">
                {vitals.map((vital) => (
                  <li key={vital.name} className="flex justify-between items-center text-xs">
                    <span className="text-white/70">{vital.name}</span>
                    <span className={`font-mono ${getRatingColor(vital.rating)}`}>
                      {vital.value.toFixed(0)}ms
                    </span>
                    <span className="text-white/50 text-[10px]">({vital.rating})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-xs">Carregando métricas...</p>
            )}

            {/* Thresholds Reference */}
            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-white/40">
              <p className="mb-2 font-mono text-white/60">Thresholds:</p>
              <p>• LCP: &lt;2.5s (good)</p>
              <p>• INP: &lt;200ms (good)</p>
              <p>• CLS: &lt;0.1 (good)</p>
              <p>• FCP: &lt;1.8s (good)</p>
              <p>• TTFB: &lt;600ms (good)</p>
            </div>

            {/* Links */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://web.dev/vitals/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent text-[10px] hover:underline"
              >
                Learn about Web Vitals →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
