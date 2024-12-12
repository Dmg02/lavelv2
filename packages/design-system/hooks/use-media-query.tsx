'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialize with null to indicate no match on server
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Default to false on server
  });

  useEffect(() => {
    // Return early if no window (server-side)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Initial check
    setMatches(mediaQuery.matches);

    // Create event listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener('change', listener);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]); // Re-run if query changes

  return matches;
} 