import { useEffect, useState, useMemo, useCallback } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    const startTime = performance.now();
    
    const checkPerformance = () => {
      const loadTime = performance.now() - startTime;
      if (loadTime > 100) {
        console.warn('Slow rendering detected:', loadTime + 'ms');
      }
    };
    
    setTimeout(checkPerformance, 0);
  }, []);
};

// Virtual scrolling hook for large lists
interface UseVirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export const useVirtualScroll = ({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: UseVirtualScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length - 1, end + overscan)
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1).map((item, index) => ({
      ...item,
      index: visibleRange.start + index
    }));
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    onScroll,
    offsetY: visibleRange.start * itemHeight
  };
};

// Throttled scroll hook for better performance
export const useThrottledScroll = (callback: () => void, delay: number = 16) => {
  let timeoutId: number | null = null;
  let lastExecTime = 0;

  return useCallback(() => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      callback();
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback();
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }, [callback, delay]);
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [targetElement, setTargetElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, [targetElement, threshold, rootMargin]);

  return [setTargetElement, isIntersecting] as const;
};
