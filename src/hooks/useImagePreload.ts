import { useEffect } from 'react';

interface UseImagePreloadOptions {
  enabled?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export const useImagePreload = (imageUrls: string[], options: UseImagePreloadOptions = {}) => {
  const { enabled = true, quality = 'medium' } = options;

  useEffect(() => {
    if (!enabled || !imageUrls.length) return;

    // Optimize URLs if they're from Unsplash
    const optimizeUrl = (url: string) => {
      if (url.includes('unsplash.com')) {
        const qualityMap = {
          low: 'w=300&h=300&q=60',
          medium: 'w=400&h=400&q=80',
          high: 'w=600&h=600&q=95'
        };
        return url.includes('?') 
          ? `${url}&${qualityMap[quality]}&auto=format&fit=crop`
          : `${url}?${qualityMap[quality]}&auto=format&fit=crop`;
      }
      return url;
    };

    // Use requestIdleCallback for performance
    const preloadImages = () => {
      imageUrls.forEach((url, index) => {
        const img = new Image();
        const optimizedUrl = optimizeUrl(url);
        
        // Preload with different priorities
        if (index < 2) {
          // High priority for first 2 images
          img.loading = 'eager';
          img.src = optimizedUrl;
        } else {
          // Lower priority for remaining images
          img.loading = 'lazy';
          // Use setTimeout to delay preloading
          setTimeout(() => {
            img.src = optimizedUrl;
          }, index * 100);
        }
      });
    };

    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 1000 });
    } else {
      setTimeout(preloadImages, 100);
    }
  }, [imageUrls, enabled, quality]);
};

// Hook for preloading critical images above the fold
export const useCriticalImagePreload = (imageUrl: string, priority = true) => {
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.loading = priority ? 'eager' : 'lazy';
    
    // Optimize for Unsplash images
    if (imageUrl.includes('unsplash.com')) {
      const optimizedUrl = imageUrl.includes('?') 
        ? `${imageUrl}&w=600&h=600&q=95&auto=format&fit=crop`
        : `${imageUrl}?w=600&h=600&q=95&auto=format&fit=crop`;
      img.src = optimizedUrl;
    } else {
      img.src = imageUrl;
    }
  }, [imageUrl, priority]);
};

export default useImagePreload;
