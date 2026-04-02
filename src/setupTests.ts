import '@testing-library/jest-dom';

// Mock IntersectionObserver used by framer-motion/inView and components
class IntersectionObserverMock {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Mock HTMLCanvasElement.getContext used by BackgroundReveal
HTMLCanvasElement.prototype.getContext = () => {
  return {
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    strokeStyle: '',
    lineWidth: 1,
    scale: () => {},
    closePath: () => {},
    setTransform: () => {},
  };
};

// SSR placeholder for window.matchMedia in tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
