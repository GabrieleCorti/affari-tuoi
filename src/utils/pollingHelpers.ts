/**
 * Configuration for polling behavior
 */
export const POLL_INTERVAL_MS = 3000;

/**
 * Sets up polling that executes a callback at regular intervals
 */
export const setupPolling = (
  callback: () => Promise<void>,
  intervalMs: number = POLL_INTERVAL_MS
): (() => void) => {
  // Execute immediately
  callback();
  
  // Set up interval
  const intervalId = setInterval(callback, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
