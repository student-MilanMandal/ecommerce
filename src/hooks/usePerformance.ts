import { useEffect, useState } from 'react';

// Performance monitoring hook - human-readable approach
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Simple performance check
    const startTime = performance.now();
    
    const checkPerformance = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Page loaded in: ${loadTime.toFixed(2)}ms`);
      
      // Check for memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log(`Memory usage: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`);
      }
    };
    
    // Check performance after page is fully loaded
    if (document.readyState === 'complete') {
      checkPerformance();
    } else {
      window.addEventListener('load', checkPerformance);
    }
    
    return () => {
      window.removeEventListener('load', checkPerformance);
    };
  }, []);
};

// Simple debounce utility - human approach
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Image lazy loading optimization
export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    const preloadImages = () => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    // Preload images after a short delay
    const timer = setTimeout(preloadImages, 100);
    
    return () => clearTimeout(timer);
  }, [imageUrls]);
};
