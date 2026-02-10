
import { useEffect } from 'react';

/**
 * useAutoRefresh
 * Automatically reloads the application window after a set interval.
 * Default: 10 minutes (600,000ms)
 */
export const useAutoRefresh = (intervalMs: number = 600000) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('System Auto-Refresh Protocol Initiated...');
      window.location.reload();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);
};
